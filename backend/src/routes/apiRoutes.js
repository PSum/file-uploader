const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


router.get('/items/home', async (req, res) => {
    try {
        const data = await prisma.entry.findMany({
            where: {
                parentId: null,
            }
        })
        res.status(200).send(data);

  } catch (err) {
    console.log(err);
    res.status(500).send('There has been an error')
  }
})

// GET /items/:parentId
// Response: [{ id, name, type, parentId, createdAt }]

router.get('/items/:parentId', async (req, res) => {
  try {
  const  params  = req.params
  console.log(`params: ${params.parentId}`);
  // Find entrys with entry name in DB and return them
  const data = await prisma.entry.findMany({
    where: {
      id: parseInt(params.parentId, 10)
    }
  });
  // Handle case where no entries are found
  if (data.length === 0) {
    return res.status(404).send({ message: 'No entries found for the given id.' });
  }

  res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('There has been an error')
  }
})

router.get('/items/:parentId/children', async (req, res) => {
  try {
    const parentId = Number(req.params.parentId);

    console.log(`Fetching children for parentId: ${parentId}`);

    const children = await prisma.entry.findMany({
      where: {
        parentId: parentId, // Find entries where parentId matches the given parent ID
      },
    });

    if (children.length === 0) {
      return res.status(404).json({ message: 'No child entries found for the given parent ID.' });
    }

    res.status(200).json(children);
  } catch (err) {
    console.error('Error fetching child entries:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// POST /items
// Body: { "name": "New Folder", "type": "folder", "parentId": 1 }

router.post('/items', async (req, res) => {
  try {
    const {name, parentId = null, type = "FILE"} = req.body;

    const data = await prisma.entry.create({
      data: {
        name: name,
        parentId: Number(parentId),
        type: type,
      }
    })
  res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error')
  }
})

module.exports = router;

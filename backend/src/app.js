const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/api/upload', upload.single('example-picture'), (req, res) => {
    res.json(req.file);
})

app.get('/api/getPicture', (req, res) =>{
  const filePath = path.join(__dirname, '../uploads/example-picture-1730909983941-749054028.png')
  res.sendFile(filePath);
})


// GET /api/items/:parentId
// Response: [{ id, name, type, parentId, createdAt }]

app.get('/api/items/:parentId', async (req, res) => {
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

app.get('/api/items/:parentId/children', async (req, res) => {
  try {
    const parentId = Number(req.params);

    console.log(`Fetching children for parentId: ${parentId}`);

    // Das funktioniert noch nicht!!
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

// POST /api/items
// Body: { "name": "New Folder", "type": "folder", "parentId": 1 }

app.post('/api/items', async (req, res) => {
  try {
    const {name, parentId = null} = req.body;

    const data = await prisma.entry.create({
      data: {
        name: name,
        parentId: Number(parentId),
      }
    })
  res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('There has been an error')
  }
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
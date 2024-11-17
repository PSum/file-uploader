const express = require('express');
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const fileRoutes = require('./routes/fileRoutes');

const cors = require('cors');
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/file', fileRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
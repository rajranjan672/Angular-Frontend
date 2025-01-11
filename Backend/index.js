const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();   

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.log(err);
});

const TaskRoute = require('./Router/TaskRoute');

app.use('/api/task', TaskRoute);

app.listen(process.env.PORT, () => {    
    console.log('Server is running on port ' + process.env.PORT);
}); 

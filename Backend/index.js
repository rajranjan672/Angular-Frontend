const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();   

const app = express();


app.use(cors({
    // origin:'http://localhosst:3000', credentials:true
    origin:'http://localhost:4200', credentials: true

}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.log(err);
});

const TaskRoute = require('./Router/TaskRoute');
const UserRoute = require('./Router/UserRoute');


app.use('/api/task', TaskRoute);
app.use('/api/user', UserRoute);


app.listen(process.env.PORT, () => {    
    console.log('Server is running on port ' + process.env.PORT);
}); 

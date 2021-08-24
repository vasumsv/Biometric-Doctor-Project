const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

//middlewares
app.use(express.json())

//includes
require('./config/mysql.js')

//routes
const userRoute = require('./routes/user.js')

const filterRoute = require('./routes/filters.js');

app.use('/user', userRoute)
app.use('/filter', filterRoute)



app.listen(port, () => {
    console.log(`Server is up and running at localhost:${port}`)
});

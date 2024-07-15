const express = require('express')
const app = express();
const blogRoutes = require('./api/routes/blog')
const loginRoutes = require('./api/routes/login')
const signupRoutes = require('./api/routes/signup')
const detailsRoutes = require('./api/routes/details')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());

mongoose.connect('mongodb+srv://imjayant_17:jayant74242@atlascluster.lvgdtnk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster')

mongoose.connection.on('error', err => {
    console.log('Error connecting to database...')
})

mongoose.connection.on('connected', () => {
    console.log('Connected to database Successfully')
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/blog', blogRoutes);
app.use('/login', loginRoutes);
app.use('/signup',signupRoutes);
app.use('/detail',detailsRoutes);

app.use((req, res, next) => {
    res.status(500).json({
        msg :"bad request.. check URL" 
    })
})

module.exports = app  


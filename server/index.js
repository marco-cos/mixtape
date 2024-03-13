const express = require('express');
const dotenv = require('dotenv').config({ path: '../.env' })
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();
const { MONGO_URL, PORT} = process.env;
const bodyParser = require('body-parser'); 


app.set("view engine", "ejs");


// const authRoute = require("./routes/authRoutes");

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected!'))
.catch((err) => console.log('Database not connected', err))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));



app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

//middleware
app.use(express.json({ limit: '100mb' })) // this parses the data
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


app.use('/', require('./routes/authRoutes'))
app.use('/images', require('./routes/imgRoutes'))
app.use('/searchresults', require('./routes/searchRoutes'));
app.use('/profile', require('./routes/profileRoutes'))
app.use('/review', require('./routes/reviewRoutes'))
app.use('/Albumpage', require('./routes/albumpageRoutes'));
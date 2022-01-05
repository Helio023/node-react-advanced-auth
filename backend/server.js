require('dotenv').config({path: '.env'})
const app = require('./app')


const port = process.env.PORT | 5000
app.listen(port, () => {
    console.log(`App runing in port: ${port}`);
})
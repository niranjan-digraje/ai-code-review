require('dotenv').config();
const app = require('./src/app');

app.listen(5000,()=>{
    console.log("server is started on 5000");
});
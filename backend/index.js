const express = require('express')
const app = express();
const connectToMongo = require('./db');
connectToMongo();
const port = 5000

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin ,X-Requested-With , Content-Type , Accept"
  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api/v1',require("./Routes/CreateUser"));
app.use('/api/v1', require("./Routes/DisplayData"));
app.use('/api/v1', require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})

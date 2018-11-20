const express = require('express');
const app = express();
const port = 8088;
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'main.html'));
});
app.post('/add', (req, res) => {
  console.log('Req body', req.body);
  const num1 = +req.body.num1;
  const num2 = +req.body.num2;

  const num3 = num1 + num2;
  console.log('What is num3: ', typeof num3);
  const response = { value: num3 };
  res.json(response);
  // {value: total}

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
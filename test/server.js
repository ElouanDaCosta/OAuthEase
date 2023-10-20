import express from 'express';

const app = express();

app.get('/callback', (req, res) => {
  res.send('Redirected successfully !');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

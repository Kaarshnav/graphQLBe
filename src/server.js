const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config(); // loading .env into process.env

const PORT = process.env.PORT;
app.use(express.json()); // to use req.body , not body-parser

app.get("/welcome", (req, res) => {
  res.status(200).json({
    data: [
      {
        body: req.body,
      },
    ],
    message: "Hi, Thanks for using our server ",
  });
});
app.listen(PORT, (req, res) => {
  console.log(`Server is listening at Port ${PORT} ..... `);
});

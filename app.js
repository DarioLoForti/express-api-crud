const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const postsRouter = require("./routers/postsRouter");

app.use(express.json());

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

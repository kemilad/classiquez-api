const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authenticate = require("./middleware/authenticator");
const downloadurl = require("./middleware/downloadableurl");
const carts = require("./routes/carts");
const users = require("./routes/users");
const authUser = require("./routes/authUser");
const home = require("./routes/home");
require("dotenv").config();


const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(downloadurl);
app.use(authenticate);
app.use("/", home);
app.use("/api/carts", carts); // custom middleware
app.use("/api/users", users);
app.use("/api/auth", authUser);

mongoose
  .connect(
    "mongodb+srv://dbUser:dbUser@cluster0-qxgqi.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to db successfully"))
  .catch(ex => console.log(ex));

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});



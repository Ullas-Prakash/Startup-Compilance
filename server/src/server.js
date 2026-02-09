// server/src/server.js
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");


const PORT = process.env.PORT || 5000;
let name=process.env.myusername;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

connectDB();


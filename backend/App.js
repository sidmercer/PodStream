const express = require("express");
const app = express();

require("dotenv").config();
require("./connnections/conn");
// Check if PORT is defined

app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
});

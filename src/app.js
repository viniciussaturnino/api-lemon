const app = require("./config/express");
const { port } = require("./config/vars")

app.listen(3000, () => console.log(`App is running on ${port}`));

module.exports = app;

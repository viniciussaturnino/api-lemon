const app = require("./config/express");

app.listen(3000, () => console.log(`App is running on ${process.env.PORT || 3000}`));

module.exports = app;

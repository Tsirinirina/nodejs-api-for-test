const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = 3000;

app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Serveur démarrer sur http://127.0.0.1:${port}`);
});

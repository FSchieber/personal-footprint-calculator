const express = require("express"),
    bodyParser = require("body-parser"),
    emissions = require("./routes/emissions"),
    http = require("http");

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(bodyParser.json());

function init() {
    app.use("/api/v1/emissions", emissions);

    const server = http.createServer(app).listen(app.get("port"), function () { });
    console.log("Express server listening on port " + app.get("port"));
}

init();

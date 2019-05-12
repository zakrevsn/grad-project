const game = require("./game");
const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hashPassword, checkPassword } = require("./password");
const server = require("http").Server(app);
const io = require("./io");
const socketio = require("socket.io")(server, {
    origins: "localhost:8080 name.herokuapp.com:*"
});
app.use(compression());

app.use(require("body-parser").json());
app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
socketio.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
socketio.on("connection", io.onConnect);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

module.exports = app;
if (require.main == module) {
    server.listen(process.env.PORT || 8080, () =>
        console.log("I'm listening.")
    );
}

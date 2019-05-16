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
    origins: "localhost:8080 name.herokuapp.com:* *:8080"
});
app.use(compression());

app.use(require("body-parser").json());
app.use(express.static("./public"));

var nextSessionId = 0;
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.post("/register", (req, res) => {
    hashPassword(req.body.password)
        .then(hash => {
            db.addPlayer(req.body.name, req.body.email, hash)
                .then(() => {
                    res.status(200);
                    res.end();
                })
                .catch(err => {
                    res.status(500);
                    res.end("An error occured. Please try again.");
                    console.log("err in addUser: ", err);
                });
        })
        .catch(err => {
            res.status(500);
            res.end("An error occured. Please try again.");
            console.log("err in addUser: ", err);
        });
});

app.post("/login", (req, res) => {
    db.getPlayer(req.body.email)
        .then(results => {
            if (results.rows.length == 1) {
                checkPassword(req.body.password, results.rows[0].password)
                    .then(() => {
                        req.session.name = results.rows[0].name;
                        req.session.email = results.rows[0].email;
                        req.session.playerId = results.rows[0].id;
                        req.session.sessionId = nextSessionId++;

                        res.status(200);
                        res.end();
                    })
                    .catch(() => {
                        res.status(401);
                        res.end("Invalid email or password. Please try again.");
                    });
            } else {
                res.status(401);
                res.end("Invalid email or password. Please try again.");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            res.end("An error occured. Please try again.");
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

module.exports = app;
if (require.main == module) {
    server.listen(process.env.PORT || 8080, () =>
        console.log("I'm listening.")
    );
}

const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const userRoutes = require("./api/users/router");
const chatRoutes = require("./api/chat/router");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, onValue } = require("firebase/database");
require("dotenv").config();
const PORT = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

initializeApp(firebaseConfig);
const db = getDatabase();
const fetchChat = ref(db, process.env.dbTable);

app.set("db", db);
app.set("ref", ref);
app.set("set", set);

const server = app.listen(PORT);

console.log(`Running at Port ${PORT}`);

app.get("/*", function (req, res) {
  if (req.url != "^/api") {
    res.sendFile(
      (req.url == "/" ? "/signUp" : req.url) + (!ext(req.url) ? ".html" : ""),
      {
        root: path.join(__dirname, "view"),
      }
    );
  }
});

onValue(fetchChat, (snapshot) => {
  const data = snapshot.val();
  console.log("new data");
});

const ext = (url) => {
  return path.extname(url);
};

module.exports = server;

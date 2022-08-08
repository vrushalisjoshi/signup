const firebaseConfig = {
  apiKey: "AIzaSyDsePvCtVENQ99-YT_aif8FzRup9drzl3E",
  authDomain: "chatapplication7588.firebaseapp.com",
  databaseURL: "https://chatapplication7588-default-rtdb.firebaseio.com",
  projectId: "chatapplication7588",
  storageBucket: "chatapplication7588.appspot.com",
  messagingSenderId: "530262345656",
  appId: "1:530262345656:web:74d2e61f8a43296936f14d",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const fetchChat = db.ref("messages/");

const username = prompt("Please Tell Us Your Name");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.msg}</li>`;
  document.getElementById("messages").innerHTML += message;
});

import  firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

    const firebaseConfig = {
        apiKey: "AIzaSyCg8qLFpEHcmJBYnfMy6Omzh34KpdQBFko",
        authDomain: "food-9694e.firebaseapp.com",
        projectId: "food-9694e",
        storageBucket: "food-9694e.appspot.com",
        messagingSenderId: "763709680692",
        appId: "1:763709680692:web:fe83485edaba76074e2e61"
      };
      


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const storage=firebase.storage(app)
const auth = firebase.auth()
const db = firebase.firestore(app);
var data=db.collection("data");
var fdata=db.collection("data");
var msgRef = db.collection("msg");
var userRef= db.collection("user");
var postRef= db.collection("posts");
var groupRef= db.collection("group");
var groupmsgRef= db.collection("group");

var ref1 = storage.ref();

var s=firebase.firestore.FieldValue

export { auth,data,fdata,msgRef,userRef,ref1,postRef ,groupRef,groupmsgRef,s};







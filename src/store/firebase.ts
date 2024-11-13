import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as firebaseConfig from "./firebaseConfig.json";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp(firebaseConfig as firebase.FirebaseOptions);
const dataBase = getFirestore(app);
const auth = getAuth(app);
/**
 * Get firestore timestamp
 * @type {() => firebase.firestore.FieldValue}
 */
export default dataBase;
export { auth };
// export {}

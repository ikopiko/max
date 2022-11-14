/* eslint-disable */

import  firebase  from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTd1fBPCC68vwSABUUSlOpzWXto2jp5H0",
  authDomain: "testphp-d3f2c.firebaseapp.com",
  databaseURL: "https://testphp-d3f2c-default-rtdb.firebaseio.com",
  projectId: "testphp-d3f2c",
  storageBucket: "testphp-d3f2c.appspot.com",
  messagingSenderId: "464281819500",
  appId: "1:464281819500:web:a5b8c5ccc523ab4e503b49"
};

 const app = firebase.initializeApp(firebaseConfig)
 const timestamp = firebase.firestore.FieldValue.serverTimestamp;
//  const app = firebase.initializeApp(firebaseConfig).database()
  // eslint-disable-next-line no-console
 
  // export default app;

  // export const db = app.firestore()

  const db = app.database()

   let requests = db.ref('requests')
   let notificatons = db.ref('notification')
   let orders = db.ref('orders')

   export const notifications = requests
   export const branchOrders = orders
   export const newRequest = notificatons


// export default app.firestore();
// export { timestamp };



import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseAuth, db } from "boot/firebase";

const actions = {
    registerUser({}, payload) {
      // console.log(payload);
      firebaseAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          console.log(response);
          let userId = firebaseAuth.currentUser.uid;
          db.ref("users/" + userId).set({
            name: payload.name,
            email: payload.email,
            online: true,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    loginUser({}, payload){
      firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          console.log(response);
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    logoutUser() {
      firebaseAuth.signOut();
    },
}

export default {
  namespaced: true,
  actions,
};  
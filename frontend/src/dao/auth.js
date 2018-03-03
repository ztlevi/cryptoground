import axios from 'axios';
import * as firebaseUrls from '../res/firebaseUrls';

export const verifyPassword = (username, password) => {
  let endpoint = firebaseUrls.VERIFY_USER_URL;
  const authData = {
    email: username,
    password: password,
    returnSecureToken: true,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, authData)
      .then(response => resolve(response.data))
      .catch(error => reject(firebaseUrls.GET_FIREBASE_ERROR_MSG(error)));
  });
};

export const signUpNewUser = (userName, passWord) => {
  let endpoint = firebaseUrls.SIGNUP_URL;
  console.log('signup', userName, passWord);
  let authData = {
    email: userName,
    password: passWord,
    returnSecureToken: true,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, authData)
      .then(response => resolve(response.data))
      .catch(error => reject(firebaseUrls.GET_FIREBASE_ERROR_MSG(error)));
  });
};

import firebaseConfigs from './firebaseConfigs';
export const FIREBASE_REST_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
export const FIREBASE_SECURE_URL = 'https://securetoken.googleapis.com/v1';
export const SIGNUP_URL =
  FIREBASE_REST_URL + '/signupNewUser?key=' + firebaseConfigs.apiKey;
export const GET_ACCOUNT_URL =
  FIREBASE_REST_URL + '/getAccountInfo?key=' + firebaseConfigs.apiKey;
export const VERIFY_USER_URL =
  FIREBASE_REST_URL + '/verifyPassword?key=' + firebaseConfigs.apiKey;
export const REFRESH_ID_TOKEN_URL = `${FIREBASE_SECURE_URL}/token?key=${
  firebaseConfigs.apiKey
}`;
export const VERIFY_CUSTOM_TOKEN =
  FIREBASE_REST_URL + '/verifyCustomToken?key=' + firebaseConfigs.apiKey;
export const EMAIL_CONFIRMATION_URL =
  FIREBASE_REST_URL + '/getOobConfirmationCode?key=' + firebaseConfigs.apiKey;
export const FIREBASE_DATABASE_REST_URL = `https://${
  firebaseConfigs.projectId
}.firebaseio.com`;

export const fetchFirebaseDbUrl = (dirs: Array, idToken: String) => {
  let path = '';
  for (let i in dirs) {
    path += `/${dirs[i]}`;
  }
  return `${FIREBASE_DATABASE_REST_URL}${path}.json?auth=${idToken || ''}`;
};

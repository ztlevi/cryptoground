import configs from './firebaseConfigs';

// A function which generate firebase db read or write request url
// dirs: array of paths
// i.e ['users', '123', 'balance'] ---> /users/123/balance.json
// idToken: for authentication ( needed if auth required firebase db rules )
export const genFirebaseDbUrl = ( dirs: Array, idToken: String = null) => {
    let path = '';
    for( let i in dirs ){
        path += `/${dirs[i]}`;
    }
    return `${configs.databaseURL}${path}.json${idToken?"auth="+idToken:""}`;
}
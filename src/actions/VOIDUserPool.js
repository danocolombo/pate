import { CognitoUserPool } from 'amazon-cognito-identity-js';
// this is provided to give access to call AWS authentication via Cognito
const poolData = {
    // this information defines the Amazon cognito user pool definitions
    UserPoolId: 'us-east-1_I8zrZFjzd',
    ClientId: '2sej6hjv87hhjao4jjkus3esti',
};
const UserPool = new CognitoUserPool(poolData);

export default new CognitoUserPool(poolData);

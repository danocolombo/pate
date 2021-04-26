import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
    UserPoolId: "us-east-1_2AD4aPWxt",
    ClientId: "6hd1l0kgekae1gq1oq4tupmuft"
}
export default new CognitoUserPool(poolData);
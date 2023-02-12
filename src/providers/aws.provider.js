import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_2AD4aPWxt',
    ClientId: '6hd1l0kgekae1gq1oq4tupmuft',
});
export const changeCognitoEmail = async (user, email) => {
    // this is used to update the user account in cognito with the
    // provided email value. No validation done. Check email before
    // calling.

    const cognitoUser = new CognitoUser({
        Username: user.username,
        Pool: userPool,
    });
    const newEmail = email;
    cognitoUser.updateAttributes(
        {
            email: newEmail,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 400,
                    data: 'Error changing password',
                    error: err,
                };
            }
            return { statusCode: 200, data: 'email changed successfully' };
        }
    );
};

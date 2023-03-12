//      ++++++++++++++++++++++++++++++++++++++++++++++++++++
//      pate.provider
//      system services
//
//      ----------------------------------------------------
export const emailService = async (request) => {
    //*  requires:
    //   toAddress:
    //   ccAddresses:
    //   subject:
    //   emailBody
    if (!request.toAddress || !request.subject || !request.emailBody) {
        return {
            statusCode: 400,
            data: 'requirements not met',
        };
    }
    //todo-gql  move endpoint to environment variable
    await fetch(
        'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/admin',
        {
            method: 'POST',
            body: JSON.stringify({
                operation: 'emailNotification',
                payload: request,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return {
                statusCode: 200,
                data: 'success',
            };
        });
};

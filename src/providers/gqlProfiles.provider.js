//* get the list of all subs
import { API } from 'aws-amplify';
import * as mutations from '../pateGraphql/mutations';
import ddbData from '../assets/data/p8User.array.json';

export async function listUsers() {
    const users = ddbData.body.Items;
    console.log('response:\n', ddbData);
    // users.forEach((u) => {
    //     console.log(`$sub: String = "${u.uid}"`);
    //     console.log(`$username: String = "${u?.username || ''}"`);
    //     console.log(`$firstName: String = "${u?.firstName || ''}"`);
    //     console.log(`$lastName: String = "${u?.lastName || ''}"`);
    //     console.log(`$email: String = "${u?.email || ''}"`);
    //     console.log(`$phone: String = "${u?.phone || ''}"`);
    //     console.log(`$divisionId: ID = "fffedde6-5d5a-46f0-a3ac-882a350edc64"`);
    //     console.log(`$street: String = "${u?.residence?.street || ''}"`);
    //     console.log(`$city: String = "${u?.residence?.city || ''}"`);
    //     console.log(`$stateProv: String = "${u?.residence?.stateProv || ''}"`);
    //     console.log(
    //         `$postalCode: String = "${u?.residence?.postalCode || ''}"`
    //     );

    //     console.log('');
    // });
}
export async function createNewProfile(pData) {
    try {
        const userDef = {
            sub: '28470ec4-6e59-4563-ba06-c47b8728dfbf',
            username: '',
            firstName: 'Sal',
            lastName: 'Cilluffo',
            email: 'salcrossviewcr@gmail.com',
            phone: '6784857644',
            divisionId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            street: '2307 Milstead Circle NE',
            city: 'Marietta',
            stateProv: 'GA',
            postalCode: 30066,
        };
        const results = await API.graphql({
            query: mutations.createGQLProfile,
            variables: { input: userDef },
        });
        console.log('P:32-->results:\n', results);
    } catch (error) {
        console.log('P:48-->error:', error);
    }
}
export async function listDDBUsers() {
    return (
        <div>
            {ddbData.foreach((p) => {
                return <div>{p.uid}</div>;
            })}
            }
        </div>
    );
}

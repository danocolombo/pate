export const addItemToConfirmed = (registrations, registrationToAdd) => {
    const existingRegistrations = registrations.find(
        (registration) => registration.uid === registrationToAdd.uid
    );
    // if the passed in registration is not already in list, add it
    if (existingRegistrations) {
        return registrations.map((registration) =>
            registration.uid === registrationToAdd.uid
                ? { ...registration }
                : registration
        );
    }
    return [...registrations, { ...registrationToAdd }];
};
// export const addItemToCart = (cartItems, cartItemToAdd) => {
//   const existingCartItem = cartItems.find(
//     cartItem => cartItem.id === cartItemToAdd.id
//   );

//   if (existingCartItem) {
//     return cartItems.map(cartItem =>
//       cartItem.id === cartItemToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
// };
export const removeItemFromConfirmed = (
    registrations,
    registrationToRemove
) => {
    let target = {};
    target.id = registrationToRemove;
    const existingRegistration = registrations.find(
        (registration) => registration.uid === target.id
    );

    if (existingRegistration.quantity === 1) {
        return registrations.filter(
            (registration) => registration.uid !== target.id
        );
    }
    let returnValue = [];
    registrations.forEach((element) => {
        if (element.uid === target.id) {
            console.log('MATCH');
        } else {
            // returnValue = { ...returnValue, element };
            console.log('no match');
            returnValue.push(element);
        }
    });
    // return registrations.map((registration) =>
    //     registration.uid === target.id ? { ...registration } : registration
    // );
    console.log('ready to return');
    return returnValue;
};

// import * as Crypto from 'expo-crypto';
import { PHONE_REGX } from '../constants/pate';
export function dateIsBeforeToday(testDate) {
    // let testDate = '2022-01-15';

    let target = testDate.split('-');

    let tYear = parseInt(target[0]);
    // return true;
    let tMonth = parseInt(target[1]);
    let tDay = parseInt(target[2]);

    var todayDate = new Date().toISOString().slice(0, 10);
    let standard = todayDate.toString().split('-');
    let sYear = parseInt(standard[0]);
    let sMonth = parseInt(standard[1]);
    let sDay = parseInt(standard[2]);
    let results = null;
    let spot = 0;
    if (tYear < sYear) {
        spot = 1;
        results = true;
    } else if (tYear === sYear && tMonth < sMonth) {
        spot = 2;
        results = true;
    } else if (tYear === sYear && tMonth === sMonth && tDay < sDay) {
        spot = 3;
        results = true;
    } else {
        spot = 4;
        results = false;
    }
    return results;
}
export async function getUniqueId() {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        new Date().toString() + Math.random().toString()
    );
    return digest;
}
export function getToday() {
    var d = new Date();
    //- this was in the function originally, but it does not give today
    // d.setDate(d.getDate() - 1); // date - one
    const dminusone = d.toLocaleString(); //  M/DD/YYYY, H:MM:SS PM

    let datetime = dminusone.split(', '); // M/DD/YYYY
    const dateparts = datetime[0].split('/');
    const yr = dateparts[2];
    const mn = dateparts[0] < 10 ? '0' + dateparts[0] : dateparts[0];
    const da = dateparts[1];
    const target = yr + '-' + mn + '-' + da;
    return target;
}

export const CONFIG = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export function checkPatePhoneValue(patePhone) {
    console.log('type of patePhone:', typeof patePhone);
    if (patePhone.length !== 10) {
        return false;
    }
    if (isNaN(patePhone)) {
        // not a patePhone number
        return false;
    } else {
        return true;
    }
}
export function getPhoneType(patePhone) {
    // this returns true if patePhone is in format of "(123) 233-3232"
    let result = patePhone.match(PHONE_REGX);
    if (result) {
        if (patePhone.length === 10) {
            return 'PATE';
        } else {
            return 'MASKED';
        }
    } else {
        return null;
    }
}
export function transformPatePhone(patePhone) {
    // we take patePhone 1234567890 and return (123) 456-7890

    if (isNaN(patePhone) || patePhone === null) {
        // not a patePhone number
        return null;
    } else {
        let p1 = patePhone.substring(0, 3);
        let p2 = patePhone.substring(3, 6);
        let p3 = patePhone.substring(6);
        let returnValue = '(' + p1 + ') ' + p2 + '-' + p3;
        return returnValue;
    }
}
export function createPatePhone(inputPhone) {
    // we expect (208) 424-2494 need 2084242494
    // if (inputPhone.length > 0) {
    //     let result = inputPhone.match(PHONE_REGX);
    //     if (result === null) {
    //         return null;
    //     }
    // } else {
    //     return null;
    // }
    if (inputPhone.length < 1) {
        return null;
    }
    let p1 = inputPhone.substring(1, 4);
    let p2 = inputPhone.substring(6, 9);
    let p3 = inputPhone.substring(10);
    // console.log('p1', p1);
    // console.log('p2', p2);
    // console.log('p3', p3);
    let patePhone = p1 + p2 + p3;
    return patePhone;
}
export function createMtgCompKey(client, meetingDate) {
    let mtgCompKey =
        client +
        '#' +
        meetingDate.substring(0, 4) +
        '#' +
        meetingDate.substring(5, 7) +
        '#' +
        meetingDate.substring(8, 10);
    return mtgCompKey;
}
export function capitalize(textString) {
    if (!textString) {
        return null;
    }
    const word = textString;
    const lower = word.toLowerCase();
    const first = word.charAt(0);
    const upper = first.toUpperCase();
    const remainder = lower.slice(1);
    const returnValue = upper + remainder;
    return returnValue;
}
export function createGrpCompKey(client, meetingId) {
    let grpCompKey = client + '#' + meetingId;
    return grpCompKey;
}
export async function asc_sort(a, b) {
    return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
}
export async function desc_sort(a, b) {
    return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
}
export async function desc_sort_raw(a, b) {
    return b.eventDate - a.eventDate;
}
export async function asc_sort_raw(a, b) {
    return a.eventDate - b.eventDate;
}
export function printObject(label, target) {
    console.log(label, JSON.stringify(target, null, 2));
}
export function prettyDate(strDate) {
    //const dateStr = '2023-03-04';
    const date = new Date(strDate);

    const options = { month: 'long', day: 'numeric' };
    const formattedDate =
        date.toLocaleDateString('en-US', options) + ', ' + date.getFullYear();
    return formattedDate;
    // console.log(formattedDate); // March 4th, 2023
}
export function prettyTime(strTime) {
    // var time = '12:30:00-05:00';
    var hours = parseInt(strTime.substr(0, 2), 10);
    var minutes = strTime.substr(3, 2);
    var suffix = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    let returnValue = hours + ':' + minutes + suffix;
    return returnValue;
}
export function createAWSUniqueID() {
    // this returns a unique value for use as AWS ID
    // example:  eca1dda7-f6d3-4b0c-8c5d-716da1cafaa8
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
    );
}

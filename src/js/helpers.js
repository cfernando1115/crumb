import { TIMEOUT_SEC } from './config.js';

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
    
        if (!res.ok) {
            throw Error(`${data.message} (${res.status})`);
        }
    
        return data;
    } catch (error) {
        throw Error(error);
    }

}

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request time out`));
        }, sec * 1000);
    });
}


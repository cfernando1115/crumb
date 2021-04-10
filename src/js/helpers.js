import { TIMEOUT_SEC } from './config.js';

/*export const getJSON = async function (url) {
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

export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });

        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }

        return data;
    } catch (error) {
        throw error;
    }
}*/

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uploadData)
            })
            : fetch(url);
        
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }

        return data;

    } catch (error) {
        throw error;
    }
}

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request time out`));
        }, sec * 1000);
    });
}


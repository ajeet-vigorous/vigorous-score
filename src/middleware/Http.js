import axios from "axios";

import  CryptoJS from "crypto-js"


// import { CONST } from '../apis/userApis';



const httpPost = async (url, params, isNotify) => {
    try {
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // "Authorization": authHeader().Authorization
        };
        const result = await axios({
            method: "POST",
            url: process.env.REACT_APP_MATCHLIST_URL + url,
            data: { ...params },
            headers: headers,
        });
        
        if (result.data) {
            return result.data
        } else {
            return null
        }
    } catch (err) {
        console.error(err);
       
        if (err.request.status) {
     
        }
    }
};
const sportMatchList = async () => {
    const header = {
        'Content-Type': 'application/json',
    };
    const requestOptions = {
        method: "POST",
        headers: header
    };
    try {
        const response = await fetch(process.env.REACT_APP_MATCHLIST_URL + `sports/matchList`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        
        return result;
    } catch (error) {
        console.error("Sport Match List", error);
        return Promise.reject(error);
    }
};

export {  httpPost , sportMatchList };

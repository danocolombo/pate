// this is to be used for actions related to events
//====================================================
import axios from 'axios';
import {api_header_config} from '../include/api_headers';

export const getActiveEvents =() => {
    try{
        let obj = {
            operation: 'getActiveEvents',
        }; 
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_PATE_API + '/events';
        let res = await axios.post(api2use, body, api_header_config);
    }
}
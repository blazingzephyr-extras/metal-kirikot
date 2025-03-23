
import { Config } from '../../../Main';
import { ResultData } from './ResultData';
export { Silent, Finish }

function Silent(): ResultData {

    return { Send: false, IsSuccessful: true }
}

function Finish(type: 'success' | 'warn' | 'error', header: string, field: string): ResultData {

    let color: string;
    switch(type) {

        case 'success': color = Config["Colors"]["green_success"]; break;
        case 'warn': color = Config["Colors"]["yellow_warn"]; break;
        case 'error': color = Config["Colors"]["red_error"]; break;
    }
    
    return { Send: true, IsSuccessful: true, Header: header, Body: field, Color: color };
}
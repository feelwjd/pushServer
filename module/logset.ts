import { logger } from "../config/winston";

/**
 * 
 * @param {String} val i : info / e : error
 * @param {String} Trcode    TRCode (6)
 * @param {String} funcName     Function Name (4)
 * @param {String} code         Code (2)
 * 
 * @Auth Min Jeong Pil
 */
export function LogSet(val:string, Trcode:string, funcName:string, code:string ){
    if(val=="i"){
        logger.info(`TR_`+Trcode+`_`+funcName+` `+code);
    }else if(val=="e"){
        logger.error(`TR_`+Trcode+`_`+funcName+` ERROR:`+code);
    }else{
        logger.error(`TR_`+Trcode+`_`+funcName+` ERROR:`+code);
    }
}
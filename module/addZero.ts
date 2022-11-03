/**
 * 
 * @param {String} date     nowDate
 * @param {String} time     nowTime
 * 
 * @Auth Min Jeong Pil
 */
 export function addZero(i:number) {
    if (i < 10) {
        let x = "0" + i;
        return x;
    }
    return i.toString();
  }
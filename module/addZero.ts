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

/**
 * 
 * @param {number} hour 
 * @param {number} minute 
 */
export function scheduleTime(hour: number, minute: number, setTime: number){
  let date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + setTime);
  let value = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':00';
  return value;
}

import $vx from './vx'

/** 格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {string} formatter 时间格式
 */
export const formatDate = (time, formatter) => {
  formatter = formatter || 'yyyy-MM-dd';
  return time == null ? '--' :$vx.date.format(new Date(time), formatter);
};

export const sex = (v) => {
  return v == 1 ? '男' : v == 2 ? '女' : '未知';
};

/** 显示空的名字
 *  @param {string} input 需要filter检查的值，传入变量
 *  @param {string} symbol 如果input为空的时候显示的值
 */
export const empty = (input, symbol) => {
  try{
    if(!input || input == 0 || input == '$0' || input == '0%'){
      return symbol?symbol:'—-';
    } else {
      return input;
    }
  }catch(e){ return input}
};


/** 格式化数字
 *
 * @param num
 * @param precision
 * @param separator
 * @returns {*}
 *=======================================================
 *     formatNumber(10000)="10,000"
 *     formatNumber(10000, 2)="10,000.00"
 *     formatNumber(10000.123456, 2)="10,000.12"
 *     formatNumber(10000.123456, 2, ' ')="10 000.12"
 *     formatNumber(.123456, 2, ' ')="0.12"
 *     formatNumber(56., 2, ' ')="56.00"
 *     formatNumber(56., 0, ' ')="56"
 *     formatNumber('56.')="56"
 *     formatNumber('56.a')=NaN
 *=======================================================
 */
export const number = (num, precision, separator) => {
  let parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num);
    // 处理小数点位数
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
    // 分离数字的小数部分和整数部分
    parts = num.split('.');
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

    return parts.join('.');

  }
  return "0";
};

const _numParse = function(num, divider, scale, isRoundDown){
  let value = (1.0*num/divider);
  if(isRoundDown){
    value = Math.floor(value);
  }
  return number(value, scale);
};

/** 格式化金额
 *  @param {number} input 需要格式化的数字
 *  @param {boolean} addSymbol 是否加上货币标签
 *  @param {number} precision 小数点长度
 *  @param {boolean} isRoundDown 是否向下取整
 */
export const shortCurrency = (input, addSymbol = true, precision = 2, isRoundDown = false) => {
  let rst = "";
  try{
    if(input){
      const roundDec = 0.51 / Math.pow(10,precision);
      if(input< 10000){
        if(isRoundDown){
          rst  = _numParse(input, 1000, precision, isRoundDown) + 'K';
        }else{
          rst  = _numParse(input, 1, precision, isRoundDown);
        }
      }
      else if(input< (1000 - roundDec) * 1000){
        rst = _numParse(input, 1000, precision, isRoundDown) + 'K';
      }
      else if(input < (1000 - roundDec) * 1000 * 1000){
        rst = _numParse(input, 1000 * 1000, precision, isRoundDown) + 'M';
      }
      else if(input < (1000 - roundDec)  * 1000 * 1000 * 1000){
        rst = _numParse(input, 1000 * 1000 * 1000, precision, isRoundDown) + 'B';
      }
      else if(input >= (1000 - roundDec) * 1000 * 1000 * 1000){
        rst = _numParse(input, 1000 * 1000 * 1000 * 1000, precision, isRoundDown) + 'T';
      }
    }else{
      rst = 0;
    }
  }catch(e){ }
  return  ( addSymbol ? '$'+rst : rst );
};


/** 格式化金额
 *  @param {number} num 需要格式化的数字
 *  @param {boolean} addSymbol 是否加上货币标签
 *  @param {boolean} isStandard 标准金额显示还是缩略显示
 */
export const currency = (num,  addSymbol = true, isStandard = true) => {
  let rst = "";
  try{
    if(!isStandard){
      rst = shortCurrency(num, false, 2);
    }else{
      rst = number(num, 2);
    }

  }catch(e){ }
  return  ( addSymbol ? '￥'+rst : rst );
};

/**
 * 格式化手机
 * @param phone
 * @param addSymbol
 * @param isStandard
 * @returns {string}
 */
export const maskPhone = (phone,  symbol) => {
  let rst = "";
  if (!symbol) {
    symbol = '-XXXX-';
  }
  try{
    if (phone && phone.length === 11){
      rst = phone.substr(0, 3) + symbol + phone.substr(7);
    }
  }catch(e){ }
  return rst
};

export const enableFormat = (v) => {
  return v == 1 ? '已启用' : v == 0 ? '已禁用' : '--';
};
// 获得该月天数
export const  mGetDays=(year, month)=>{
  var d = new Date(year, month, 0);
  return d.getDate();
}
//      获取一周时间
export const getWeek=(date)=>{
  let startDate = new Date(date.getTime())
  let endDate = new Date(date.getTime())
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
  endDate.setDate(endDate.getDate() - endDate.getDay() + 7)
  return [startDate, endDate]
}

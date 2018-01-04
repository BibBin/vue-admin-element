
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';


var vx = { version: '1.0'};

vx.hasProp = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

vx.deleteProp = function(obj, prop) {
  if(vx.hasProp(obj, prop)){
    delete obj[prop];
  }
};

/*
 * isCopyAll: when true, do not check the target property, copy all values from source even when the target do not have the property
 *            when false or null, need to check whether the target has the same property
 * */
vx.copyProps = function(target, source, isCopyAll){
  isCopyAll = isCopyAll || false;
  if(target && source){
    for(var p in source){
      // p is method
      if(typeof(source[p])=="function"){
        // do nothing
      }else{
        if(isCopyAll) {
          target[p] = source[p];
        } else{
          if(vx.hasProp(target, p)){
            target[p] = source[p];
          }
        }
      }
    }
  }
};

vx.compareAndRemoveProps = function(target, source){
  var newDict = {};
  if(target && source){
    for(var p in source){
      // p is method
      if(typeof(source[p])=="function"){
        // do nothing
      }else{
        if(vx.hasProp(target, p)){
          newDict[p] = source[p];
        }
      }
    }
  }
  return newDict;
};

vx.format = function() {
  if (arguments.length == 0)
    return null;

  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
  }
  return str;
};

vx.getPropertyValueList = function(sources, propName){
  var results = [];
  if(sources){
    for(var k in sources){
      var v = sources[k][propName];
      if(v){
        results.push(v);
      }
    }
  }
  return results;
};

vx.isMobile =  function() {
  if(!navigator) throw "Not Supported!";
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true;
  } else {
    return false;
  }
};

vx.getClientIP=function(req){
  var ip=req.header('X-Forwarded-For');
  if(ip && ip.length > 0) {
    var ips=ip.split(",");
    return ips[0];
  }else{
    return req.connection.remoteAddress;
  }
};

vx.isImageFile =  function(fileName) {
  var regex = new RegExp('(jpeg|png|gif|jpg)$', 'i');
  return regex.test(fileName);
};

vx.isString = function(str){
  return (typeof str=='string')&&str.constructor==String;
};

vx.isNumber = function(obj){
  return (typeof obj=='number')&&obj.constructor==Number;
};

vx.isDate = function(obj){
  return (typeof obj=='object')&&obj.constructor==Date;
};

vx.isFunction = function(obj){
  return (typeof obj=='function')&&obj.constructor==Function;
};

vx.isObject = function(obj){
  return (typeof obj=='object')&&obj.constructor==Object;
};

vx.padding = function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s;
};

vx.createUniqueString = function () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
};

vx.generateLink = function (longUrl, campaign) {
  var long_url = longUrl;
  if (campaign.id && campaign.tpCategory) {
    // 关怀活动
    switch (campaign.tpCategory) {
      case '30':
        long_url += `/awake?cid=${campaign.id}`;
        break;
      case '10':
        long_url += `/birthday?cid=${campaign.id}`;
        break;
      case '20':
        long_url += `/milestone?cid=${campaign.id}`;
        break;
      case '70':
        long_url += `/punch-card?cid=${campaign.id}`;
        break;
      default:
        long_url += `/activity/${campaign.tpCategory}?cid=${campaign.id}`;
    }
    return long_url;
  }
};

vx.date = {
  format: function (date, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y': return vx.padding(date.getFullYear(), $0.length);
        case 'M': return vx.padding(date.getMonth() + 1, $0.length);
        case 'd': return vx.padding(date.getDate(), $0.length);
        case 'w': return date.getDay() + 1;
        case 'h': return vx.padding(date.getHours(), $0.length);
        case 'm': return vx.padding(date.getMinutes(), $0.length);
        case 's': return vx.padding(date.getSeconds(), $0.length);
      }
    });
  },

  parse: function (dateString, pattern) {
    var matchs1 = pattern.match(SIGN_REGEXP);
    var matchs2 = dateString.match(/(\d)+/g);
    if (matchs1.length == matchs2.length) {
      var _date = new Date(1970, 0, 1);
      for (var i = 0; i < matchs1.length; i++) {
        var _int = parseInt(matchs2[i]);
        var sign = matchs1[i];
        switch (sign.charAt(0)) {
          case 'y': _date.setFullYear(_int); break;
          case 'M': _date.setMonth(_int - 1); break;
          case 'd': _date.setDate(_int); break;
          case 'h': _date.setHours(_int); break;
          case 'm': _date.setMinutes(_int); break;
          case 's': _date.setSeconds(_int); break;
        }
      }
      return _date;
    }
    return null;
  },

  friendly: function (date, friendly) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (friendly) {
      var now = new Date();
      var mseconds = -(date.getTime() - now.getTime());
      var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000 ];
      if (mseconds < time_std[4]) {
        if (mseconds > 0 && mseconds < time_std[1]) {
          return Math.floor(mseconds / time_std[0]).toString() + ' second(s) ago';
        }
        if (mseconds > time_std[1] && mseconds < time_std[2]) {
          return Math.floor(mseconds / time_std[1]).toString() + ' minute(s) ago';
        }
        if (mseconds > time_std[2] && mseconds < time_std[3]) {
          return Math.floor(mseconds / time_std[2]).toString() + ' hour(s) ago';
        }
        if (mseconds > time_std[3]) {
          return Math.floor(mseconds / time_std[3]).toString() + ' day(s) ago';
        }
      }
    }

    //month = ((month < 10) ? '0' : '') + month;
    //day = ((day < 10) ? '0' : '') + day;
    hour = ((hour < 10) ? '0' : '') + hour;
    minute = ((minute < 10) ? '0' : '') + minute;
    second = ((second < 10) ? '0': '') + second;

    var thisYear = new Date().getFullYear();
    year = (thisYear === year) ? '' : (year + '-');
    return year + month + '-' + day + ' ' + hour + ':' + minute;
  },

  pureDay: function(iDate, isCalTimeZone){
    if(isCalTimeZone == null || isCalTimeZone == window.undefined){
      isCalTimeZone = false;
    }
    var timeZoneOffset = isCalTimeZone? ((new Date(iDate)).getTimezoneOffset() * 60 * 1000 ) : 0;
    return new Date( parseInt((iDate - timeZoneOffset)/(24*3600*1000))*(24*3600*1000) + timeZoneOffset );
  },

  MixToPureDay: function(iDate, isCalTimeZone){
    if(iDate % (3600*1000) > 0){
      return this.pureDay(iDate, isCalTimeZone);
    }else{
      return iDate;
    }
  },

  dayDiff: function(startDate, endDate, isCalStartTimeZone, isCalEndTimeZone){
    if(isCalStartTimeZone == null || isCalStartTimeZone == window.undefined){
      isCalStartTimeZone = false;
    }
    if(isCalEndTimeZone == null || isCalEndTimeZone == window.undefined){
      isCalEndTimeZone = false;
    }

    var stimeZoneOffset = isCalStartTimeZone? (startDate.getTimezoneOffset() * 60 * 1000 ) : 0;
    var etimeZoneOffset = isCalEndTimeZone? (endDate.getTimezoneOffset() * 60 * 1000 ) : 0;

//            return  ( parseInt(endDate/(24*3600*1000)) + stimeZoneOffset )
//                - ( parseInt(startDate/(24*3600*1000))  + etimeZoneOffset);

    return  parseInt((endDate - stimeZoneOffset)/(24*3600*1000))
      - parseInt((startDate - etimeZoneOffset)/(24*3600*1000));
  }
};

vx.localStorage = {
  setItem: function(key, value){
    try{
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }catch (e){
      return false;
    }
  },

  getItem: function(key){
    try{
      return JSON.parse(localStorage.getItem(key));
    }catch (e){
      return null;
    }
  },

  removeItem: function(key){
    try{
      localStorage.removeItem(key);
    }catch (e){}
  }
};

vx.sessionStorage = {
  setItem: function(key, value){
    try{
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    }catch (e){
      return false;
    }
  },

  getItem: function(key){
    try{
      return JSON.parse(sessionStorage.getItem(key));
    }catch (e){
      return null;
    }
  },

  removeItem: function(key){
    try{
      sessionStorage.removeItem(key);
    }catch (e){}
  },

};

export default vx;


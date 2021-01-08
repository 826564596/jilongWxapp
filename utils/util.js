const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 微信登录
 */
const login = () => {
  return new promise(function (resolve, reject) {
    wx.login({
      timeout: 0,
      success(res) {
        if (res.code) {
          //登录服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      }
    })
  })
}
/**对象转成url访问参数 */
const objectToUrl = (obj) => {
  let queryStr = "?";
  for (let o in obj) {
    queryStr = queryStr + o + "=" + encodeURI(obj[o]) + "&";
  }
  return queryStr.substring(0, queryStr.length - 1);
}
/**对象转成url访问参数不进行encodeURI编码 */
const objectToUrlNoEncodeURI = (obj) => {
  let queryStr = "?";
  for (let o in obj) {
    queryStr = queryStr + o + "=" + obj[o] + "&";
  }
  return queryStr.substring(0, queryStr.length - 1);
}
/**秒转成时分秒 */
const secondToHMS = (second) => {
  if (second == 0) return `00:00:00`;
  let h = Math.floor(second / 3600) < 10 ? "0" + Math.floor(second / 3600) : Math.floor(second / 3600);
  let m = Math.floor((second / 60) % 60) < 10 ? "0" + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
  let s = Math.floor(second % 60) < 10 ? "0" + Math.floor(second % 60) : Math.floor(second % 60);
  return h + "时" + m + "分" + s + "秒";
};
/**秒转成时分秒 */
const secondToHMS2 = (second) => {
  if (second == 0) return `00:00:00`;
  let h = Math.floor(second / 3600) < 10 ? "0" + Math.floor(second / 3600) : Math.floor(second / 3600);
  let m = Math.floor((second / 60) % 60) < 10 ? "0" + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
  let s = Math.floor(second % 60) < 10 ? "0" + Math.floor(second % 60) : Math.floor(second % 60);
  return h + ":" + m + ":" + s;
};


/**获取num天前的假期 */
const getDay = (num) => {
  let date1 = new Date();
  //今天时间
  let time1 = date1.getFullYear() + "-" + ((date1.getMonth() + 1).toString().length == 1 ? "0" + (date1.getMonth() + 1) : date1.getMonth() + 1) + "-" + (date1.getDate().toString().length == 1 ? "0" + date1.getDate() : date1.getDate());
  let date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  let time2 = date2.getFullYear() + "-" + ((date2.getMonth() + 1).toString().length == 1 ? "0" + (date2.getMonth() + 1) : date2.getMonth() + 1) + "-" + (date2.getDate().toString().length == 1 ? "0" + date2.getDate() : date2.getDate());

  return num >= 0 ? [time1, time2] : [time2, time1];
};

/**时间戳转时间 */
const timestampToTime = (timestamp) => {
  let date = new Date(timestamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
}

/**获取当前日期 */
const getDate = () => {
  let date = new Date();
  let Y = date.getFullYear() + "-";
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate();
  return Y + M + D;
}
/**10进制转成16位2进制数*/
const tento2 = (number) => {
  let arr = new Array(16).fill("0");
  if (number == 0) {
    return arr;
  }
  let arr2 = parseInt(number).toString(2).split("");
  arr = arr.splice(0, 16 - arr2.length).concat(arr2);
  return arr.reverse();
}

module.exports = {
  formatTime: formatTime,
  login: login,
  objectToUrl: objectToUrl,
  objectToUrlNoEncodeURI:objectToUrlNoEncodeURI,
  secondToHMS: secondToHMS,
  secondToHMS2: secondToHMS2,
  getDay: getDay,
  timestampToTime: timestampToTime,
  getDate: getDate,
  tento2: tento2
}
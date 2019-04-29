/* eslint no-param-reassign: ["error", { "props": false }] */
import qs from 'qs';

export const msToDate = function(lc_date) {
  let dateToMs = new Date(lc_date).getTime();
  let datetime = new Date(dateToMs);
  let year = datetime.getFullYear();
  let month = datetime.getMonth();
  let date = datetime.getDate();
  let formaterTime =
    year +
    "-" +
    (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
    "-" +
    (date + 1 < 10 ? "0" + date : date);

  return formaterTime;
};
export const getWeek = function(date) {
  const week = new Date(date).getDay();
  let weekText = "";
  switch (week) {
    case 0:
      weekText = "星期日";
    case 1:
      weekText = "星期一";
      break;
    case 2:
      weekText = "星期二";
      break;
    case 3:
      weekText = "星期三";
      break;
    case 4:
      weekText = "星期四";
      break;
    case 5:
      weekText = "星期五";
      break;
    case 6:
      weekText = "星期六";
      break;
  }
  return weekText;
};

export function parseLoactionSearch() {
  const code  = window.location.search.substring(1) ;
  const parseCode = code === ""?{code:""}:code;
  return qs.parse(parseCode, { allowDots: true });
}

const formaterDate = type => {
  const currDate = new Date();
  currDate.setDate(currDate.getDate() - type);
  return currDate.toLocaleDateString().replace(/\//g, "-");
};

export const dateList = [0, 1, 2].map(item => {
  return {
    key: formaterDate(item),
    value: formaterDate(item)
  };
});
export const addressList = [
  {
    key: "1",
    value: "学校"
  },
  {
    key: "2",
    value: "社区"
  },
  {
    key: "3",
    value: "校外场馆"
  }
];
export const itemList = [
  { key: "1", value: "足球" },
  { key: "2", value: "篮球" },
  { key: "3", value: "排球" },
  { key: "4", value: "田径" },
  { key: "5", value: "游泳" },
  { key: "6", value: "乒乓球" },
  { key: "7", value: "羽毛球" },
  { key: "8", value: "网球" },
  { key: "9", value: "轮滑" },
  { key: "10", value: "跳绳" },
  { key: "11", value: "毽子" },
  { key: "12", value: "橡皮筋" },
  { key: "13", value: "引体向上" },
  { key: "14", value: "仰卧起坐" },
  { key: "15", value: "立定跳远" },
  { key: "16", value: "俯卧撑" },
  { key: "17", value: "武术" },
  { key: "18", value: "曲棍球" },
  { key: "19", value: "射击" },
  { key: "20", value: "手球" },
  { key: "21", value: "毽球" },
  { key: "22", value: "水上" },
  { key: "23", value: "棒球" },
  { key: "24", value: "垒球" },
  { key: "25", value: "高尔夫球" },
  { key: "26", value: "橄榄球" },
  { key: "27", value: "攀岩" },
  { key: "28", value: "跆拳道" },
  { key: "29", value: "拳击" },
  { key: "30", value: "马术" },
  { key: "31", value: "龙文化" }
];
export const styleList = [
  { key: "1", value: "自主训练", unit: 1 },
  { key: "2", value: "学校课程", unit: 1, disabled:false},
  { key: "3", value: "社会组织", unit: 1 },
  { key: "4", value: "校训校赛", unit: 1.1 },
  { key: "5", value: "区训区赛", unit: 1.2 },
  { key: "6", value: "市训市赛", unit: 1.3 },
  { key: "7", value: "国训国赛", unit: 1.4 }
];

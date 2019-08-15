/**
 * Data
 * @description Interface that contains data to be exposed.
 * In production this should come from a DataBase or other API.
 * Otherwise consider protecting or refactoring it before sending raw.
 */

// Module to recognize .env files for custom variables
const dotenv = require('dotenv');
dotenv.config();

// Use this function in case of fetching data from external resource.
const fetchData = () => {
  return [] // TODO change to fetch action
}

// Raw Data provided in exercise
const rawData = [{
  username: "andrada",
  name: "Andrada",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "mas",
  name: "Más",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "buffarini",
  name: "Buffarini",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "lopez",
  name: "Lopez",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "izquierdoz",
  name: "Izquierdoz",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "Marcone",
  name: "Marcone",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "Benedetto",
  name: "Benedetto",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "Nandez",
  name: "Nandez",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}, {
  username: "Campuzano",
  name: "Campuzano",
  acc6: 112,
  'acc6%': 5.8,
  acc7: 13,
  'acc7%': 0.7,
  acc8: 0,
  'acc8%': 9.32,
  bar1: 11,
  bar2: 33,
  bar3: 9,
}];

// Exports async function that returns data from external resource depending on .env variables.
module.exports = async () => {
  let schema;
  schema = process.env.NODE_ENV === 'production' ?  await fetchData() : rawData;
  return schema;
}






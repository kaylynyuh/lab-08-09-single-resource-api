'use strict';

const storage = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch(err) {
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('expected schemaName'));
    if(!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));
    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    delete schema[id];
    resolve();
  });
};

const express = require('express');
const request = require('request');
const iconv = require('iconv');
const parseString = require('react-native-xml2js').parseString;

const app = express();

const baseUrl = 'http://timetable.sbmt.by';
const query = '/shedule/group/531_M.xml';

const getConvertedXmlResponse = (url, cb) => {
  request({
    uri: url,
    method: 'GET',
    encoding: 'binary'
  }, function (error, response, body) {
    body = new Buffer(body, 'binary');
    conv = new iconv.Iconv('windows-1251', 'utf8');
    body = conv.convert(body).toString();
    parseString(body, { explicitArray: false }, cb);
  });
}

app.get('/parse', (req, res) => {
  const url = `${baseUrl}${req.query.query}`;
  console.log(url)
  getConvertedXmlResponse(url, (err, convertedResponse) => res.json(convertedResponse));
});

app.listen(3000, function () {
  console.log('SBMT shedule parser app listening on port 3000!');
});
//koa에서는 esm을 사용
/*eslint-disable no-global-assign*/ //다음줄 한정으로 eslint에서 설정을 건드리지 않음

require = require('esm')(module);
module.exports = require('./main.js');

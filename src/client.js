var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');



module.exports = rest
    .wrap(mime)
    .wrap(errorCode)
    .wrap(defaultRequest, {headers: {'Accept': 'application/json'}});
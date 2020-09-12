const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 5500;

const urlJSONStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};
const urlXMLStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': xmlHandler.success,
  '/badRequest': xmlHandler.badRequest,
  '/unauthorized': xmlHandler.unauthorized,
  '/forbidden': xmlHandler.forbidden,
  '/internal': xmlHandler.internal,
  '/notImplemented': xmlHandler.notImplemented,
  notFound: xmlHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  if (acceptedTypes[0] === 'text/xml') {
    if (urlXMLStruct[parsedUrl.pathname]) {
      return urlXMLStruct[parsedUrl.pathname](request, response, params);
    }
    return urlXMLStruct.notFound(request, response, params);
  }

  if (urlJSONStruct[parsedUrl.pathname]) {
    return urlJSONStruct[parsedUrl.pathname](request, response, params);
  }
  return urlJSONStruct.notFound(request, response, params);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

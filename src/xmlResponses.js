const respondXML = (request, response, status, xmlString) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(xmlString);
  response.end();
};

const success = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'This is a successful response'}</message>`;
  responseXML = `${responseXML} </response>`;

  respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  if (!params.valid || params.valid !== 'true') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${'Missing valid query parameter set equal to true'}</message>`;
    responseXML = `${responseXML} <id>${'badRequest'}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 400, responseXML);
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'This request has the required parameters'}</message>`;
  responseXML = `${responseXML} </response>`;
  return respondXML(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${'Missing loggedIn query parameter set equal to yes'}</message>`;
    responseXML = `${responseXML} <id>${'unauthorized'}</id>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 401, responseXML);
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'You have successfully viewed the content'}</message>`;
  responseXML = `${responseXML} </response>`;
  return respondXML(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'You do not have access to this content'}</message>`;
  responseXML = `${responseXML} <id>${'forbidden'}</id>`;
  responseXML = `${responseXML} </response>`;

  return respondXML(request, response, 403, responseXML);
};

const internal = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'Internal server error. Please report to page owner.'}</message>`;
  responseXML = `${responseXML} <id>${'internal'}</id>`;
  responseXML = `${responseXML} </response>`;

  return respondXML(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'A get request has not been implemented yet. Please check back later for content.'}</message>`;
  responseXML = `${responseXML} <id>${'notimplemented'}</id>`;
  responseXML = `${responseXML} </response>`;

  return respondXML(request, response, 501, responseXML);
};

const notFound = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${'The page you are looking for was not found.'}</message>`;
  responseXML = `${responseXML} <id>${'notfound'}</id>`;
  responseXML = `${responseXML} </notFound>`;

  return respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

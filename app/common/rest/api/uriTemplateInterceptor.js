import interceptor from 'rest/interceptor';

export default interceptor({
  request(request) {
    if (request.path.indexOf('{') === -1) {
      return request;
    }
    const [path] = request.path.split('{');
    request.path = path;
    return request;
  },
});

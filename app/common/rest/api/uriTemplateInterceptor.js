import interceptor from 'rest/interceptor';

export default interceptor({
    request(request) {
        if (request.path.indexOf('{') === -1) {
            return request;
        }

        request.path = request.path.split('{')[0];
        return request;
    },
});
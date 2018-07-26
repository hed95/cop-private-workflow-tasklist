import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import rest from 'rest';
import defaultRequest from 'rest/interceptor/defaultRequest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import baseRegistry from 'rest/mime/registry';
import halMimeType from 'rest/mime/type/application/hal';
import templateUriInterceptor from 'rest/interceptor/template';

import uriListConverter from './api/uriListConverter';

const registry = baseRegistry.child();

registry.register('text/uri-list', uriListConverter);
registry.register('application/hal+json', halMimeType);

const halRest = rest
    .wrap(templateUriInterceptor)
    .wrap(mime, { registry })
    .wrap(errorCode)
    .wrap(defaultRequest, { headers: { Accept: 'application/hal+json' } });

export default function () {
    return Observable.defer(() => Observable.fromPromise(halRest(...arguments)));
}
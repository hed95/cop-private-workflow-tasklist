import * as Rx from 'rxjs/Observable';

export const retry = (errors) => {
  const sourcesWithCatch = errors.flatMap(s => {
    return Rx.Observable.throw(s);
  });
  return errors.flatMap((error) => {
    const statusCode = error.status.code;
    if ((statusCode === 403 || statusCode === 401) || (statusCode >= 500)) {
      console.log(`${statusCode}...retrying...`);
      return Rx.Observable.of(error.status).delay(1000);
    } else {
      return Rx.Observable.throw(error);
    }
  }).take(5)
    .concat(sourcesWithCatch);
};

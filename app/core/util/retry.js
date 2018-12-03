import * as Rx from 'rxjs/Observable';

export const retry = (errors) => {
  const sourcesWithCatch = errors.flatMap(s => {
    return Rx.Observable.throw(s);
  });
  return errors.flatMap((error) => {
    if (error.status.code === 403 || (error.status.code >= 500)) {
      console.log(`${error.status.code}...retrying...`);
      return Rx.Observable.of(error.status).delay(1000);
    } else {
      return Rx.Observable.throw(error);
    }
  }).take(5)
    .concat(sourcesWithCatch);
};

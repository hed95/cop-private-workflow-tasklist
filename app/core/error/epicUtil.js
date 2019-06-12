import * as actions from './actions';
import { Observable } from 'rxjs/Observable';


const errorObservable = (failureAction, error) => {
  if (error.status.code === 403) {
    return Observable.concat(Observable.of(actions.handleUnauthorised()),
            Observable.of(failureAction));
  }
  return Observable.concat(Observable.of(failureAction),
            Observable.of(actions.handleError(error)));
};

export {
    errorObservable,
};

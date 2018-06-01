import * as actions from "./actions";
import {Observable} from "rxjs/Observable";


const errorObservable = (failureAction, error) => {
    if (error.status.code === 401) {
        return Observable.concat(Observable.of(actions.handleAuthorised()),
            Observable.of(failureAction));
    } else {
        return Observable.concat(Observable.of(failureAction),
            Observable.of(actions.handleError(error)));
    }
};

export {
    errorObservable
}
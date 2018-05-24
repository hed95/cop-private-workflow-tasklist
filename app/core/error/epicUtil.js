import * as actions from "./actions";
import {Observable} from "rxjs/Observable";


const errorObservable = (failureAction, error) => {
    if (error.status.code === 401) {
        return Observable.of(actions.handleAuthorised());
    } else {
        return Observable.concat(Observable.of(failureAction),
            Observable.of(actions.handleError(error)));
    }
};

export {
    errorObservable
}
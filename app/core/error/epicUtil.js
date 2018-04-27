import * as actions from "./actions";
import {Observable} from "rxjs/Observable";


const errorObservable = (failureAction, error) => {
    return Observable.concat(Observable.of(failureAction),
        Observable.of(actions.handleError(error)));
};

export {
    errorObservable
}
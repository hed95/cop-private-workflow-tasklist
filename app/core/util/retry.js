import * as Rx from "rxjs/Observable";

export const retryOnForbidden = (errors) => {
    return errors.flatMap((error) => {
        if (error.status.code === 403) {
            console.log('403...retrying...');
            return Rx.Observable.of(error.status).delay(1000)
        } else {
            return Rx.Observable.throw(error);
        }
    }).delay(1000)
        .take(5)
        .concat(Rx.Observable.throw({
            status: {
                code: 401
            }
        }));
};
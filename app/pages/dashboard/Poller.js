const minutes = (m) => m * 1000 * 60;

export default class Poller {
    constructor(interval, name) {
        this.name = name;
        this.cancelPoller = this.cancelPoller.bind(this);
        this.startPoller = this.startPoller.bind(this);
        this.interval = minutes(interval);

    }

    startPoller(op) {
        this.intervalRef = setInterval(() => {
            console.log(`Requesting data for ${this.name}...`);
            op();
        }, this.interval);
    }

    cancelPoller() {
        if (this.intervalRef) {
            clearTimeout(this.intervalRef);
        }
    }

}
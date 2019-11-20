import {Details} from 'govuk-frontend';
import * as types from "react-device-detect";

export default class GovUKFrontEndObserver {
    constructor(node) {
        this.node = node;
    }

    create() {
        if (types.isEdge) {
            this.observer = new MutationObserver(() => {
                const details = this.node.querySelectorAll('[data-module="govuk-details"]');
                details.forEach((detail) => {
                    new Details(detail).init();
                });
            });
            this.observer.observe(this.node, {childList: true, attributes: false});
        }
        return this;
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

}

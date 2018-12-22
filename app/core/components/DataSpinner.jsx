
import React from 'react';
import Spinner from 'react-spinkit';

export class DataSpinner extends React.Component {
    render() {
        return <div id="dataSpinner">
            <div className="loader-content">
                <Spinner
                    name="line-spin-fade-loader" color="black"/>
            </div>
            <div className="loader-message"><strong className="bold">
                {this.props.message}
            </strong></div>
        </div>
    }
}

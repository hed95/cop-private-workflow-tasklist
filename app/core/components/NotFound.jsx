
import React from 'react';
export default class NotFound extends React.Component {

    render() {
        const {resource, id} = this.props;
        return <div>
            {resource} with {id} was not found
        </div>
    }
}
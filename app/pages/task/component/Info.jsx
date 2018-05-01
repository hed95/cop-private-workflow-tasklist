import React from "react";

class Info extends React.Component {
    render() {
        const {task} = this.props;

        return <div>{task.get('name')}</div>


    }
}

export default Info;
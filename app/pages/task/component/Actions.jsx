import React from "react";
import Claim from "./Claim";
import Unclaim from "./Unclaim";
import Complete from "./Complete";

export default class Actions extends React.Component {

    render() {
        const {task} = this.props;

        return <div className="btn-toolbar" style={{paddingTop: '20px'}}>
            <Claim task={task}/>
            <Unclaim task={task} />
            <Complete task={task}/>
        </div>
    }
}

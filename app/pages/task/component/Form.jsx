import React from "react";
import TaskForm from "../../../core/task-form/components/TaskForm";

class FormPage extends React.Component {

    render() {
        const {task} = this.props;
        const formDisabled =true;

        return <div className="task-form">
            <fieldset>
                <TaskForm disabled={formDisabled} {...this.props}/>
            </fieldset>
        </div>
    }
}

export default FormPage;
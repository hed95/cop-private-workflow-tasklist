import React from 'react';

class MyGroupTasks extends React.Component {
    render() {
        return <div className="grid-row">

            <div className="column-one-half">
                <div className="data">
                    <span className="data-item bold-xlarge">0</span>
                    <span className="data-item bold-small">Assigned Tasks</span>
                </div>
            </div>

            <div className="column-one-half">
                <div className="data">
                    <span className="data-item bold-xlarge">0</span>
                    <span className="data-item bold-small">Unassigned Tasks</span>
                </div>
            </div>

        </div>
    }
}

export default MyGroupTasks;
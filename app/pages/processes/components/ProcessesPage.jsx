import React, {PropTypes} from 'react'
import {
    errorMessage, hasError,
    isFetchingProcessDefinitions,
    processDefinitions
} from "../selectors";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import ImmutablePropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";

class ProcessesPage extends React.Component {

    componentDidMount() {
        this.props.fetchProcessDefinitions();
        this.process = this.process.bind(this);
    }

    process = (process) => {
        this.props.history.replace("/process-start/" + process.getIn(["process-definition", "key"]));
    };

    render() {
        const {isFetchingProcessDefinitions, processDefinitions} = this.props;

        const pointerStyle = {cursor: 'pointer'};

        return <div>
            {isFetchingProcessDefinitions ? <div>Loading Processes....</div> : <div>
                <table>
                    <caption className="heading-small">Processes</caption>
                    <tbody>
                    {
                        processDefinitions.map(p => {
                            return <tr style={pointerStyle} onClick={() => this.process(p)}>
                                    <td>{p.getIn(['process-definition', 'name'])}</td>
                                    <td>{p.getIn(['process-definition', 'description'])}</td>
                                 </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>}
        </div>
    }
}

ProcessesPage.propTypes = {
    fetchProcessDefinitions: PropTypes.func.isRequired,
    processDefinitions: ImmutablePropTypes.list.isRequired,
    isFetchingProcessDefinitions: PropTypes.bool,
    hasError: PropTypes.bool,
    errorMessage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    processDefinitions: processDefinitions,
    isFetchingProcessDefinitions: isFetchingProcessDefinitions,
    hasError: hasError,
    errorMessage: errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProcessesPage));

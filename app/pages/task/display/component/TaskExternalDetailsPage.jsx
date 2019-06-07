class TaskExternalDetailsPage extends React.Component {
    render() {
        return <div></div>
    }
}
export default TaskExternalDetailsPage;

TaskDetailsPage.propTypes = {
    updateDueDate: PropTypes.func.isRequired,
    submissionStatus: PropTypes.string,
    customEventSubmissionStatus: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        submissionStatus: submissionStatus(state),
        customEventSubmissionStatus: customEventSubmissionStatus(state),
        appConfig: appConfig(state)
    };
}, mapDispatchToProps)(TaskDetailsPage));

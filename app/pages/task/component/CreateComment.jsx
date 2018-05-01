import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import {createStructuredSelector} from "reselect";
import {isFetchingCreateCommentForm, form, showCreateComment} from "../selectors";
import {createForm} from "formiojs";

class CreateComment extends React.Component {

    componentDidMount() {
        this.props.fetchCreateCommentForm();
    }

    render() {
        const {isFetchingCreateCommentForm} = this.props;
        const that = this;
        if (!isFetchingCreateCommentForm && this.props.form) {
            $("#createComment").empty();
            const parsedForm = this.props.form;
            createForm(document.getElementById("createComment"), parsedForm, {
                noAlerts: true
            }).then(function (form) {
                form.on('submit', (submission) => {
                    that.props.createComment({taskId: that.props.taskId, comment: submission.data});
                    form.emit('submitDone');
                    form.reset();
                    form.render();
                });
                form.on('error', (errors) => {
                    console.log('IFrame: we have errors!', errors);
                    window.scrollTo(0, 0);
                    form.emit('submitDone');
                });
            }).catch(function (e) {
                console.log('IFrame: caught formio error in promise', e);
            });
        }

        return <div className="panel">
            <div id="createComment"/>
        </div>

    }
}


CreateComment.propTypes = {
    fetchCreateCommentForm: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    isFetchingCreateCommentForm: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    isFetchingCreateCommentForm: isFetchingCreateCommentForm,
    form: form,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);

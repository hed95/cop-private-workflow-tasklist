import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import {createStructuredSelector} from "reselect";
import {form, isFetchingCreateCommentForm} from "../selectors";
import {Form} from 'react-formio'

class CreateComment extends React.Component {

    componentDidMount() {
        this.props.fetchCreateCommentForm();
    }

    renderForm() {
        const {isFetchingCreateCommentForm, form} = this.props;
        if (isFetchingCreateCommentForm) {
            return <div>Loading....</div>
        } else {

            const options = {
                noAlerts: true
            };
            if (form) {
                return <div><Form form={form} options={options}
                               ref={(form) => this.form = form}
                               onSubmit={(submission) =>{
                                   this.props.createComment({taskId: this.props.taskId, comment: submission.data});
                                   this.form.formio.emit('submitDone');
                                   this.form.formio.resetValue();
                                   this.form.formio.render();

                               }}/></div>
            } else {
                return <div/>
            }
        }
    }

    render() {
        return <div id="commentContainer">
            {this.renderForm()}
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

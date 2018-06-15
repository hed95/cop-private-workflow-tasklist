import React, {PropTypes} from "react";
import CreateComment from "./CreateComment";
import ImmutablePropTypes from "react-immutable-proptypes";
import {comments, isFetchingComments} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import moment from "moment";
import Pagination from "../../../core/components/Pagination";

class Comments extends React.Component {

    constructor() {
        super();
        this.state = {
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
        this.setState({pageOfItems: []});
        this.props.fetchComments(`/api/workflow/tasks/${this.props.taskId}/comments`);

    }

    componentWillUnmount() {
        this.setState({pageOfItems: []});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskId !== this.props.taskId) {
            this.setState({pageOfItems: []});
            this.props.fetchComments(`/api/workflow/tasks/${nextProps.taskId}/comments`);
        }
    }
    render() {

        const {isFetchingComments, comments} = this.props;
        return <div>
            <div className="data">
                <span className="data-item bold-medium">{comments.size} {comments.size === 1? 'comment' : 'comments'}</span>
            </div>
            {!isFetchingComments ? <div>
                    {this.state.pageOfItems.map((comment) => {
                        return <div key={comment.get('id')}>
                            {comment.get('userId')} <span style={{
                            color: '#6f777b',
                            fontSize: '16px',
                            lineHeight: '1.25'
                        }}> {moment(comment.get('time')).fromNow(false)}</span>
                            <div className="comment-body">
                                <p>{comment.get('message')}</p>
                            </div>
                        </div>
                    })}
                    <Pagination items={comments} pageSize={5} onChangePage={this.onChangePage} />
                </div> :
                <div>Loading comments...</div>}

                <CreateComment taskId={this.props.taskId}/>

        </div>
    }
}

Comments.propTypes = {
    fetchComments: PropTypes.func.isRequired,
    isFetchingComments: PropTypes.bool,
    comments: ImmutablePropTypes.list,
};

const mapStateToProps = createStructuredSelector({
    isFetchingComments: isFetchingComments,
    comments: comments,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

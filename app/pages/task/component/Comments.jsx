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
import ShowMore from 'react-show-more';

const uuidv4 = require('uuid/v4');
import Collapsible from 'react-collapsible';

class Comments extends React.Component {

    constructor() {
        super();
        this.state = {
            pageOfItems: [],
            isOpen: true
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({pageOfItems: pageOfItems});
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
        const pointerStyle = {cursor: 'pointer', textDecoration: 'underline'};

        const commentsView = <Collapsible triggerStyle={pointerStyle} trigger={this.state.isOpen ? 'Hide all comments' : 'Show all comments'} open={true} onOpen={() =>{
            this.setState({isOpen: true});
        }} onClose={() => {
            this.setState({isOpen: false});
        }}><div>
            {this.state.pageOfItems.map((comment) => {
                return <div key={uuidv4()}>
                            <span className="font-xsmall">{comment.get('email')} <span
                                className="text-secondary"> {moment(comment.get('createdon')).fromNow(false)}</span></span>
                    <div className="gov-panel">
                        <div className="panel panel-border-wide small">
                            <ShowMore
                                lines={1}
                                more='Show more'
                                less='Show less'
                                anchorClass=''>
                                {comment.get('taskcomment')}
                            </ShowMore>
                        </div>
                    </div>
                </div>
            })}
            <Pagination items={comments} pageSize={5} onChangePage={this.onChangePage}/>
        </div></Collapsible>;
        return <div>
            <div className="data">
                <span
                    className="data-item bold-medium">{comments.size} {comments.size === 1 ? 'comment' : 'comments'}</span>
            </div>
            <CreateComment taskId={this.props.taskId}/>
            {!isFetchingComments && comments.size !== 0 ? commentsView : <div/>}

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

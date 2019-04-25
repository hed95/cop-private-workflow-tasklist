import React from "react";
import PropTypes from 'prop-types';
import CreateComment from "./CreateComment";
import ImmutablePropTypes from "react-immutable-proptypes";
import {comments, isFetchingComments} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import moment from "moment";
import Pagination from "../../../../core/components/Pagination";
import ShowMore from 'react-show-more';
import Collapsible from 'react-collapsible';

const uuidv4 = require('uuid/v4');

export class Comments extends React.Component {

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
        }}>
            <div>
                {this.state.pageOfItems.map((comment) => {
                    return <div className="govuk-card" key={uuidv4()}>
                        <div className="govuk-card__content">
                            <h4 className="govuk-heading-s">
                                <span
                                    className="govuk-caption-s">{moment(comment.get('createdon')).fromNow(false)}</span>
                                {comment.get('email')}
                            </h4>
                            <ShowMore
                                lines={2}
                                more='Show more'
                                less='Show less'
                                anchorClass='govuk-link govuk-link--no-visited-state'>
                                <p className="govuk-body-s">{comment.get('comment')}</p>
                            </ShowMore>
                        </div>
                    </div>
                })}
                <Pagination items={comments} pageSize={5} onChangePage={this.onChangePage}/>
            </div>
        </Collapsible>;
        return <div>
            <CreateComment taskId={this.props.taskId} {...this.props}/>
            <div className="data">
                <span
                    className="data-item govuk-!-font-size-24 govuk-!-font-weight-bold">{comments.size} {comments.size === 1 ? 'comment' : 'comments'}</span>
            </div>
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

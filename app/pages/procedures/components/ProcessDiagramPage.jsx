import React, { PropTypes } from 'react';
import ProcessViewer from '../../../core/process-viewer/ProcessViewer';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { createStructuredSelector } from 'reselect';
import { isFetchingProcessDefinition, processDefinition, isFetchingProcessDefinitionXml, processDefinitionXml} from '../selectors';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';import {connect} from "react-redux";
import Spinner from 'react-spinkit';

class ProcessDiagramPage extends React.Component {

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.props.fetchProcessDefinition(params.processKey);
    this.props.fetchProcessDefinitionXml(params.processKey);

  }

  render() {
    const {isFetchingProcessDefinition, processDefinition, processDefinitionXml, isFetchingProcessDefinitionXml} = this.props;

    const pointerStyle = {cursor: 'pointer', paddingTop: '2px', textDecoration: 'underline'};

    return <div>
      <div style={pointerStyle} onClick={(event) => this.props.history.replace('/procedures')}>Back to
        procedures
      </div>
      {isFetchingProcessDefinition && isFetchingProcessDefinitionXml ?  <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20%'}}><Spinner
        name="line-spin-fade-loader" color="black"/></div> : <div>
        <ProcessViewer processDefinition={processDefinition} xml={processDefinitionXml}/>
      </div> }
    </div>

  }
}
ProcessDiagramPage.propTypes = {
  fetchProcessDefinition: PropTypes.func.isRequired,
  fetchProcessDefinitionXml: PropTypes.func.isRequired,
  processDefinition: ImmutablePropTypes.map,
  processDefinitionXml: PropTypes.string,
  isFetchingProcessDefinition: PropTypes.bool,
  isFetchingProcessDefinitionXml: PropTypes.bool,


};

const mapStateToProps = createStructuredSelector({
  processDefinition: processDefinition,
  isFetchingProcessDefinition: isFetchingProcessDefinition,
  processDefinitionXml: processDefinitionXml,
  isFetchingProcessDefinitionXml: isFetchingProcessDefinitionXml

});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessDiagramPage));


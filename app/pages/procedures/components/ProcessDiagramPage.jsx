import React  from 'react';
import PropTypes from 'prop-types';
import ProcessViewer from '../../../core/process-viewer/ProcessViewer';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { createStructuredSelector } from 'reselect';
import { isFetchingProcessDefinition, processDefinition, isFetchingProcessDefinitionXml, processDefinitionXml} from '../selectors';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';import {connect} from "react-redux";
import Spinner from 'react-spinkit';
import { isMobile }   from "react-device-detect";
class ProcessDiagramPage extends React.Component {

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.props.fetchProcessDefinition(params.processKey);
    this.props.fetchProcessDefinitionXml(params.processKey);

  }

  componentWillUnmount() {
    this.props.reset();
  }


  render() {
    const {isFetchingProcessDefinition, processDefinition, processDefinitionXml, isFetchingProcessDefinitionXml} = this.props;
    const pointerStyle = {cursor: 'pointer', paddingTop: '2px', textDecoration: 'underline'};

    if (isMobile) {
      return <div>
        <div style={pointerStyle} onClick={(event) => this.props.history.replace('/procedures')}>Back to
          procedures
        </div>
        <div className="heading-medium">Process diagram not viewable on mobile screen</div>
      </div>
    }

    return <div>
      <div id="backToProcedures" style={pointerStyle} onClick={(event) => this.props.history.replace('/procedures')}>Back to
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


import React from 'react';
import PropTypes from 'prop-types';
import {
  isFetchingProcessDefinitions,
  processDefinitions
} from '../selectors';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import { isMobile }  from "react-device-detect";

export class ProceduresPage extends React.Component {

  componentDidMount() {
    this.props.fetchProcessDefinitions();
    this.process = this.process.bind(this);
    this.viewProcessDiagram = this.viewProcessDiagram.bind(this);
  }

  process = (process) => {
    this.props.history.replace('/procedure-start?processKey=' + process.getIn(['process-definition', 'key']));
  };

  viewProcessDiagram = (process) => {
    this.props.history.replace('/process-diagram?processKey=' + process.getIn(['process-definition', 'key']));
  };

  render() {
    const { isFetchingProcessDefinitions, processDefinitions } = this.props;
    const pointerStyle = { cursor: 'pointer' };

    const data = processDefinitions ? processDefinitions.map((p) => {
        return {
          key: p.getIn(['process-definition', 'key']),
          name: <div style={pointerStyle} onClick={() => this.process(p)}>{p.getIn(['process-definition', 'name'])}</div>,
          description: <div style={pointerStyle} onClick={() => this.process(p)}>{p.getIn(['process-definition', 'description'])}</div>,
          diagram: <div style={pointerStyle} onClick={() => this.viewProcessDiagram(p)}>View procedure</div>
        }
    }).toArray() : [];

    const headers = !isMobile ? {
      name: 'Name',
      description: 'Description',
      diagram : ''
    } : {
      name: 'Name',
      description: 'Description'
    };

    return <div>
      <div className="grid-row">
        <div className="column-one-half">
          <h2 className="heading-large">
                    <span
                      className="heading-secondary">Operational procedures</span> {processDefinitions.size} procedures
          </h2>
        </div>

      </div>
      {isFetchingProcessDefinitions ? <div id="loading">Loading processes....</div> :
          <ReactHyperResponsiveTable
          headers={headers}
          rows={data}
          keyGetter={row => row.key}
          breakpoint={578}
          tableStyling={({ narrow }) => (narrow ? 'narrowtable-process' : 'widetable')}
        />
      }

    </div>;
  }
}

ProceduresPage.propTypes = {
  fetchProcessDefinitions: PropTypes.func.isRequired,
  processDefinitions: ImmutablePropTypes.list.isRequired,
  isFetchingProcessDefinitions: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  processDefinitions: processDefinitions,
  isFetchingProcessDefinitions: isFetchingProcessDefinitions
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProceduresPage));

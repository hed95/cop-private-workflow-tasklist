import React from 'react';
import CustomBpmnViewer from './CustomBpmnViewer';
import ZoomControls from './ZoomControls';
import './bpmnio.css';

let scale = 1;

export default class ProcessViewer extends React.Component {

  componentDidMount() {

    document.body.className = 'shown';
    this.bpmnModeler = new CustomBpmnViewer({
      additionalModules: [],
      height: '100%',
      width: '100%',
      keyboard: { bindTo: document },
      container: '#canvas',
      moddleExtensions: {}
    });

    const { xml } = this.props;

    this.renderDiagram(xml);
  }

  componentWillReceiveProps(nextProps) {
    const { xml } = nextProps;
    if (xml && xml !== this.props.xml) {
      this.renderDiagram(xml);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  renderDiagram = (xml) => {
    this.bpmnModeler.importXML(xml, err => {
      if (err) {
        console.log('error rendering', err);
      } else {
        this.bpmnModeler.getDefinitions();
        this.bpmnModeler.get('canvas').zoom('fit-viewport');
        console.log('successfully rendered');
      }
    });
  };

  handleZoom = () => {
    this.bpmnModeler.get('canvas')
      .zoom(scale);
  };

  handleZoomIn = () => {
    scale += 0.1;
    this.handleZoom();
  };

  handleZoomOut = () => {
    if (scale <= 0.3) {
      scale = 0.2;
    } else {
      scale -= 0.1;
    }
    this.handleZoom();
  };

  handleZoomReset = () => {
    scale = 1;
    this.bpmnModeler.get('canvas').zoom('fit-viewport');
  };

  render() {
    const { processDefinition } = this.props;
    return <div>
      <div style={{ textAlign: 'center', marginTop: '5px' }}
           className="heading-medium">{processDefinition.getIn(['process-definition', 'name'])}</div>

      <div className="process-content">
        <div id="canvas"/>
      </div>
      <ZoomControls
        onZoomIn={this.handleZoomIn}
        onZoomOut={this.handleZoomOut}
        onZoomReset={this.handleZoomReset}
      />
    </div>;
  }
}

import NavigatedViewer from 'bpmn-js/dist/bpmn-viewer.production.min';
import inherits from 'inherits';

export default function CustomBpmnViewer(options) {
  NavigatedViewer.call(this, options);
}

inherits(CustomBpmnViewer, NavigatedViewer);


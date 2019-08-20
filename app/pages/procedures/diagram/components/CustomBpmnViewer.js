import NavigatedViewer from 'bpmn-js/dist/bpmn-navigated-viewer.production.min';
import inherits from 'inherits';

export default function CustomBpmnViewer(options) {
  NavigatedViewer.call(this, options);
}

inherits(CustomBpmnViewer, NavigatedViewer);

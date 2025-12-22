import BpmnModeler from 'bpmn-js/lib/Modeler';
import MinimapModule from 'diagram-js-minimap';
import OperatorModule from '../dist/diagram-js-operator.esm.js'; // ← 直接引用 dist
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import '../dist/diagram-js-operator.css';

console.log('bpmnModeler');
const bpmnModeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [MinimapModule, OperatorModule],
  // operator: {
  //   disabledActions: [],
  // },
});

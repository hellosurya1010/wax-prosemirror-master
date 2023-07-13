import { Service } from 'wax-prosemirror-core';
import MathEquationTool from './MathEquationTool';

class MathEquationService extends Service {
  name = 'MathEquationService';

  register() {
    this.container.bind('MathEquationTool').to(MathEquationTool);
  }
}
export default MathEquationService;

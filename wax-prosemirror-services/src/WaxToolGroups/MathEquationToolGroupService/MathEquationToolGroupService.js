import { Service } from 'wax-prosemirror-core';
import MathEquation from './MathEquation';

class MathEquationToolGroupService extends Service {
  register() {
    this.container.bind('MathEquation').to(MathEquation);
  }
}

export default MathEquationToolGroupService;

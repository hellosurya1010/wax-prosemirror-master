import { Service } from 'wax-prosemirror-core';
import MathEquationTool from './MathEquationTool';
import mathNode from './schema/mathNode';
import './css/math.css'
import './css/normalize.css'
import './css/skeleton.css'

class MathEquationService extends Service {
  name = 'MathEquationService';

  register() {
    const mathTags = [
      { tag: 'mi', group: 'inline' },
      { tag: 'mrow', group: 'inline' },
      { tag: 'msqrt', group: 'inline' },
      { tag: 'math', group: 'inline' },
      { tag: 'mfrac', group: 'inline' },
      { tag: 'munderover', group: 'inline' },
      { tag: 'mo', group: 'inline' },
      { tag: 'mtd', group: 'inline' },
      { tag: 'mtr', group: 'inline' },
      { tag: 'mtable', group: 'inline' },
      { tag: 'mtext', group: 'inline' },
      { tag: 'mmultiscripts', group: 'inline' }
    ];

    const createNode = this.container.get('CreateNode');
    this.container.bind('MathEquationTool').to(MathEquationTool);
    mathTags.forEach(tag => {
      const options = mathNode(tag);
      console.log(options);
      createNode({
        [tag]: options,
      });
    });
  }
}
export default MathEquationService;

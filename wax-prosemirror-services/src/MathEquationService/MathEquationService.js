import { Service } from 'wax-prosemirror-core';
import MathEquationTool from './MathEquationTool';
import mathNode from './schema/mathNode';
// import './css/math.css'
// import './css/normalize.css'
// import './css/skeleton.css'
import './css/math-tag.css'
import { createHtmlNode } from './schema/htmlNodes';

class MathEquationService extends Service {
  name = 'MathEquationService';

  boot() {
    const {
      schema: { schema },
    } = this.app;
    console.log(schema);
  }

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
    console.log(this.container);
    this.container.bind('MathEquationTool').to(MathEquationTool);
    mathTags.forEach(item => {
      const options = mathNode(item);
      // console.log(options);
      createNode({
        [item.tag]: options,
      });
    });

    createHtmlNode({createNode})
    
  }
}
export default MathEquationService;

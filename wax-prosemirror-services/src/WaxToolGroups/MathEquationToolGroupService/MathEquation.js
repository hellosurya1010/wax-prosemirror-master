import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class MathEquation extends ToolGroup {
  tools = [];
  constructor(@inject('MathEquationTool') mathEquationTool) {
    console.log(mathEquationTool);
    super();
    this.tools = [mathEquationTool];
  }
}

export default MathEquation;
  
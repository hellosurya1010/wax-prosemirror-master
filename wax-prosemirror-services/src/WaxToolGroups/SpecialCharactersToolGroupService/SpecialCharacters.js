import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class SpecialCharacters extends ToolGroup {
  tools = [];
  constructor(@inject('SpecialCharactersTool') specialCharactersTool) {
    super();
    console.log(specialCharactersTool);
    this.tools = [specialCharactersTool];
  }
}

export default SpecialCharacters;

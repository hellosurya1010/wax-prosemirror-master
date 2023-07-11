import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class InlineAnnotaitonV2Group extends ToolGroup {
  tools = [];
  constructor(@inject('InlineAnnotationToolV2') texthighlight) {
    console.log('v2', texthighlight);
    super();
    this.tools = [texthighlight];
  }
}

export default InlineAnnotaitonV2Group;

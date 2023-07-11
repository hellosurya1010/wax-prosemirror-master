import { Service } from 'wax-prosemirror-core';
import InlineAnnotaitonV2Group from './InlineAnnotaitonV2Group';

class InlineAnnotaitonV2GroupServices extends Service {
  register() {
    this.container.bind('InlineAnnotaitonV2Group').to(InlineAnnotaitonV2Group);
  }
}

export default InlineAnnotaitonV2GroupServices;

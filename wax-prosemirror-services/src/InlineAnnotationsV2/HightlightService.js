import { Service } from 'wax-prosemirror-core';
import highlightMark from './schema/highlightMark';
import InlineAnnotationToolV2 from './InlineAnnotationToolV2';

export default class HighlightService extends Service {
  register() {
    this.container.bind('InlineAnnotationToolV2').to(InlineAnnotationToolV2);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        highlight: highlightMark,
      },
      { toWaxSchema: true },
    );
  }
}

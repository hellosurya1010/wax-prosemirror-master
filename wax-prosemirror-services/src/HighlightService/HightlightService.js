import { Service } from 'wax-prosemirror-core';
import highlightMark from './schema/highlightMark';
import TextHighlightTool from './TextHighlightTool';
import axios from 'axios';
import { backendApiUrl } from '../../../editor-config';
import { store } from '../../../editors/demo/src/store/store';

export default class HighlightService extends Service {
  register() {
    this.container.bind('TextHighlightTool').to(TextHighlightTool);
    const createMark = this.container.get('CreateMark');

    const {referenceElements} = store.getState();
    
    for(let refEl of referenceElements){
      createMark(
        {
          highlight: highlightMark(refEl),
        },
        { toWaxSchema: true },
      );
    }

  }
}

import { Service } from 'wax-prosemirror-core';
import { toggleMark } from 'prosemirror-commands';
import refferenceTaggingServiceMark from './schema/refferenceTaggingServiceMark';
import RefferenceTaggingTool from './RefferenceTaggingTool';

class RefferenceTaggingService extends Service {
  register() {
    this.container.bind('RefferenceTaggingTool').to(RefferenceTaggingTool);
    const createMark = this.container.get('CreateMark');
    const CreateShortCut = this.container.get('CreateShortCut');

    createMark(
      {
        refferenceTagging: refferenceTaggingServiceMark,
      },
      { toWaxSchema: true },
    );

    // CreateShortCut({
    //   'Mod-i': toggleMark(this.schema.marks.em),
    // });
  }
}

export default RefferenceTaggingService;

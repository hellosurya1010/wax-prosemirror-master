import { toggleMark } from 'prosemirror-commands';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';
import { clearSelection } from '../../../helpers/selectionHelper';

@injectable()
export default class RefferenceTaggingTool extends Tools {
  title = 'Refference tagging tool';
  icon = 'italic';
  name = 'RefferenceTaggingTool';

  get run() {
    return (state, dispatch) => {
      console.log(state.config.schema.marks.refferenceTagging);
      toggleMark(state.config.schema.marks.refferenceTagging)(state, dispatch);
    };
  }


  // get run() {
  //   return (state, dispatch, color) => {
  //     console.log(state, color);
  //     const {
  //       selection: { $from, $to },
  //     } = state;
  //     const css = `background-color: red; color: white;`;

  //     dispatch(
  //       state.tr.addMark(
  //         $from.pos,
  //         $to.pos,
  //         state.schema.marks.refferenceTagging.create({ style: css }),
  //       ),
  //     );

  //     // dispatch(
  //     //   state.tr.removeMark(
  //     //     $from.pos,
  //     //     $to.pos,
  //     //     state.schema.marks.refferenceTagging,
  //     //   ),
  //     // )

  //     clearSelection();
  //   };
  // }


  select = state => {
    const {
      selection: { from },
    } = state;
    if (from === null) return false;
    return true;
  };


  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.refferenceTagging)(state);
    };
  }
}

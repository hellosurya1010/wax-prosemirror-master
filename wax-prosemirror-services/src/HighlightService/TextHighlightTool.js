import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';
import TextHighlightingTool from './components/TextHighlightingTool';
import { getNearestNodeOfSelectedText } from './helper';
import { toggleMark } from 'prosemirror-commands';
import DropDownComponent from './components/DropDownComponent';


@injectable()
class TextHighlightTool extends Tools {
  title = 'Text Highlighter';
  icon = 'highlight';
  name = 'TextHighlightTool';
  

  select = () => {
    //  return !activeView.state.selection.empty;
    return window.getSelection().toString().trim().length !== 0;
  };

  underlin

  get run() {
    return (state, dispatch, options) => {
      console.log(options);
      const {color, value} = options;

      // console.log(color, state.config.schema.marks, state.config.schema.marks[color]);
      // toggleMark(state.config.schema.marks[color])(state, dispatch);
      // return;

      const {
        selection: { $from, $to },
      } = state;
      
      let parentNodeNearSelection = getNearestNodeOfSelectedText(`.${value}`);

      parentNodeNearSelection !== null
        ? dispatch(
          state.tr.removeMark(
            $from.pos,
            $to.pos,
            state.schema.marks.highlight,
          ),
        )
        : dispatch(
          state.tr.addMark(
            $from.pos,
            $to.pos,
            state.schema.marks.highlight.create({ 'class': value, 'type': value }),
          ),
        );
    };
    // state.schema.marks.highlight.create({ 'class': color, 'data': 'data' }),
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
      
    console.log(this.toJSON());
    return this.isDisplayed() ? (
      <TextHighlightingTool item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default TextHighlightTool;

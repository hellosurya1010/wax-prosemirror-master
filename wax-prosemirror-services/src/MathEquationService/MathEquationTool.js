import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import SpecialCharactersTool from './components/SpecialCharactersTool';

@injectable()
export default class MathEquation extends Tools {
  title = 'Math Equation';
  icon = 'plusSquare';
  name = 'MathEquation';

  get enable() {
    return () => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this.isDisplayed() ? (
      <SpecialCharactersTool item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

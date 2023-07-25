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
      <SpecialCharactersTool
        item={this.toJSON()}
        displayed={this.isDisplayed()}
        config={this.config}
        key={uuidv4()}
        item2={this}
        pmplugins={this.pmplugins}
        view={view}
      />
    ) : null;
  }
}

import { getAttributesOfElement } from "../../../helpers/domHelper";

const highlightMark = props => {
  const { name, color } = props;
  return {
    attrs: {
      style: { default: "" },
      class: { default: name },
      type: { default: 'ref-element' },
      color: { default: color },
    },
    inclusive: false,
    parseDOM: [
      {
        tag: `span.${name}`,
        getAttrs(hook, next) {
          Object.assign(hook, {
            class: hook.dom.getAttribute('class'),
            style: hook.dom.getAttribute('style'),
          });
          next();
        },
      },
    ],
    toDOM(hook, next) {
      // eslint-disable-next-line no-param-reassign
      hook.value = ['span', hook.node.attrs, 0];
      next();
    },
  };
};

export default highlightMark;

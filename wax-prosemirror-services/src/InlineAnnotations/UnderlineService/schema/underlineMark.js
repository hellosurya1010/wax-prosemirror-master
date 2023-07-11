const underlineMark = {
  // content: 'text*',
  // group: 'inline',
  // group: 'inline*',
  inline: true,
  inclusive: false,
  parseDOM: [{ tag: 'span.underline' }],
  attrs: {
    class: { default: 'underline' }
  },
  toDOM: (hook, next) => {
    // eslint-disable-next-line no-param-reassign
    hook.value = ['span', hook.node.attrs, 0];
    next();
  },
};

export default underlineMark;

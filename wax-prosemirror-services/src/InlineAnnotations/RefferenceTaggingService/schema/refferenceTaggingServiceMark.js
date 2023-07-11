const refferenceTaggingServiceMark = {
  // parseDOM: [{ tag: 'i' }, { tag: 'span' },],
  attrs: {
    // style: { default: "background-color: red; color: white" },
    class: { default: 'reference' },
  },
  parseDOM: [
    {
      tag: 'span.reference',
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
  // toDOM(hook, next) {
  //   hook.value = ['span', 0];
  //   next();
  // },
};

export default refferenceTaggingServiceMark;

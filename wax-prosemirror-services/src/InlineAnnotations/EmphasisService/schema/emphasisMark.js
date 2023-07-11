const emphasisMark = {
  inline: true,
  parseDOM: [
    { tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' },
    {
      tag: 'span.italic',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook.dom.getAttribute('class'),
          style: hook.dom.getAttribute('style'),
        });
        next();
      },
    },
  ],
  attrs: {
    class: { default: 'italic' },
  },
  toDOM(hook, next) {
    console.log(hook.node.attrs);
    hook.value = ['span', hook.node.attrs, 0];
    // hook.value = ['span', hook.node.attrs, 0];
    next();
  },
};

export default emphasisMark;

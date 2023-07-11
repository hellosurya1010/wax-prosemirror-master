const strongMark = {
  parseDOM: [
    { tag: 'span.strong' },
    // This works around a Google Docs misbehavior where
    // pasted content will be inexplicably wrapped in `<b>`
    // tags with a font-weight normal.
    { tag: 'b', getAttrs: node => node.style.fontWeight !== 'normal' && null },
    {
      style: 'font-weight',
      getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
    },
  ],
  attrs: {
    class: { default: 'strong' },
  },
  toDOM(hook, next) {
    hook.value = ['span', hook.node.attrs, 0];
    next();
    // return ['span', 0];
  },
};

export default strongMark;

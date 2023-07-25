import { v4 as uuidv4 } from 'uuid';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

export default (view, fileUpload, placeholderPlugin, context) => ({src, mathMl}) => {
  const { state } = view;
  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const { tr } = state;
  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(placeholderPlugin, {
    add: { id, pos: tr.selection.from },
  });

  view.dispatch(tr);

  try {

    // let url = file;
    let extraData = {mathMl};
    // if (typeof file === 'object') {
    //   url = file.url;
    //   extraData = file.extraData;
    // }

    const pos = findPlaceholder(view.state, id, placeholderPlugin);
    // If the content around the placeholder has been deleted, drop
    // the image
    if (pos == null) {
      return;
    }
    // Otherwise, insert it at the placeholder's position, and remove
    // the placeholder
    context.pmViews.main.dispatch(
      context.pmViews.main.state.tr
        .replaceWith(
          pos,
          pos,
          context.pmViews.main.state.schema.nodes.image.create({
            src,
            id: uuidv4(),
            extraData,
          }),
        )
        .setMeta(placeholderPlugin, { remove: { id } }),
    );
  } catch (error) {
    view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
  }

};

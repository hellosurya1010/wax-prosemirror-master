/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import axios from 'axios';
import { backendApiUrl } from '../../../../../editor-config'
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../../editors/demo/src/store/userSlice';


const SaveButton = ({ view = {}, item }) => {

  const user = useSelector(userSelector);
    
  const { icon, label, select, title } = item;

  const {
    pmViews: { main },
    activeViewId,
    activeView,
    ...rest
  } = useContext(WaxContext);

  const { state } = view;

  const [isSaving, setIsSaving] = useState(false);

  const saveDocument = () => {
    const docContent = document.querySelector('.ProseMirror').innerHTML;
    const {token} = user;
    const data = {
      content: docContent,
      content_type: 'html',
      module: 'ref-bot',
    }
    return axios.post(`${backendApiUrl}/update-document-content/doc1`, data, { headers: { 'Authorization': `Bearer ${token}` } })
  }

  const handleMouseDown = () => {
    // view.props.onChange(state.doc.content);
    console.log(document.querySelector('.ProseMirror').innerHTML);
    setIsSaving(true);
    saveDocument().then((response) => {
      console.log(response);
      setIsSaving(false);
    })
      .catch((error) => {
        alert('Document not saved.')
        setIsSaving(false);
        console.error(error);
      });
  };

  const triggerSave = e => {
    if ((e.key === 83 || e.keyCode === 83) && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleMouseDown();
      return false;
    }
    return true;
  };

  useEffect(() => {
    document.addEventListener('keydown', triggerSave);

    return () => document.removeEventListener('keydown', triggerSave);
  }, []);

  let isDisabled = !select(state, activeViewId, activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const iconTodisplay = !isSaving ? icon : 'done';

  const SaveButtonComponent = useMemo(
    () => (
      <MenuButton
        active={false}
        disabled={isDisabled}
        iconName={iconTodisplay}
        label={label}
        onMouseDown={handleMouseDown}
        title={title}
      />
    ),
    [isSaving, isDisabled],
  );

  return SaveButtonComponent;
};

export default SaveButton;

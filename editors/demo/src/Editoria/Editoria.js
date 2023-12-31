import React, { useLayoutEffect, useState, useMemo, useRef, useEffect } from 'react';

import { Wax } from 'wax-prosemirror-core';

import { EditoriaLayout, EditoriaMobileLayout } from './layout';
import { config, configMobile } from './config';
import { demo } from './demo';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/userSlice';
import { backendApiUrl } from '../../../../editor-config';
import axios from 'axios';

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150);
  });
};



const Editoria = (props) => {
  const {initialContent} = props;
  const [width] = useWindowSize();

  const state = useSelector(userSelector);

  let layout = EditoriaLayout;
  let finalConfig = config;
  let key = 'editoria';

  if (width < 600) {
    layout = EditoriaMobileLayout;
    finalConfig = configMobile;
    key = 'editoriaMobile';
  }

  const user = {
    userId: state.user_id,
    userColor: {
      addition: 'royalblue',
      deletion: 'indianred',
    },
    username: state.user_name,
  };
  

  const editorRef = useRef();

  const EditoriaComponent = useMemo(
    () => {
      return (
        <>
          <Wax
            ref={editorRef}
            key={key}
            config={finalConfig}
            autoFocus
            placeholder="Type Something..."
            fileUpload={file => renderImage(file)}
            value={initialContent} 
            // readonly
            layout={layout}
            // onChange={debounce(source => {
            //   console.log(JSON.stringify(source));
            // }, 200)}
            user={user}
            scrollMargin={200}
            scrollThreshold={200}
          />
        </>
      )
    },
    [initialContent, layout, finalConfig, user],
  );

  return <>{EditoriaComponent}</>;
};

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default Editoria;

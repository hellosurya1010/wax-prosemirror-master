import React, { useMemo, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { grid, override } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  WaxContext,
  useOnClickOutside,
  MenuButton,
} from 'wax-prosemirror-core';

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
  width: max-content;

  ${override('Wax.HighlightToolWrapper')}
`;
const TextHighlightComponent = styled.div`
  background: white;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
`;
const Highlighter = styled.div`
  border: 1px solid gray;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  margin: 5px;
  min-width: 25px;
`;

const TextHighlightingTool = ({ view: { dispatch, state }, item }) => {
  const { icon, title, select } = item;
  const [isOpen, setIsOpen] = useState(false);

  let highlightDropDownOptions =[
    {
        "name": "doi",
        "value": "doi",
        "color": "#24b6ff"
    },
    {
        "name": "suffix",
        "value": "suffix",
        "color": "#932a2a"
    },
    {
        "name": "pages",
        "value": "pages",
        "color": "#d7a8d1"
    },
    {
        "name": "etal",
        "value": "etal",
        "color": "#4ccda6"
    },
    {
        "name": "editor",
        "value": "editor",
        "color": "#37b3d2"
    },
    {
        "name": "pubid",
        "value": "pubid",
        "color": "#c78ab6"
    },
    {
        "name": "author",
        "value": "author",
        "color": "#ffe01a"
    },
    {
        "name": "title",
        "value": "title",
        "color": "#337ab7"
    },
    {
        "name": "issn",
        "value": "issn",
        "color": "#7f6b66"
    },
    {
        "name": "year",
        "value": "year",
        "color": "#07ab7a"
    },
    {
        "name": "day",
        "value": "day",
        "color": "#8f679e"
    },
    {
        "name": "publisher-name",
        "value": "publisher-name",
        "color": "#00f074"
    },
    {
        "name": "collab",
        "value": "collab",
        "color": "#a08c27"
    },
    {
        "name": "publisher-loc",
        "value": "publisher-loc",
        "color": "#337ab7"
    },
    {
        "name": "issue",
        "value": "issue",
        "color": "#0da01e"
    },
    {
        "name": "volume",
        "value": "volume",
        "color": "#0be5c4"
    },
    {
        "name": "edition",
        "value": "edition",
        "color": "#a615f4"
    },
    {
        "name": "given",
        "value": "given",
        "color": "#735ace"
    },
    {
        "name": "firstname",
        "value": "firstname",
        "color": "#2ae5ad"
    },
    {
        "name": "surname",
        "value": "surname",
        "color": "#2fb41d"
    },
    {
        "name": "translator",
        "value": "translator",
        "color": "#98ec9d"
    },
    {
        "name": "source",
        "value": "source",
        "color": "#00d5ff"
    },
    {
        "name": "url",
        "value": "url",
        "color": "#11e8e5"
    },
    {
        "name": "x",
        "value": "x",
        "color": "#bab0b0"
    },
    {
        "name": "label",
        "value": "label",
        "color": "#f5cdb2"
    },
    {
        "name": "month",
        "value": "month",
        "color": "#55a5a0"
    },
    {
        "name": "person",
        "value": "person",
        "color": "#ffea00"
    },
    {
        "name": "date-in-citation",
        "value": "date-in-citation",
        "color": "#e89a11"
    },
    {
        "name": "prefix",
        "value": "prefix",
        "color": "#a4bcb6"
    },
    {
        "name": "isbn",
        "value": "isbn",
        "color": "#9d9390"
    }
];


  const ref = useRef();
  const {
    activeViewId,
    activeView,
    pmViews: { main },
  } = useContext(WaxContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  useOnClickOutside(ref, () => setIsOpen(false));

  const renderList = () => {
    const lists = [];

    Object.keys(highlightDropDownOptions).forEach(key => {
      const {name, value, color} = highlightDropDownOptions[key];
      lists.push(
        <Highlighter
          data-style={name}
          key={uuidv4()}
          onMouseDown={e =>
            handleMouseDown(e, highlightDropDownOptions[key])
          }
          style={{ backgroundColor: color, color: '#fff' }}
          title={name}
        >{name}</Highlighter>,
      );
    });
    return <div style={{display: 'flex', flexWrap: 'wrap', width: '500px'}}>{lists}</div>;
  };

  const handleMouseDown = (e, options) => {
    e.preventDefault();
    item.run(activeView.state, activeView.dispatch, options);
    // if (color !== 'transparent') localStorage.setItem('lastBgColor', color);
    setIsOpen(false);
  };

  const handleDblClk = () => {
    return;
    const color = localStorage.getItem('lastBgColor')
      ? localStorage.getItem('lastBgColor')
      : highlightDropDownOptions[0].value;

    item.run(state, dispatch, color);
  };

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const line = document.getElementById('trait');
  // if (line)
  //   line.style.fill =
  //     localStorage.getItem('lastBgColor') !== null
  //       ? localStorage.getItem('lastBgColor')
  //       : highlightDropDownOptions[0].name;

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper onDoubleClick={handleDblClk} ref={ref}>
        <div disabled={isDisabled}>
          <MenuButton
            active={isOpen}
            disabled={isDisabled}
            iconName={icon}
            onMouseDown={() => {
              setIsOpen(!isOpen);
            }}
            title={title}
          />
        </div>
        {isOpen && (
          <DropWrapper>
            <TextHighlightComponent
              close={() => {
                setIsOpen(false);
              }}
              item={item}
              key={uuidv4()}
              view={(dispatch, state)}
            >
              {renderList()}
            </TextHighlightComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, isDisabled],
  );

  return MenuButtonComponent;
};

export default TextHighlightingTool;

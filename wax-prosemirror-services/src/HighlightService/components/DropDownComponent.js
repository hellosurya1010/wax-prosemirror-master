/* eslint-disable no-underscore-dangle */
/* eslint react/prop-types: 0 */
import React, {
  useMemo,
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import styled from 'styled-components';
import { WaxContext, Icon, useOnClickOutside } from 'wax-prosemirror-core';

const Wrapper = styled.div`
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`;

const DropDownButton = styled.button`
  background: #fff;
  border: none;
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  position: relative;
  width: 215px;
  height: 100%;

  span {
    position: relative;
    top: 12px;
  }
`;

const DropDownMenu = styled.div`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
  margin: 2px auto auto;
  position: absolute;
  width: 220px;
  max-height: 150px;
  overflow-y: scroll;
  z-index: 2;

  span {
    cursor: pointer;
    padding: 8px 10px;
  }

  span:focus {
    background: #f2f9fc;
    outline: 2px solid #f2f9fc;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  width: 18px;
  margin-left: auto;
  position: relative;
  top: 10px;
`;

const DropDownComponent = ({ view,  item }) => {

  const dropDownOptions = [
    {
      "name": "doi",
      "value": "doi"
    },
    {
      "name": "suffix",
      "value": "suffix"
    },
    {
      "name": "pages",
      "value": "pages"
    },
    {
      "name": "etal",
      "value": "etal"
    },
    {
      "name": "editor",
      "value": "editor"
    },
    {
      "name": "pubid",
      "value": "pubid"
    },
    {
      "name": "author",
      "value": "author"
    },
    {
      "name": "title",
      "value": "title"
    },
    {
      "name": "issn",
      "value": "issn"
    },
    {
      "name": "year",
      "value": "year"
    },
    {
      "name": "day",
      "value": "day"
    },
    {
      "name": "publisher-name",
      "value": "publisher-name"
    },
    {
      "name": "collab",
      "value": "collab"
    },
    {
      "name": "publisher-loc",
      "value": "publisher-loc"
    },
    {
      "name": "issue",
      "value": "issue"
    },
    {
      "name": "volume",
      "value": "volume"
    },
    {
      "name": "edition",
      "value": "edition"
    },
    {
      "name": "given",
      "value": "given"
    },
    {
      "name": "firstname",
      "value": "firstname"
    },
    {
      "name": "surname",
      "value": "surname"
    },
    {
      "name": "translator",
      "value": "translator"
    },
    {
      "name": "source",
      "value": "source"
    },
    {
      "name": "url",
      "value": "url"
    },
    {
      "name": "x",
      "value": "x"
    },
    {
      "name": "label",
      "value": "label"
    },
    {
      "name": "month",
      "value": "month"
    },
    {
      "name": "person",
      "value": "person"
    },
    {
      "name": "date-in-citation",
      "value": "date-in-citation"
    },
    {
      "name": "prefix",
      "value": "prefix"
    },
    {
      "name": "isbn",
      "value": "isbn"
    }
  ];

  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;
  const { state } = view;

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  const [label, setLabel] = useState('Refference Type');
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  useEffect(() => {
    setLabel('Refference Type');
    dropDownOptions.forEach(option => {
      if (option.item.active(main.state)) {
        setLabel(option.label);
      }
    });
    console.log(activeViewId);
  }, [activeViewId]);

  let isDisabled = !tools[0].select(state, activeView);

  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  const openCloseMenu = () => {
    if (!isDisabled) setIsOpen(!isOpen);
    if (isOpen)
      setTimeout(() => {
        activeView.focus();
      });
  };

  if (!isEditable) isDisabled = true;

  const onKeyDown = (e, index) => {
    e.preventDefault();
    // arrow down
    if (e.keyCode === 40) {
      if (index === itemRefs.current.length - 1) {
        itemRefs.current[0].current.focus();
      } else {
        itemRefs.current[index + 1].current.focus();
      }
    }

    // arrow up
    if (e.keyCode === 38) {
      if (index === 0) {
        itemRefs.current[itemRefs.current.length - 1].current.focus();
      } else {
        itemRefs.current[index - 1].current.focus();
      }
    }

    // enter
    if (e.keyCode === 13) {
      itemRefs.current[index].current.click();
    }

    // ESC
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  const onChange = option => {
    tools[option.value].run(main, context);
    openCloseMenu();
  };

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-controls="questions-list"
          aria-expanded={isOpen}
          aria-haspopup
          disabled={isDisabled}
          onKeyDown={e => {
            if (e.keyCode === 40) {
              itemRefs.current[0].current.focus();
            }
            if (e.keyCode === 27) {
              setIsOpen(false);
            }
            if (e.keyCode === 13 || e.keyCode === 32) {
              setIsOpen(true);
            }
          }}
          onMouseDown={openCloseMenu}
          type="button"
        >
          <span>{label}</span> <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu
          aria-label="Choose a question type"
          id="questions-list"
          isOpen={isOpen}
          role="menu"
        >
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <span
                key={option.value}
                onClick={() => onChange(option)}
                onKeyDown={e => onKeyDown(e, index)}
                ref={itemRefs.current[index]}
                role="menuitem"
                tabIndex="-1"
              >
                {option.label}
              </span>
            );
          })}
        </DropDownMenu>
      </Wrapper>
    ),
    [isDisabled, isOpen, label],
  );

  return MultipleDropDown;
};

export default DropDownComponent;

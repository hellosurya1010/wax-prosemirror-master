import React, { useContext, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { grid, override } from '@pubsweet/ui-toolkit';
import {
  WaxContext,
  useOnClickOutside,
  MenuButton,
} from 'wax-prosemirror-core';
import SpecialCharactersComponent from './SpecialCharactersComponent';
import fileUpload from '../image/fileUpload';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;

  ${override('Wax.SpecialCharacterToolWrapper')}
`;

const SpecialCharactersTool = ({ item, view, config, pmplugins }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const { icon, title } = item;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const upload = fileUpload(
    view,
    config.get('fileUpload'),
    pmplugins.get('imagePlaceHolder'),
    context,
  );

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>

        <MenuButton
          active={isOpen}
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper>
            <SpecialCharactersComponent
              fileUpload={upload}
              view={view}
              close={() => {
                setIsOpen(false);
              }}
            />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, isDisabled],
  );

  return MemorizedDropdown;
};

export default SpecialCharactersTool;

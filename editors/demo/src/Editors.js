import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import Editoria from './Editoria/Editoria';
import HHMI from './HHMI/HHMI';
import NCBI from './NCBI/NCBI';
import OEN from './OEN/OEN';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: hidden;
    padding: 0;
  }

  #root {
    height:100vh;
    width:100vw;
  }
`;

const activeStyles = css`
  background: #535e76;
  color: #fff;
  padding: 8px 15px 8px 15px;
`;

const ProjectContainer = styled.div`
  display: flex;
  height: calc(100% - 65px);
`;

const ChooseProject = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;

  span {
    margin-right: 20px;
  }
`;

const Projects = styled.div`
  margin-left: 10px;

  span {
    font-size: 16px;
  }
`;

const ProjectButton = styled.button`
  border: 1px solid #535e76;
  cursor: pointer;
  color: #535e76;
  margin-right: 20px;
  background: #fff;
  padding: 8px 15px 8px 15px;
  ${props => props.isActive && activeStyles}
`;

const Editors = () => {
  const [project, setProject] = useState('editoria');

  const initialState = {
    editorInfo: {
      'documentId': 'adsfsdfa',
      "userId": "10",
    },
  };
  const [editorInfo, setEditorInfo] = useState(initialState);

  const displayProject = () => {
    switch (project) {
      case 'editoria':
        return <Editoria />;
      case 'ncbi':
        return <NCBI />;
      case 'oen':
        return <OEN />;
      default:
        return <HHMI />;
    }
  };

  return (
    <>
      <GlobalStyle />
      {/* <ChooseProject>
        <Projects>
          <span>Select Project:</span>
          <ProjectButton
            isActive={project === 'hhmi'}
            onClick={() => setProject('hhmi')}
          >
            Widget Example
          </ProjectButton>
          <ProjectButton
            isActive={project === 'editoria'}
            onClick={() => setProject('editoria')}
          >
            Ketida
          </ProjectButton>
          <ProjectButton
            isActive={project === 'oen'}
            onClick={() => setProject('oen')}
          >
            OEN
          </ProjectButton>
          <ProjectButton
            isActive={project === 'ncbi'}
            onClick={() => setProject('ncbi')}
          >
            Basic Editors
          </ProjectButton>
        </Projects>
      </ChooseProject> */}
      <ProjectContainer>{displayProject()}</ProjectContainer>
    </>
  );
};

export default Editors;

// @ts-nocheck
import React from 'react';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Section,
} from '../../components/StyledComponents';
import Loader from '../../components/Loader';
import Web3Context from '../../contexts/web3context';
import EnvContext from '../../contexts/envContext';

const ChatTest = () => {
  const { library, account, chainId } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [isLoading, setLoading] = useState(false);

  const NavMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-self: flex-start;
    justify-content: center;
    flex-direction: column;
    @media only screen and (max-width: 900px) {
      flex-direction: column;
    }
  `;

  const StyledApp = styled.div`
  font-family: 'Source Sans Pro', Arial, sans-serif;

  & .homeLink {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    &: hover {
      text-decoration: underline;
    }
  }

  & h1 {
    text-align: center;
    text-transform: uppercase;
    margin: 20px 0px;
    padding: 0px;
    letter-spacing: 0.1em;
    font-family: 'Source Sans Pro', Helvetica, sans-serif;
    font-weight: 200;
    font-size: 2rem;
    line-height: 1.25em;
  }

  .nav-button {
    align-items: center;
    background-image: linear-gradient(132deg, #574762, #4a36c4 50%, #ee5555);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #ffffff;
    display: flex;
    font-family: Phantomsans, sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 19px 24px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;

  }

  .nav-button:hover {
    opacity: 0.8;
  }

  .nav-button:active,
  .nav-button:hover {
    outline: 0;
  }
`;

  return (
    <StyledApp>
      <h2 className='text-lime-400 text-center'>Chat page</h2>

      <Loader show={isLoading} />

      <Section>
        <NavMenu>
          <Link to="/get" className="nav-button">
            Get the user
          </Link>
          <Link to="/create" className="nav-button">
            CREATE the user
          </Link>
          <Link to="/send" className="nav-button">
            CHAT.SEND
          </Link>
          <Link to="/approve" className="nav-button">
            CHAT.APPROVE
          </Link>
          <Link to="/chats" className="nav-button">
            CHAT.CHATS
          </Link>
          <Link to="/history" className="nav-button">
            Get all the group Messages
          </Link>
        </NavMenu>
      </Section>
    </StyledApp>
  );
};

export default ChatTest;

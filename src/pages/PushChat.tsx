// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, Routes, Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import ConnectButton from '../components/Connect';
import { Checkbox } from '../components/Checkbox';
import Dropdown from '../components/Dropdown';
import Web3Context from "../contexts/web3context";
import EnvContext from '../contexts/envContext'; 
// import { ReactComponent as PushLogo } from '../data/pushLogo.svg';
import ChatTest from '../components/Chat/ChatTest';
import CreateUserTest from '../components/Chat/CreateUser';
import SendMessageTest from '../components/Chat/SendMessage';
import ApproveRequestTest from '../components/Chat/ApproveRequest';
import GetChats from "../components/Chat/GetChats";
import GetUser from '../components/Chat/GetUser';
// import ConversationHashTest from './ChatTest/ConversationHash';
// import HistoryTest from './ChatTest/History';
// import GetRequestsTest from './ChatTest/GetRequests';

interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}

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

const NavMenu = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const checkForWeb3Data = ({
  library,
  active,
  account,
  chainId,
}: Web3ReactState) => {
  return library && active && account && chainId;
};

export function PushChat() {
  const web3Data: Web3ReactState = useWeb3React();

  const [env, setEnv] = useState('staging');
  const [isCAIP, setIsCAIP] = useState(false);



  const onChangeEnv = (e: any) => {
    setEnv(e.target.value);
  };

  const onChangeCAIP = () => {
    setIsCAIP(!isCAIP);
  };

  return (
    <StyledApp>
      <Link className="homeLink" to="/">
        {/* <PushLogo style={{ marginRight: 12 }} /> */}
        <h1 className="text-sky-400">Get Notified via Push </h1>
      </Link>

      <ConnectButton />

      <Dropdown
        className="text-sky-400"
        label="ENV"
        options={[
          { label: 'prod', value: 'prod' },
          { label: 'staging', value: 'staging' },
        ]}
        value={env}
        onChange={onChangeEnv}
      />

      <div style={{ marginTop: 10 }}>
        <Checkbox
          id="isCAIP"
          label="Convert to CAIP"
          value={isCAIP}
          onChange={onChangeCAIP}
        />
      </div>

      <hr />
      <EnvContext.Provider value={{ env, isCAIP }}>
        {checkForWeb3Data(web3Data) ? (
          <Web3Context.Provider value={web3Data}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <NavMenu className="my-8">
                      <Link to="/chat" className="nav-button">
                        CHAT
                      </Link>
                    </NavMenu>
                  }
                />
              </Routes>
          </Web3Context.Provider>
        ) : null}
      </EnvContext.Provider>
    </StyledApp>
  );
}

export default PushChat;

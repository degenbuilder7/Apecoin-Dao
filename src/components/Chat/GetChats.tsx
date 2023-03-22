// @ts-nocheck
import React from 'react';
import { useState, useContext } from 'react';
import {
  Section,
  SectionItem,
  CodeFormatter,
  SectionButton,
} from '../../components/StyledComponents';
import Loader from '../../components/Loader';
import Web3Context from '../../contexts/web3context';
import EnvContext from '../../contexts/envContext';
import * as PushAPI from '@pushprotocol/restapi';
import { walletToPCAIP10 } from '../../helpers';
import ChatTest from './ChatTest';

const GetChatsTest = () => {
  const { account } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [isLoading, setLoading] = useState(false);
  const [getChatsResponse, setGetChatsResponse] = useState<any>('');

  const testGetChats = async () => {
    try {
      setLoading(true);
      const user = await PushAPI.user.get({ account: account, env });
      let pvtkey = null;
      if (user?.encryptedPrivateKey) {
        pvtkey = await PushAPI.chat.decryptWithWalletRPCMethod(
          user.encryptedPrivateKey,
          account
        );
      }
      const response = await PushAPI.chat.chats({
        account: isCAIP ? walletToPCAIP10(account) : account,
        pgpPrivateKey: pvtkey,
        env,
      });
      console.log(response,account,"here");

      setGetChatsResponse(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ChatTest />
      <h2>Get Chats Test page</h2>

      <Loader show={isLoading} />

      <Section>
        <SectionItem>
          <div>
            <SectionButton onClick={testGetChats}>get chats</SectionButton>
          </div>
        </SectionItem>

        <SectionItem>
          <div>
            {getChatsResponse ? (
              <CodeFormatter>
                {JSON.stringify(getChatsResponse, null, 4)}
              </CodeFormatter>
            ) : null}
          </div>
        </SectionItem>
      </Section>
    </div>
  );
};

export default GetChatsTest;

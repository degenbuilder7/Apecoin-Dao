// @ts-nocheck
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
import Chat from './Chat';
import React from 'react';

const SendMessage = () => {
  const { account } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [isLoading, setLoading] = useState(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('f1a971448b94f664db31bb94e0ac0df97e56a803c88d08b7a1ecb84f6e491237');
  const [apiKey, setApiKey] = useState<string>('');

  const [sendResponse, setSendResponse] = useState<any>('');

  const updateMessageContent = (e: React.SyntheticEvent<HTMLElement>) => {
    setMessageContent((e.target as HTMLInputElement).value);
  };

  const updateReceiverAddress = (e: React.SyntheticEvent<HTMLElement>) => {
    setReceiverAddress((e.target as HTMLInputElement).value);
  };

  const updateApiKey = (e: React.SyntheticEvent<HTMLElement>) => {
    setApiKey((e.target as HTMLInputElement).value);
  };

  const testSendMessage = async () => {
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
      const response = await PushAPI.chat.send({
        messageContent,
        messageType: 'Text',
        receiverAddress,
        account: isCAIP ? walletToPCAIP10(account) : account,
        pgpPrivateKey: pvtkey,
        apiKey,
        env,
      });

      setSendResponse(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Chat />
      <h2 className='text-sky-600'>Send Message to Group page</h2>

      <Loader show={isLoading} />

      <Section>
        <SectionItem>
          <div>
            <SectionItem>
              <label>Message Content</label>
              <input
                type="text"
                onChange={updateMessageContent}
                value={messageContent}
                style={{ width: 400, height: 30, border: '1px solid black', borderRadius: '10px' }}
              />
            </SectionItem>
            <SectionItem style={{ marginTop: 20 }}>
              <label>Receiver's Address</label>
              <input
                type="text"
                onChange={updateReceiverAddress}
                value={receiverAddress}
                style={{ width: 400, height: 30, border: '1px solid black',borderRadius: '10px' }}
              />
            </SectionItem>
            <SectionItem style={{ marginTop: 20 }}>
              <label>Api Key</label>
              <input
                type="text"
                onChange={updateApiKey}
                value={apiKey}
                style={{ width: 400, height: 30 , border: '1px solid black', borderRadius: '10px'}}
              />
            </SectionItem>
            <SectionItem style={{ marginTop: 20 }}>
              <SectionButton onClick={testSendMessage}>
                send message
              </SectionButton>
            </SectionItem>
          </div>
        </SectionItem>

        <SectionItem>
          <div>
            {sendResponse ? (
              <CodeFormatter>
                {JSON.stringify(sendResponse, null, 4)}
              </CodeFormatter>
            ) : null}
          </div>
        </SectionItem>
      </Section>
    </div>
  );
};

export default SendMessage;

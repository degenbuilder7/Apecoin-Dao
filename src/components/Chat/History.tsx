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
// import { walletToPCAIP10 } from '../..data/helpers';
import Chat from './Chat';
import React from 'react';

const History = () => {
  const { env } = useContext<any>(EnvContext);
  const { account } = useContext<any>(Web3Context);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>({});
  const [threadhash, setThreadhash] = useState<string>('bafyreice2omf4xfv5yiwmxhpag3fxot7x5l25svpntqqq4w3jn66ayvtte');
  const [limit, setLimit] = useState<number>(10);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };


  const updateFetchLimit = (e: React.SyntheticEvent<HTMLElement>) => {
    setLimit(
      parseInt((e.target as HTMLInputElement).value)
    );
  };

  const testHistory = async () => {
    try {
      setLoading(true);

      // object for response
      const user = await PushAPI.user.get({ account: account, env });
      let pvtkey = null;
      if (user?.encryptedPrivateKey) {
        pvtkey = await PushAPI.chat.decryptWithWalletRPCMethod(
          user.encryptedPrivateKey,
          account
        );
      }
      const response = await PushAPI.chat.history({
        threadhash,
        account,
        pgpPrivateKey:pvtkey,
        limit,
        env,
      });

      setResponse(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Chat />
      <h2>History Test page</h2>

      <Loader show={isLoading} />

      <Section>
      <SectionItem>
          <label>Fetch How many msg ?</label>
          <input type="number" onChange={updateFetchLimit} value={limit} style={{ width: 400, height: 30 }} />
          <SectionButton onClick={testHistory}>get Group Messages</SectionButton>
        </SectionItem>

        <SectionItem>
        <div>
            {response ? (
                <div className="flex justify-between">
                <div className="w-2/3 pr-4">
                  <div className="h-screen overflow-y-scroll">
                    {Object.entries(response).map(([key, value]) => (
                      <div
                        key={key}
                        onClick={() => handleSelectMessage(value)}
                        className="border rounded-lg cursor-pointer p-4 mb-4 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex justify-between mb-2">
                          <strong>From {JSON.stringify(value.fromDID, null, 4)}</strong>
                          <p className="text-right text-gray-500 text-sm">{new Date(value.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="truncate">{JSON.stringify(value.messageContent, null, 4)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-1/3">
                  {selectedMessage && (
                    <div className="border rounded-lg p-4">
                      <button
                        className="absolute right-0 top-0 mr-2 mt-2 px-2 py-1 rounded-full text-white bg-gray-500 hover:bg-gray-600"
                        onClick={() => setSelectedMessage(null)}
                      >
                        Close
                      </button>
                      <h2 className="mb-2">{JSON.stringify(selectedMessage.messageContent.title)}</h2>
                      <div className="text-pink-600">{JSON.stringify(selectedMessage.messageContent.content, null, 4)}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
        </div>
        </SectionItem>
      </Section>
    </div>
  );
};

export default History;

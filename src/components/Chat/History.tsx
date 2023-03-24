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
import ChatTest from './ChatTest';
import React from 'react';

const History = () => {
  const { env } = useContext<any>(EnvContext);
  const { account } = useContext<any>(Web3Context);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>({});
  const [threadhash, setThreadhash] = useState<string>('bafyreihzbtwys4z6ayebh34eu4qvkz5rhhnry4rwoito623bkur6lsmxvy');
  const [limit, setLimit] = useState<number>(10);


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
      <ChatTest />
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
                <CodeFormatter>
                {Object.entries(response).map(([key, value]) => (
                    <div key={key}>
                    <strong>From {JSON.stringify(value.fromDID, null, 4)}</strong>
                    <br />
                    {JSON.stringify(value.messageContent, null, 4)}
                    <br />
                    <p>AT: {new Date(value.timestamp).toLocaleString()}</p>
                    </div>
                ))}
                </CodeFormatter>
            ) : null}
        </div>
        </SectionItem>
      </Section>
    </div>
  );
};

export default History;

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

const CreateUser = () => {
  const { account } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [isLoading, setLoading] = useState(false);
  const [connectedUser, setConnectedUser] = useState<any>({});


  const testCreateUser = async () => {
    try {
      setLoading(true);

      // object for connected user data
      const response = await PushAPI.user.create({
        account: isCAIP ? walletToPCAIP10(account) : account,
        env
      });
      
      setConnectedUser(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Chat />
      <h2>Create User page</h2>

      <Loader show={isLoading} />

      <Section>
        <SectionItem>
          <SectionButton onClick={testCreateUser}>
            create user
          </SectionButton>
        </SectionItem>

        <SectionItem>
          <div>
            {connectedUser ? (
              <CodeFormatter>
                {JSON.stringify(connectedUser, null, 4)}
              </CodeFormatter>
            ) : null}
          </div>
        </SectionItem>
      </Section>
    </div>
  );
};

export default CreateUser;

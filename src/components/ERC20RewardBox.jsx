/* eslint-disable */
import {
    ThirdwebNftMedia,
    useMetadata,
    useContract,
  } from "@thirdweb-dev/react";
  import React from "react";
  
  export default function ERC20RewardBox(reward) {
    const { contract: token } = useContract(reward.contractAddress);
    const { data } = useMetadata(token);
  
    return (
      <div >
        {data && (
          <>
            {/* @ts-ignore */}
            <ThirdwebNftMedia metadata={data}  />
            <h3>{data?.name}</h3>
            <p>Amount: {reward.quantityPerReward}</p>
          </>
        )}
      </div>
    );
  }
  
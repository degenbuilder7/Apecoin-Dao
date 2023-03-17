/* eslint-disable */
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import React from "react";


export default function ERC115RewardBox(reward) {
  const { contract: edition } = useContract(reward.contractAddress);
  const { data } = useNFT(edition, reward.tokenId);

  return (
    <div >
      {data && (
        <>
          <ThirdwebNftMedia
            metadata={data?.metadata}
            className={nftMedia}
          />
          <h3>{data?.metadata.name}</h3>
        </>
      )}
    </div>
  );
}
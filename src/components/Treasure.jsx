/* eslint-disable */
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { useState } from "react";
import ERC1155RewardBox from "../components/ERC1155RewardBox";
import ERC20RewardBox from "../components/ERC20RewardBox";
// import styles from "../styles/Home.module.css";

const Treasure = () => {
  const address = useAddress();

  const { contract: pack } = useContract(
    "0x697786E18F370b04e96497113016a2c8c85B17F4",
    "pack"
  );

  // @ts-ignore
  const { data: nfts, isLoading } = useOwnedNFTs(pack, address);

  const [openedPackRewards, setOpenedPackRewards] = useState('');

  return (
    <div>
      <div className={styles.container} style={{ marginTop: 0 }}>
        <div className={styles.collectionContainer}>
          {!isLoading ? (
            <div className={styles.nftBoxGrid}>
              {nfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    // @ts-ignore
                    metadata={{
                      ...nft.metadata,
                      image: `${nft.metadata.image}`,
                    }}
                    className={styles.nftMedia}
                  />
                  <h3>{nft.metadata.name}</h3>

                  <Web3Button
                    contractAddress="0x697786E18F370b04e96497113016a2c8c85B17F4"
                    action={async () => {
                      const openedRewards = await pack?.open(0, 1);
                      console.log("Opened rewards:", openedRewards);
                      setOpenedPackRewards(openedRewards);
                    }}
                  >
                    Open
                  </Web3Button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <hr className={styles.divider} />

      <h2>Opened Rewards</h2>

      <div className={styles.centered}>
        {openedPackRewards &&
          openedPackRewards?.erc20Rewards &&
          openedPackRewards?.erc20Rewards?.length > 0 && (
            <>
              <h3>ERC-20 Tokens</h3>
              <div className={styles.nftBoxGrid}>
                {openedPackRewards?.erc20Rewards?.map((reward, i) => (
                  <ERC20RewardBox reward={reward} key={i} />
                ))}
              </div>
            </>
          )}

        {openedPackRewards &&
          openedPackRewards?.erc1155Rewards &&
          openedPackRewards?.erc1155Rewards?.length > 0 && (
            <>
              <h3>ERC-1155 Tokens</h3>
              <div className={styles.nftBoxGrid}>
                {openedPackRewards?.erc1155Rewards.map((reward, i) => (
                  <ERC1155RewardBox reward={reward} key={i} />
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Treasure;

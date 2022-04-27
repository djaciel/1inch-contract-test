import { ethers, network } from 'hardhat';

const richAddress = '0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503';

const main = async () => {
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [richAddress],
  });

  const richSigner = await ethers.getSigner(richAddress);

  console.log('balance eth richAddress', ethers.utils.formatEther(await richSigner.getBalance()));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

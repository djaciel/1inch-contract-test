import { ethers, network } from 'hardhat';
import Web3 from 'web3';
import axios from 'axios';
import yesno from 'yesno';

const richAddress = '';

const chainId = 56;
const web3RpcUrl = 'http://localhost:8545';
const walletAddress = ''; // Set your wallet address

const broadcastApiUrl = 'https://tx-gateway.1inch.io/v1.1/' + chainId + '/broadcast';
const apiBaseUrl = 'https://api.1inch.io/v4.0/' + chainId;
const web3 = new Web3(web3RpcUrl);

const main = async () => {
  // await network.provider.request({
  //   method: 'hardhat_impersonateAccount',
  //   params: [richAddress],
  // });

  // const richSigner = await ethers.getSigner(richAddress);

  // console.log('balance eth richAddress', ethers.utils.formatEther(await richSigner.getBalance()));

  const swapParams = {
    fromTokenAddress: '0x111111111117dc0aa78b770fa6a738034120c302', // 1INCH
    toTokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
    amount: '100000000000000000',
    fromAddress: walletAddress,
    slippage: 1,
    disableEstimate: false,
    allowPartialFill: false,
  };

  const url = apiRequestUrl('/approve/allowance', { tokenAddress: swapParams.fromTokenAddress, walletAddress });
  console.log('url', url)

  const { data } = await axios.get(url);

  console.log('data', data)
};

function apiRequestUrl(methodName: string, queryParams: any) {
  return apiBaseUrl + methodName + '?' + new URLSearchParams(queryParams).toString();
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

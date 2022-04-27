import { HardhatUserConfig } from "hardhat/config";

import * as dotenv from "dotenv";
dotenv.config();

const alchemyUrl = process.env.ALCHEMY_URL || "";
const infuraApiKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.HDWALLET_MNEMONIC;
const forkEnabled = process.env.FORK_ENABLED || false;

const networks: HardhatUserConfig["networks"] = {
  localhost: {
    chainId: 1,
    url: "http://127.0.0.1:8545",
    allowUnlimitedContractSize: true,
  },
};

if (forkEnabled) {
  networks.hardhat = {
    chainId: 1,
    forking: {
      url: alchemyUrl,
    },
    accounts: {
      mnemonic,
    },
  };
} else {
  networks.hardhat = {
    allowUnlimitedContractSize: true,
  };
}

if (mnemonic) {
  networks.xdai = {
    chainId: 100,
    url: "https://rpc.xdaichain.com/",
    accounts: {
      mnemonic,
    },
  };
  networks.poaSokol = {
    chainId: 77,
    url: "https://sokol.poa.network",
    accounts: {
      mnemonic,
    },
  };
  networks.matic = {
    chainId: 137,
    url: "https://rpc-mainnet.maticvigil.com",
    accounts: {
      mnemonic,
    },
  };
  networks.mumbai = {
    chainId: 80001,
    url: "https://rpc-mumbai.matic.today",
    accounts: {
      mnemonic,
    },
    loggingEnabled: true,
  };
}

if (infuraApiKey && mnemonic) {
  networks.kovan = {
    url: `https://kovan.infura.io/v3/${infuraApiKey}`,
    accounts: {
      mnemonic,
    },
  };

  networks.ropsten = {
    url: `https://ropsten.infura.io/v3/${infuraApiKey}`,
    accounts: {
      mnemonic,
    },
  };

  networks.rinkeby = {
    url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
    accounts: {
      mnemonic,
    },
  };

  networks.mainnet = {
    url: alchemyUrl,
    accounts: {
      mnemonic,
    },
  };
} else {
  console.warn("No infura or hdwallet available for testnets");
}

export default networks;

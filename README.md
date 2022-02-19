## Blockchain Supply Chain

`npm install`
`truffle compile`

## Develop

Launch Ganache:

```
ganache -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Open another terminal and compile smart contracts, This will create the smart contract artifacts in folder `build\contracts`.

```
truffle compile
```

Truffle migrations enable us to “push” the smart contracts to the Ethereum blockchain (either local, tesnet or mainnet) and to set up necessary steps for linking contracts with other contracts as well as populate contracts with initial data.

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
- [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
  to make the web faster, safer, and more open.
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

## Versions

This code was created with the following versions of tools:

- Truffle v5.4.26 (core: 5.4.26)
- Solidity - 0.5.16 (solc-js)
- Node v14.15.4
- Web3.js v1.5.3

## Addresses Deployed on Rinkeby

- Contract: 0x6353e1f4861A3A355fdD982F9bC2097607A16206
- Trx: 0x4644ce8583ee2d36cba6ec1632de79ed64d73a364a8ce02417da8c3b51a45048

## Methods Added

- refund
- verifyItem
- transfering cost from farm -> distributor -> retailer -> consumer

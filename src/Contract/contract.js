import Web3 from 'web3';

import nftAbi from './nft.json';
import gameAbi from './game.json';

const nftAddr = '0x3c1Ce281A77506b56c9Ba0a7C66DdDA831f5A7FB';
const gameAddr = '0x83c9c75A07EF9667037fDb6E4721353f7d222CcE';

var web3 = new Web3(window.ethereum);

const nftContract = new web3.eth.Contract(nftAbi, nftAddr);
const gameContract = new web3.eth.Contract(gameAbi, gameAddr);

export { nftContract, gameContract }
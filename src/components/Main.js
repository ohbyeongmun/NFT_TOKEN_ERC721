import React, {useState} from 'react'
import { nftContract, gameContract } from '../Contract/contract'

const Main = () => {
    // gameContract.methods.safeTransferFrom("0x264A0eeD2cA3C607FbaDC093C11906DE356E12C0", "0xAef22A6af750670ab02b1Aaaa4BCAc6266424DDb", 0, 500, "0x0")
    // .send({from:"0x264A0eeD2cA3C607FbaDC093C11906DE356E12C0"})

    const [owner, setOwner] = useState();
    const [info, setInfo] = useState({
        name: '',
        level: '',
    })
    const [addr, setAddr] = useState();
    const [Quantity, setQuantity] = useState();

    console.log(nftContract.methods);
    console.log(gameContract.methods);

    const ownerSearch = () => {
        nftContract.methods.owner().call().then(account => {
            setOwner(account);
        });
    }

    const createNft = () => {
        let charactor = document.getElementById('charactor').value;
        let addr = document.getElementById('addr').value;
        nftContract.methods.mint(charactor, addr).send({from:addr});
    }

    const nftSearch = () => {
        let value = document.getElementById('nft').value;
        nftContract.methods.charactors(value).call().then(result => {
            let nName = result[0];
            let nLevel = result[1];
            setInfo({
                name: nName,
                level: nLevel
            })
        });
    }

    const transfer = () => {
        let send = document.getElementById('send').value;
        let receive = document.getElementById('receive').value;
        let tokenId = document.getElementById('tokenId').value;
        nftContract.methods.transferFrom(send, receive, tokenId).send({from:send});
    }

    const SearchOwner = () => {
        let value = document.getElementById('value').value;
        nftContract.methods.ownerOf(value).call().then(account => {
            setAddr(account);
        });
    }

    const holdingItem = () => {
        let add = document.getElementById('add').value;
        nftContract.methods.balanceOf(add).call().then(result => {
            setQuantity(result);
        })
    }

    return (
        <div>
            <div>
                <p>nft ?????? owner : {owner}</p>
                <button onClick={ownerSearch}>ower ??????</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>nft ?????? ??????</p>
                <input placeholder="???????????? ??????" id="charactor"></input>
                <input placeholder="????????????" id="addr"></input>
                <button onClick={createNft}>?????? ??????</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>?????? ??????</p>
                <input placeholder="????????????" id="nft"></input>
                <p>name : {info.name}&nbsp; level : {info.level}</p>
                <button onClick={nftSearch}>nft??????</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>????????? ??????</p>
                <input placeholder="????????? ??????" id="send"></input><br/>
                <input placeholder="?????? ??????" id="receive"></input><br/>
                <input placeholder="token id" id="tokenId"></input><br/>
                <button onClick={transfer}>????????? ????????????</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>?????? ????????? ??????</p>
                <input placeholder="?????? ????????? ??????" id="value"></input>
                <p>{addr}</p>
                <button onClick={SearchOwner}>????????? ??????</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>?????? ?????? ?????? ??????</p>
                <input placeholder="????????????" id="add"></input><br/>
                <p>{Quantity}</p>
                <button onClick={holdingItem}>??????</button>
            </div>
        </div>
    )
}

export default Main

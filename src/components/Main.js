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
                <p>nft 토큰 owner : {owner}</p>
                <button onClick={ownerSearch}>ower 조회</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>nft 품목 생성</p>
                <input placeholder="캐릭터명 입력" id="charactor"></input>
                <input placeholder="주소입력" id="addr"></input>
                <button onClick={createNft}>품목 생성</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>품목 조회</p>
                <input placeholder="번호입력" id="nft"></input>
                <p>name : {info.name}&nbsp; level : {info.level}</p>
                <button onClick={nftSearch}>nft조회</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>소유권 이전</p>
                <input placeholder="보내는 주소" id="send"></input><br/>
                <input placeholder="받는 주소" id="receive"></input><br/>
                <input placeholder="token id" id="tokenId"></input><br/>
                <button onClick={transfer}>소유권 이전하기</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>품목 소유자 조회</p>
                <input placeholder="토큰 아이디 입력" id="value"></input>
                <p>{addr}</p>
                <button onClick={SearchOwner}>소유자 조회</button>
                <p>------------------------------------------</p>
            </div>
            <div>
                <p>보유 품목 수량 조회</p>
                <input placeholder="주소입력" id="add"></input><br/>
                <p>{Quantity}</p>
                <button onClick={holdingItem}>조회</button>
            </div>
        </div>
    )
}

export default Main

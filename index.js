const ContractHandler = require('./contractHandler');
const web3 = require('./web3')

const SOLIDITY = 'token.sol'
const COMPILED = 'token.json'
//has to be the name of the contract in .sol file
const CONTRACT = ':EIP20'


async function test(){
    
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    const owner = accounts[0]
    const reciever = accounts[1]

    await ContractHandler.compileFromSource(SOLIDITY,CONTRACT,COMPILED)

    let contract = await ContractHandler.getContract(COMPILED)

    let result = await contract.methods
    console.log(result)

}


test().then((res) => {
    console.log('End Test');
})
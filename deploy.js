const ContractHandler = require('./contractHandler');
const web3 = require('./web3')
const fs = require('fs');

const SOLIDITY = 'token.sol'
const COMPILED = 'token.json'
//has to be the name of the contract in .sol file
const CONTRACT = ':EIP20'


async function deploy(){

    const constructorArgs = [200,'testToken',2,'TT']

    //contract setup
    await ContractHandler.compileFromSource(SOLIDITY,CONTRACT,COMPILED)
    let contract = await ContractHandler.deployContract(COMPILED,constructorArgs)
    fs.writeFileSync('./address', contract.options.address)
    return contract.options.address
}

deploy().then((res) => {
    console.log('Contract Deployed @');
    console.log(res);
}).catch((err) => {
    console.log('Deployment Failed \n')
    console.log(err)
})
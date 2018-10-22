const ContractHandler = require('./contractHandler');
const web3 = require('./web3')

async function test(){
    //get accounts to use
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    const owner = accounts[0]
    const reciever = accounts[1]

    //grab deployed contract
    let address = String(fs.readFileSync('./address'))
    let contract = await ContractHandler.getContractAt(COMPILED,address)

    // Add web3 calls here 

    let result = await contract.methods
    console.log(result)

}


test().then((res) => {
    console.log('End Test');
})
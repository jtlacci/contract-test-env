const web3 = require('./web3');
const fs = require('fs');
const solc = require('solc');


const tokenHandler = () => {

    //read contract data from .sol file and save to .json
    //@arg contractFile .sol string
    //@arg contractName contract name in sol file as a string with a ':' at begining
    //@arg compiledFileName .json name string 
    function compileFromSource(contractFile,contractName,compiledFileName){
        try{
            let source = fs.readFileSync('./contracts/' + contractFile,'utf8')
            let compiled = solc.compile(source,'1')
            if(compiled.errors){
                throw compiled.errors
            }

            fs.writeFileSync('./build/' + compiledFileName,JSON.stringify(compiled.contracts[contractName]))

            return true
        }catch(e){
            
            console.log('Failed to compile from source');  
            console.log(e)
        }
    } 

    //returns a Contract Object with api instantiated
    function getContract(compiledFileName){
        try{    
            let source = JSON.parse(fs.readFileSync('./build/' + compiledFileName))

            //if using a .json built by Truffle 
            //let abi = source.abi

            //if using a .json built by Solc
            let abi = JSON.parse(source.interface)     

            return new web3.eth.Contract(abi)
        }catch(e){
            console.log(e)
            console.log('Failed to instantiate compiled contract');
            
        }
    }

    //returns a Contract Object with api instantiated && address
    function getContractAt(compiledFile,contractAddress){
        try{    
            let contractInstance = getContract(compiledFile)
            //update contract's address
            contractInstance.options.address = contractAddress
            return contractInstance
        }catch(e){
            console.log('Failed to instantiate compiled contract at address');
            
        }
    }

    //move to or create a facade in campaignhandlers
    async function deployContract(compiledFileName, argsArray){
        
        try{   
            const accounts = await web3.eth.getAccounts()        
            let source = JSON.parse(fs.readFileSync('./build/' + compiledFileName))
            let data = source.bytecode
            //promisify deployment return receipt if success
            var deployData
            if(argsArray){
                deployData = {
                    data,
                    arguments:argsArray
                }
            }else{
                deployData = {
                    data
                }
            }
            return new Promise(resolve => {
                getContract(compiledFileName).deploy(
                    deployData
                ).send({
                    from:accounts[0],
                    gas: 1500000,
                    gasPrice:'30000000000000'
                }).on('receipt', receipt => {
                    let address =  receipt.contractAddress
                    
                    resolve(getContractAt(compiledFileName,address))
                })
            })
        }catch(e){
            console.log('Failed to deploy contract');
            console.log(e)
        }
        
    }

    return{
        getContract,
        getContractAt,
        compileFromSource,
        deployContract
    }
}

module.exports = tokenHandler()
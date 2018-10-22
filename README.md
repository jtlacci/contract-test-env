# contract-test-env
web3 boilerplate for quick contract tests
`$npm install`

### Adding new contract
replace contract/token.sol with new contract 
in deploy.js change the three variables: SOLIDITY, COMPILED, and CONTRACT to reflect the new contract
NOTE: the CONTRACT varible MUST match the name of the contract in the .sol file

### Deploying
download [Ganache](https://truffleframework.com/ganache)
run ganache
make sure that the http provider in web3.js matchs the port ganache is running on
run `$npm run deploy`

### Interacting
add web3 calls in the index.js file
run `$npm run start`


### Note for truffle contracts
if using a compiled truffle contract .json with the ContractHandler.deployContract function
the getContract function mus be altered to grabe the abi from the right place as the 
truffle .json files have a slightly different structure

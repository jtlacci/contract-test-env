
const Web3 = require('web3')

var web3 = (function () {
    var instance;

    function init() {
        var web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        return web3js;
    }

    return {
        init: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

module.exports = web3.init();
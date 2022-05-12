const Moralis = require("moralis/node");

const { MORALIS_SERVER_URL, MORALIS_APP_ID, MORALIS_MASTER_KEY } = process.env;

module.exports = {
    start: async () => {
        await Moralis.start({
            serverUrl: MORALIS_SERVER_URL,
            appId: MORALIS_APP_ID,
            masterKey: MORALIS_MASTER_KEY
        });
    }
}
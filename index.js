const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

// Crasher URLs
const urls = [
    "https:\/\/tornadus\.net\/.*", //https://tornadus.net/orange
    "https:\/\/aguo\.dev\/gif", // https://aguo.dev/gif
    "https:\/\/animebitchesforfree\.neocities\.org\/reddit_rat\.html", // https://animebitchesforfree.neocities.org/reddit_rat.html
    "https:\/\/bit\.ly\/3wF5HYK", // https://bit.ly/3wF5HYK
    "http:\/\/darkkycrash\.tk\/", // http://darkkycrash.tk/
    "https:\/\/discordcrash\.luispatricio\.repl\.co\/", // https://discordcrash.luispatricio.repl.co/
    "https:\/\/gfycat\.com\/firsthandscratchybeetle", // https://gfycat.com/firsthandscratchybeetle
    "https:\/\/gfycat\.com\/importantthankfuliceblueredtopzebra", // https://gfycat.com/importantthankfuliceblueredtopzebra
    "https:\/\/gfycat\.com\/neatphonyacornweevil", // https://gfycat.com/neatphonyacornweevil
    "https:\/\/gfycat\.com\/plainwastefulgermanpinscher", // https://gfycat.com/plainwastefulgermanpinscher
    "https:\/\/giant\.gfycat\.com\/ApprehensiveRequiredHypsilophodon\.mp4", // https://giant.gfycat.com/ApprehensiveRequiredHypsilophodon.mp4
    "https:\/\/giant\.gfycat\.com\/UnderstatedThreadbareBear\.mp4", // https://giant.gfycat.com/UnderstatedThreadbareBear.mp4
    "https:\/\/i\.gyazo\.org\/fa046za0a359qeecgyanu5tq76ui7wbn", // https://i.gyazo.org/fa046za0a359qeecgyanu5tq76ui7wbn
    "http:\/\/invisiblecrashdarkky\.tk\/", // http://invisiblecrashdarkky.tk/
    "https:\/\/restockflippers\.co\/discord-crash", // https://restockflippers.co/discord-crash
    "https:\/\/thumbs\.gfycat\.com\/BlackSadBluebottlejellyfish-size_restricted\.gif", // https://thumbs.gfycat.com/BlackSadBluebottlejellyfish-size_restricted.gif
    "https:\/\/thumbs\.gfycat\.com\/OffensiveJampackedAgama-mobile\.mp4", // https://thumbs.gfycat.com/OffensiveJampackedAgama-mobile.mp4
    "https:\/\/thumbs\.gfycat\.com\/TartAdolescentBird-mobile\.mp4", // https://thumbs.gfycat.com/TartAdolescentBird-mobile.mp4
    "https:\/\/gfycat\.com\/animatedarcticcero", // https://gfycat.com/animatedarcticcero
    "https:\/\/giant\.gfycat\.com\/infantileyearlyauklet", // https://giant.gfycat.com/infantileyearlyauklet
    "https:\/\/thumbs\.gfycat\.com\/UntimelyExemplaryAmericanredsquirrel-mobile\.jpg" // https://thumbs.gfycat.com/UntimelyExemplaryAmericanredsquirrel-mobile.jpg
]

module.exports = class AntiCrash extends Plugin {
    async startPlugin() {

        const Message = await getModule(m => m.default && m.default.displayName === 'Message');
        inject('anti-crash', Message, 'default', (args, res) => {

            //Loops through urls and checks if any of them are found in the message.
            urls.forEach(url => {

                const content = new String(args[0]['childrenAccessories']['props']['message']['content']);

                //Removes message if url is found.
                if (content.match(url)) {

                    const authorName = args[0]['childrenAccessories']['props']['message']["author"]["username"];
                    const authorDiscriminator = args[0]['childrenAccessories']['props']['message']["author"]["discriminator"];

                    //Deletes message
                    args[0]['childrenAccessories']['props']['message'] = '';
                    res = '';

                    const toastContent = `${authorName}#${authorDiscriminator}`

                    console.log(`Crasher sent by ${toastContent}`)

                    //Sends toast to annouce removal.
                    powercord.api.notices.sendToast(`remove-crasher-toast`, {
                        header: 'Crasher Detected',
                        timeout: 4e3,
                        content: `Removed. Sent by ${toastContent}`,
                    });
                }
            });
            return res
        });
    }

    pluginWillUnload() {
        uninject('anti-crash')
    }
}
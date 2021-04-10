const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

// Crasher URLs
const urls = [
    "https:\/\/tornadus\.net\/.*" //https://tornadus.net/orange
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
const { Plugin } = require('powercord/entities');
const { getModule, channels } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

// Crasher URLs
let urls = [
    "https://tornadus.net/orange"
]

module.exports = class AntiCrash extends Plugin {
    async startPlugin() {

        const Message = await getModule(m => m.default && m.default.displayName === 'Message');
        const oldDefault = Message.default;
        inject('anti-crash', Message, 'default', (args, res) => {

            const currentUser = getModule(['getCurrentUser'], false).getCurrentUser();

            //Loops through urls and checks if any of them are found in the message.
            urls.forEach(url => {

                const content = args[0]['childrenAccessories']['props']['message']['content'];

                //Removes message if url is found.
                if (content.includes(url)) {
                    res = '';

                    const authorName = args[0]['childrenAccessories']['props']['message']["author"]["username"];
                    const authorDiscriminator = args[0]['childrenAccessories']['props']['message']["author"]["discriminator"];
                    const toastContent = `${authorName}#${authorDiscriminator}`

                    //Sends toast to annouce removal.
                    powercord.api.notices.sendToast('remove-toast', {
                        header: 'Crasher Detected',
                        timeout: 4e3,
                        content: `Removed. Sent by ${toastContent}`,
                      });

                }

            });
            return res
        });
    
        Object.assign(Message.default, oldDefault);
    }

    pluginWillUnload() {
        uninject('anti-crash')
    }
}
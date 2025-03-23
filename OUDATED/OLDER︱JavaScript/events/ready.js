module.exports = (Discord, Client, Settings, DatabaseHandler) => {
    Client.on("ready", () => {
        Client.generateInvite().then(invite => {
            console.log(invite)
        })
    })
}
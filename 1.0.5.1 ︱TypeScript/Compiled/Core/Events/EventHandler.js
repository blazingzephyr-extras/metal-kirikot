"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const fs_1 = require("fs");
class EventHandler {
    static async LoadFor(client) {
        const dir = `${__dirname}\\..\\..\\Events`;
        const files = fs_1.readdirSync(dir);
        for (let i in files) {
            const module = await Promise.resolve().then(() => require(`${dir}/${files[i]}`));
            const event = module.event;
            client.on(event.EventType, event.Execute);
            console.log(`✅ Loaded ${files[i]} event!`);
        }
    }
}
exports.EventHandler = EventHandler;

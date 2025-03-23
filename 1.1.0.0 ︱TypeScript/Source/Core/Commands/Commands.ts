import { readdirSync } from "node:fs"

export { Commands }

class Commands {

    private _commands: any[];
    private _customCommands: any[];

    public async LoadCommands_BuiltIn() {

        const dir: string = `${__dirname}\\..\\..\\Commands`;
        const files: string[] = readdirSync(dir);

        for (let i in files) {

            const module = await import(`${dir}\\${files[i]}`)
            const command = module.command
            this._commands[i] = command
        }
    }

    public LoadCommands_Custom() {

    }
}
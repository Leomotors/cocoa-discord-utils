import { CocoaSlash, CogSlash } from "..";
import { commandsDict } from "../../base";

const muckStorage: { [cogName: string]: commandsDict<CocoaSlash> } = {};

/**
 * **Note**: This feature is made possible with the existence of **Dark Magic**
 *
 * Or in normal people's word, This is ~~experimental~~ *stable*
 *
 * Equivalent to `CogSlash` for instance, you can use
 * ```js
 * addCog(new [your_extended_classname]())
 * ```
 */
export abstract class CogSlashClass implements CogSlash {
    name: string;
    description?: string;
    commands: commandsDict<CocoaSlash>;

    constructor(name: string, description?: string) {
        this.name = name;
        this.description = description;
        this.commands = muckStorage[this.constructor.name] ?? {};

        for (const [_, cmd] of Object.entries(this.commands)) {
            cmd.func = cmd.func.bind(this);
        }
    }
}

export const replaceNameKeyword = "__replace_with_method_name__";

/**
 * Example Usage
 * ```ts
 * @SlashCommand(new SlashCommandBuilder().setName("ping").setDescription("pong!").toJSON())
 * async ping(ctx: CommandInteraction) {
 *   await ctx.reply("pong!");
 * }
 * ```
 * **Note**: If syntax look broken, blame your IDE.
 * You may look at harunon.js to see this in action
 */
export function SlashCommand(
    command: CocoaSlash["command"],
    guild_ids?: string[]
) {
    return (
        cog: CogSlashClass,
        key: string,
        desc: TypedPropertyDescriptor<CocoaSlash["func"]>
    ) => {
        const muck = (muckStorage[cog.constructor.name] ??= {});

        if (command.name == replaceNameKeyword) command.name = key;

        if (muck[command.name]) {
            throw Error(`Duplicate Command Name: ${command.name}`);
        }

        if (desc.value) {
            muck[command.name] = { command, func: desc.value, guild_ids };
        } else {
            throw Error(`Unexpected Error: ${key}'s value is undefined`);
        }
    };
}

import chalk from "chalk";
import { assert } from "console";
import { Client, CommandInteraction, Interaction } from "discord.js";
import { NonEmptyArray } from "../shared";
import { Cog } from "./Interfaces";
import { syncCommands } from "./SlashSync";

export class SlashCenter {
    private readonly client: Client;
    private readonly guild_ids: NonEmptyArray<string>;
    private cogs: Cog[] = [];

    constructor(client: Client, guild_ids: NonEmptyArray<string>) {
        this.client = client;
        this.guild_ids = guild_ids;

        this.client.on(
            "interactionCreate",
            ((interaction: Interaction) => {
                if (!interaction.isCommand()) return;

                this.handleInteraction(interaction);
            }).bind(this)
        );
    }

    addCog(cog: Cog) {
        this.cogs.push(cog);
    }

    addCogs(...cogs: Cog[]) {
        this.cogs.push(...cogs);
    }

    async syncCommands() {
        if (!this.client.isReady()) {
            throw Error(
                "FATAL ERROR: SyncCommands must be called after Client is Ready"
            );
        }

        const commandData = [];
        for (const cog of this.cogs) {
            for (const commandName in cog.commands) {
                const command = cog.commands[commandName];
                commandData.push(command.command);
            }
        }

        await syncCommands(commandData, this.client, this.guild_ids);
    }

    private async handleInteraction(interaction: CommandInteraction) {
        const cmdname = interaction.commandName;
        for (const cog of this.cogs) {
            if (cog.commands[cmdname]) {
                try {
                    await cog.commands[cmdname].func(interaction);
                } catch (error) {
                    console.log(
                        chalk.red(
                            `[Slash Command: ${cmdname} ERROR] : ${error}`
                        )
                    );
                }
                return;
            }
        }
        console.log(
            chalk.red(`[Slash Center ERROR]: Unknown command ${cmdname}`)
        );
    }

    validateCommands() {
        const cogNames = [];
        for (const cog of this.cogs) {
            cogNames.push(cog.name);
            for (const [name, cmd] of Object.entries(cog.commands)) {
                if (name != cmd.command.name)
                    throw Error("Command name mismatch");
            }
        }

        if (new Set(cogNames).size !== cogNames.length) {
            throw Error("Duplicate cog names");
        }
    }
}

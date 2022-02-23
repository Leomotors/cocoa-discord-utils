import chalk from "chalk";
import { Client, CommandInteraction, Interaction } from "discord.js";

import { Awaitable, ManagementCenter } from "../base";
import { EmbedStyle } from "../main";
import { CocoaBuilder, Ephemeral, getEphemeral } from "../template";

import { CogSlashClass } from "./class";
import { CogSlash } from "./Interfaces";
import { syncCommands } from "./SlashSync";

export interface SlashEvents {
    error: (
        name: string,
        error: unknown,
        ctx: CommandInteraction
    ) => Awaitable<void>;
    interaction: (name: string, ctx: CommandInteraction) => Promise<void>;
}

export class SlashCenter extends ManagementCenter<
    CogSlash,
    CogSlashClass,
    SlashEvents
> {
    private readonly guild_ids: string[];

    /**
     * @param client It is what it is
     * @param guild_ids Array of Guild IDs, will *throw error* if is `undefined`
     */
    constructor(client: Client, guild_ids: string[] | undefined) {
        super(client, "Slash", { error: [], interaction: [] });

        if (!guild_ids || guild_ids.length < 1)
            throw Error("guild_ids not exist");
        this.guild_ids = guild_ids;

        this.client.on("interactionCreate", (interaction: Interaction) => {
            if (!interaction.isCommand()) return;

            this.handleInteraction(interaction);
        });
    }

    /** Sync Slash Commands, Call this **ONLY** after client is ready */
    async syncCommands() {
        if (!this.client.isReady()) {
            throw Error(
                "FATAL ERROR: SyncCommands must be called after Client is Ready"
            );
        }

        if (!this.validated)
            console.log(
                chalk.yellow(
                    "[Slash Center WARN]: Please validate command by using checkLogin()"
                )
            );

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
                    if (this.hasHandler("interaction"))
                        await this.runAllHandler(
                            "interaction",
                            cmdname,
                            interaction
                        );
                } catch (error) {
                    console.log(
                        chalk.red(
                            `[Slash Command: ${cmdname} ERROR] : ${error}`
                        )
                    );
                    if (this.hasHandler("error"))
                        await this.runAllHandler(
                            "error",
                            cmdname,
                            error,
                            interaction
                        );
                }
                return;
            }
        }
        console.log(
            chalk.red(`[Slash Center ERROR]: Unknown command ${cmdname}`)
        );
    }

    override useHelpCommand(style?: EmbedStyle) {
        this.validated = false;
        const emb = this.generateHelpCommandAsEmbed();

        this.addCog({
            name: "Help",
            commands: {
                help: {
                    command: CocoaBuilder("help", "Show help for all commands")
                        .addBooleanOption(Ephemeral())
                        .toJSON(),
                    func: async (ctx) => {
                        const ephemeral = getEphemeral(ctx);
                        await ctx.reply({
                            embeds: [style ? style.apply(ctx, emb) : emb],
                            ephemeral,
                        });
                    },
                },
            },
        });
    }
}

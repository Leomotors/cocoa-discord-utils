# Command Management System

ah muck, I wrote this file for so long and accidently delete it.

*muck*

Anyway, let's get into the rewritten one, hope I don't delete it again.

## Prerequisite

To understand this guide, you need to know:

- discord.js

- SlashCommandBuilder (@discordjs/builders) or JSON Structure of Slash Command

## Understand the Concept

The Command Management System in this library is inspired by discord.py's
cog system. It is similar but not identical to.

The Cog is a collection of Commands, and one bot may run multiple Cogs.

There are two implementations of the system.

1) Object Cog - Build on concept of one command per file.

2) Class Cog - Similar syntax to discord.py's Cog system.

Because I'm lazy with the reason given above. I'm going to talk only about
Slash Commands.

Message Commands will be similar to but have some important differences.
See [harunon.js](https://github.com/CarelessDev/harunon.js)

## Object Cog

### Create a Command

```ts
export const ping: CocoaSlash = {
    command: CocoaBuilder("ping", "pong!").toJSON(),
    func: async (ctx) => {
        await ctx.reply("pong!");
    },
}
```

**Note**: CocoaSlash is a utility function that returns SlashCommandBuilder

```ts
CocoaBuilder("ping", "pong!")
// Returns
new SlashCommandBuilder().setName("ping").setDescription("pong!")
// You can continue extend the SlashCommandBuilder normally
```

The goal of this function is to reduce the amount of frequently used code.

**Remark**:

- Cocoa Discord Utils does not provide Slash Command Builder,
you will need to use `SlashCommandBuilder` from `@discordjs/builders` or `CocoaBuilder` that will eventually returns `SlashCommandBuilder`

- Please refer to `discord.js` documents on how to handle interaction

Also, please keep in mind that this package is utility and not framework.

~~Because I ever made a framework that is easy to implement and it ends up
being a garbage. Visit [here](https://www.npmjs.com/package/s-bot-framework)~~

### Create a Cog

```ts
export const mainCog: CogSlash = {
    name: "Main Cog",
    description: "This is the main cog",
    commands: {
        ping,
    },
}
```

**Note**: The key of `commands` must match the name of its command in SlashCommandBuilder.
In order to ensure this, you are encouraged to run a function which will be
mentioned in the next section.

### Slash Command Center

```ts
const center = new SlashCenter(
    client,
    process.env.GUILD_IDS?.split(",") ?? []
);
// addCog for adding 1 Cog, addCogs for multiple Cogs
// However, addCogs also works on adding 1 Cog
center.addCogs(mainCog);
center.validateCommands();
```

`SlashCenter.validateCommands()` need to be called after all cogs are added
to ensure that the condition mentioned above is met.

## Class Cog

*This syntax is inspired by discord.py*

Just to let you know that behind this beautiful syntax, it is achieved using
dark magic. (See source code [here](../src/slash/class/index.ts)).
But nothing to worry about it! Based on testing, it never break.
So, it is marked as `stable` now.

**To use Class Cog**, We will need to extend the base class given,
and implement methods/commands with decorator.

The `CogClass` are based on Object Cog, so we can add it to management center
in the ~~same~~ similar way as the Object Cog.

*Definition for `CogSlashClass`*

```ts
export abstract class CogSlashClass implements CogSlash
```

**Example of Class Cog**

```ts
export class MainCog extends CogSlashClass {
    constructor() {
        super("Main Cog", "This is the main cog");
    }

    // Normal Way
    @SlashCommand(CocoaBuilder("ping", "pong!").toJSON())
    async ping(ctx: CommandInteraction) {
        await ctx.reply("pong!");
    }

    // NEW!
    @SlashCommand(AutoBuilder("pong!"))
    async ping(ctx: CommandInteraction) {
        ...
    }
    // With AutoBuilder, you can omit the name field,
    // it will take the name from the method name
    // From 1.2.0, with CogSlashClass, you can omit .toJSON()

    // Always note that there is limitation on how you can name command
    // But discord.js will throw error at start time, so nothing to worry about
}
```

The library will automatically bind your method to an instance, so you can use
it like a class. Like, add some methods or properties!

And to add it to Slash Center just like Object Cog

```ts
center.addCogs(new MainCog());
```

Because CogSlashClass implements CogSlash, we can add it to Slash Center and even mix it with Object Cog.

**Note**: Due to some TypeScript mumbo jumbo, you are required to explicitly 
specify type in your method arguments.

*Argument Name can be changed, but must specify the correct type*

## Message Command

To invoke a message command, user need to meets two criteria.

- Mention or Global Prefix

- Command Name and Arguments

*Note: This is similar to discord.py's cogs*

### Message Center

```ts
const mcenter = new MessageCenter(client, { prefixes: ["simp"] });
```

*In this example, our bot will only listen to message with prefix simp*

```ts
class MainCog extends CogMessageClass {
    // constructor omitted

    @MessageCommand({
        // This can be omitted, the decorator will use `name` from function name
        // name: "ping",
        aliases: ["ing"],
        description: "pong!",
    })
    async ping(msg: Message, strp: string) {
        await msg.reply("pong!");
    }
}
```

User can invoke `ping` command by sending `simpping` or `simping`

`strp` (Stripped Content) is `message.content` that removed prefix or mentions
and command name

*For example*

```ts
// Command: play (using prefixes: ["simp"])
"simpplay The Rumbling"
// strippedContent is equal to
"The Rumbling"

// Command: submit (using mention: true)
"<@bot_id> submit cancel_1112 ```py\nimport os; os.system('sudo reboot');```"
// strippedContent is equal to
"cancel_1112 ```py\nimport os; os.system('sudo reboot');```"
```

*`message.content` is remained unmodified, you can access full message there too*

## Help Command

Both `MessageCenter` and `SlashCenter` is capable of generating help command, make sure to call them in right order.

The help command is named `help` in `Help` Cog, so beware not to create cog or command with the same name.

```js
scenter.addCogs( /* all your cogs */);
// * Help Command, must be called after All Cogs are added
scenter.useHelpCommand(style);
// * BUT before Validate Commands
scenter.validateCommands();
scenter.on("error", /* if you wanna set */);
// * REMINDER: syncCommands should be used in client.on("ready")
```

## Event Handler

[Event Handler for Management Center](./cms_evt.md)

## PS

See [cocoa-grader](https://github.com/Leomotors/cocoa-grader) and [harunon.js](https://github.com/CarelessDev/harunon.js)

## Advanced Feature: Specific-Guild Command

You may want some specific commands to be available to specific guilds,
this is where Specific-Guild Command is here.

First, when you create a Command Center, you will need to add Guild IDS
to constructor arguments. This is default or base guild ids which will
be used for every commands.

```ts
new SlashCenter(client, [1, 2]);
```

For each command, you can override the guild ids it is targeting to,
by adding field `guild_ids` for Object Cog, or `second argument` in Class Cog.

```ts
// Instead of syncing to 1 and 2 (Default), sync to 1 and 3 instead
@SlashCommand(AutoBuilder(...), [1, 3])
```

The library will take care of unioning the guild ids, so you can think of them
as `Default` and `Override`

### How does it works

For Message Command, if this feature is enabled 
(by specifying guild_ids in constructor), the library will check if the message
is created in the allowed guild and respond to it.

For Slash Command, the library will only sync the command to the guilds specified,
it also do a cleanup in case you change the values.
// * https://stackoverflow.com/a/49910890
export type NonEmptyArray<T> = T[] & { 0: T };

export type Awaitable<T> = T | PromiseLike<T>;

export type BaseCommand = { command: { name: string; description?: string } };

/** commandName **must equal to** it's value .command.name */
export type commandsDict<T extends BaseCommand> = {
    [commandName: string]: T;
};

export interface Cog<T extends BaseCommand> {
    name: string;
    description?: string;
    commands: commandsDict<T>;
}
import { splitByLine } from "../01/splitByLine.ts";



export function getCommands(input: string): string[] {
    return input.split("$");
}

export function executeAllCommands(input: string) {
    return executeCommands(getCommands(input));
}


export function getSizes(dir: dir): dirSize[] {
    const dirs: dirSize[] = []
    let dirSize = 0;
    for (const file of dir.files) {
        dirSize += file.size;
    }
    for (const d of dir.subdirs) {
        const subSizes = getSizes(d);
        dirSize += subSizes[0].size;
        subSizes.forEach(sd => dirs.push(sd));
    }
    dirs.unshift({
        dir,
        size: dirSize
    });
    return dirs;
}

export type dirSize = {
    dir: dir,
    size: number;
}


export function executeCommands(input: string[]) {
    const rootDir = {
        name: "root",
        files: [],
        subdirs: []
    }
    let ctx: commandContext = {
        dir: rootDir,
        rootDir,
        fullCommand: ""
    };
    input.forEach(command => {
        if (!command) return;
        const commandString = command.substring(1, 3);
        const c = commands[commandString];
        if (!c) throw new Error(`unknown command "${commandString}" in full command "${command}"`);
        ctx = {...ctx, fullCommand: command};
        ctx = c(ctx);
    });
    return rootDir;
}

export const commands: Record<string, commandFunc> = {
    ls: (ctx: commandContext) => {
        const result = splitByLine(ctx.fullCommand) as string[];
        for (const r of result) {
            if (r.startsWith("dir ")) {
                getOrCreateSubDir(ctx.dir, r.substring(4));
            } else if (!isNaN(parseInt(r[0]))) {
                const [sizeString, filename] = r.split(" ")
                getOrCreateFile(ctx.dir, filename, sizeString);
            }
        }
        return {...ctx}
    },
    cd: (ctx: commandContext) => {
        const lines = splitByLine(ctx.fullCommand);
        const to = lines[0].substring(4);
        const toDir = 
            to === ".." ? ctx.dir.parent : 
            to === "/" ? ctx.rootDir :
            getOrCreateSubDir(ctx.dir, to);
        return {...ctx, dir: toDir!}
    }
}

export type commandFunc = (ctx: commandContext) => commandContext;

function getOrCreateSubDir(current: dir, name: string) {
    let dir = current.subdirs.find(d => d.name === name);
    if (!dir) {
        dir = {
            name,
            files: [],
            subdirs: [],
            parent: current
        }
        current.subdirs.push(dir);
    }
    return dir;
}

function getOrCreateFile(current: dir, name: string, sizeString: string) {
    let file = current.files.find(f => f.name === name);
    if (!file) 
    {
        file = {
            name,
            size: 0
        }
        current.files.push(file);
    }
    file.size = parseInt(sizeString);
    return file;
}

export type commandContext = {
    dir: dir,
    rootDir: dir,
    fullCommand: string;
}




export type dir = { name: string, files: file[], subdirs: dir[], parent?: dir }

export type file = { name: string, size: number }
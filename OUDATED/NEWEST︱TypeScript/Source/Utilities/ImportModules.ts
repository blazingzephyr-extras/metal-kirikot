export async function ImportModules(directory: string, modules: any[]) 
{
    let files = readdirSync(`${__dirname}/${directory}/`);
    for(let file in files) 
    {
        let module = await import(`${__dirname}/${directory}/${file}`);
        modules.push(module);
    }
}
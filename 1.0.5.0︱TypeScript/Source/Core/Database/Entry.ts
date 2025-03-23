
export { Entry, TargetedEntry }

interface Entry {

    readonly CommandName: string, 
    readonly ExpireDate: number
}

interface TargetedEntry extends Entry {

    readonly TargetId: string
}

export { CC_Entry, CC_TargetedEntry }

interface CC_Entry {

    readonly CommandName: string, 
    readonly ExpireDate: number
};

interface CC_TargetedEntry extends CC_Entry {

    readonly TargetId: string
};
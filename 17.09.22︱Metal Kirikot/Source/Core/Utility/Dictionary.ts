
export { Dictionary };

interface Dictionary<T> {

    [Key: string]: T;
}
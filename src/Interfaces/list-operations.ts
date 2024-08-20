export type CombineTwoArrays<T extends readonly string[], U extends readonly string[]> = `${T[number]}-${U[number]}`
export type CombineSameArrayTripleTimes<T extends readonly string[]> = `${T[number]}-${T[number]}-${T[number]}`

export type ListToUnion<T extends readonly string[]> = T[number];

export type ValuesOf<T> = {
    [K in keyof T]?: T[K] extends (infer U)[] ? U : any;
};
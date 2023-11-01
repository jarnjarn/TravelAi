export type Sort<T> = {
	[P in keyof T]?: 'asc' | 'desc' | 1 | -1 | undefined;
};

export type KeyOf<T> = keyof T & string;
export type ArrayKeyOf<T> = KeyOf<T>[];
export type valueOf<T> = T[KeyOf<T>];
export type valueOfArray<T> = T[KeyOf<T>][];

export type Contructor<T> = new (...args: any[]) => T;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

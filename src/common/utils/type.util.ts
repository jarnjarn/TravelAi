export class TypeUtil {
	public static covert<T>(data: any) {
		return data as T;
	}
	public static typeName<T>(type: T): string {
		return (type as any).name;
	}

	public static typeOf< T>(type: T): typeof type  
	{
		return type;
	}
}

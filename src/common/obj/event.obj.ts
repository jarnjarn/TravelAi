export class Event {
	private name: string;
	constructor(name: string) {
		this.name = name;
	}
	get CREATED(): string {
		return `${this.name}.created`;
	}
	get UPDATED(): string {
		return `${this.name}.updated`;
	}
	get UPDATES(): string {
		return `${this.name}.updates`;
	}
	get DELETED(): string {
		return `${this.name}.deleted`;
	}
	get DELETES(): string {
		return `${this.name}.deletes`;
	}
	get GET(): string {
		return `${this.name}.get`;
	}
	get WILL_CARD(): string {
		return `${this.name}.*`;
	}
	public custom(name: string): string {
		return `${this.name}.${name}`;
	}
}

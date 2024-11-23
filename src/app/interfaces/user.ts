export interface UserDto {
	name: string;
	email: string;
	phone: string;
	active: boolean;
}

export interface User extends UserDto {
	id: string;
}

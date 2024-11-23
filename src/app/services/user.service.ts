import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { of, type Observable } from "rxjs";
import type { User, UserDto } from "../interfaces/user";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private readonly apiUrl = "http://localhost:3000/users";
	private readonly http = inject(HttpClient);
	private readonly storageKey = "users";
	private apiAvailable = signal<boolean | null>(null);
	private users = signal<User[]>([]);
	isApiAvailable = this.apiAvailable.asReadonly();

	setApiAvailable(apiAvailable: boolean) {
		if (this.apiAvailable() === null) {
			this.apiAvailable.set(apiAvailable);
		}
	}

	getUsers(): Observable<User[]> {
		if (this.isApiAvailable() === false) {
			return of(this.getUsersFromStorage());
		}
		return this.http.get<User[]>(this.apiUrl);
	}

	postUser(name: string) {
		const user: UserDto = {
			name,
			email: "",
			phone: "",
			active: true,
		};
		return this.http.post<User>(this.apiUrl, user);
	}

	private getUsersFromStorage(): User[] {
		const usersJson = sessionStorage.getItem(this.storageKey);
		return usersJson ? JSON.parse(usersJson) : [];
	}

	private saveUsersToStorage(users: User[]): void {
		sessionStorage.setItem(this.storageKey, JSON.stringify(users));
		this.users.set(users);
	}
}

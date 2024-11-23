import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import type { User } from "../interfaces/user";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private readonly apiUrl = "http://localhost:3000/users";
	private readonly http = inject(HttpClient);

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.apiUrl);
	}
}

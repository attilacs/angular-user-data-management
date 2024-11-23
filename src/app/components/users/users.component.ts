import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { EMPTY, type Observable } from "rxjs";
import type { User } from "../../interfaces/user";

@Component({
	selector: "app-users",
	imports: [CommonModule, AsyncPipe],
	templateUrl: "./users.component.html",
	styleUrl: "./users.component.css",
})
export class UsersComponent implements OnInit {
	title = "users";
	private userService = inject(UserService);
	users$: Observable<User[] | null> = EMPTY;

	ngOnInit(): void {
		this.users$ = this.userService.getUsers();
	}
}

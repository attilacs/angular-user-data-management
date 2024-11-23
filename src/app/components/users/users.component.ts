import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, type OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { EMPTY, of, type Observable } from "rxjs";
import type { User } from "../../interfaces/user";
import { UserComponent } from "../user/user.component";
import { Router } from "@angular/router";

@Component({
	selector: "app-users",
	imports: [CommonModule, UserComponent],
	templateUrl: "./users.component.html",
	styleUrl: "./users.component.css",
})
export class UsersComponent implements OnInit {
	title = "users";
	private userService = inject(UserService);
	private router = inject(Router);
	destroyRef = inject(DestroyRef);
	users$: Observable<User[] | null> = EMPTY;

	ngOnInit(): void {
		const subscription = this.userService.getUsers().subscribe({
			next: (users) => {
				this.users$ = of(users);
			},
			error: (error) => {
				if (this.userService.isApiAvailable() === null) {
					this.userService.setApiAvailable(false);
				} else {
					console.error(error);
				}
			},
		});
		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe();
		});
	}

	onAdd() {
		this.router.navigate(["/new"]);
	}
}

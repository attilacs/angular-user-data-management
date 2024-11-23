import {
	Component,
	DestroyRef,
	inject,
	input,
	type OnInit,
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";

@Component({
	selector: "app-user-form",
	imports: [ReactiveFormsModule],
	templateUrl: "./user-form.component.html",
	styleUrl: "./user-form.component.css",
})
export class UserFormComponent {
	private userService = inject(UserService);
	private router = inject(Router);
	private destroyRef = inject(DestroyRef);
	userId = input<string | null>(null);

	form = new FormGroup({
		name: new FormControl("", [Validators.required]),
	});

	onSubmit() {
		const name = this.form.controls.name.value;
		if (name) {
			const subscription = this.userService.postUser(name).subscribe({
				next: () => {
					this.router.navigate(["/users"]);
				},
				error: (error) => {
					console.error(error);
				},
			});
			this.destroyRef.onDestroy(() => {
				subscription.unsubscribe();
			});
		}
	}

	onCancel() {
		this.router.navigate(["/users"]);
	}
}

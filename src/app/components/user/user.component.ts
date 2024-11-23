import { Component, input } from "@angular/core";
import type { User } from "../../interfaces/user";

@Component({
	selector: "app-user",
	imports: [],
	templateUrl: "./user.component.html",
	styleUrl: "./user.component.css",
})
export class UserComponent {
	user = input.required<User>();
}

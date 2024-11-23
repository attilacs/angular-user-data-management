import type { Routes } from "@angular/router";
import { UsersComponent } from "./components/users/users.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

export const routes: Routes = [
	{ path: "users", component: UsersComponent },
	{ path: "new", component: UserFormComponent },
	{ path: "", redirectTo: "/users", pathMatch: "full" },
];

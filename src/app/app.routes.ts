import type { Routes } from "@angular/router";
import { UsersComponent } from "./components/users/users.component";

export const routes: Routes = [
	{ path: "users", component: UsersComponent },
	{ path: "", redirectTo: "/users", pathMatch: "full" },
];

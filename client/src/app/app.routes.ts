import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () =>
      import("./components/auth/login/login.component").then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./components/auth/registration/registration.component").then(
        (c) => c.RegistrationComponent,
      ),
  },
];

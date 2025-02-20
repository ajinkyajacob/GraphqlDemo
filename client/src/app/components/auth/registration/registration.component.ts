import { Component, inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { first } from "rxjs";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-registration",
  imports: [RouterLink],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.css",
})
export class RegistrationComponent {
  auth = inject(AuthService);
  form = new FormGroup({
    first: new FormControl<string>(""),
    last: new FormControl<string>(""),
    email: new FormControl<string>(""),
    password: new FormControl<string>(""),
  });

  register() {
    if (this.form.valid) {
      const { email, first, last, password } = this.form.value;
      const payload = { username: email, password, name: `${first} ${last}` };
      this.auth.register(payload as any).subscribe();
    }
  }
}

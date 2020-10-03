import { LoginService } from './login.service';
import { NotificationService } from './../../shared/messages/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.loginService.login(
      this.loginForm.value.email, this.loginForm.value.password
      ).subscribe(user => this.notificationService.notify(`Bem vindo(a), ${user.name}`, 'success'),
      response => this.notificationService.notify(response.error.message, 'danger'),
      () => {
        this.router.navigate([atob(this.navigateTo)])
      }
    )
  }

}

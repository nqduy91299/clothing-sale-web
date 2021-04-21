import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiLoginAdminService } from 'src/app/services/api-login-admin.service';
import { getCookie, setCookie } from 'src/app/share/constants/cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFrm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private apiLoginAdminService: ApiLoginAdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = getCookie('SOA-final-prj');
    if (token) {
      this.router.navigate(['/admin']);
    }
  }

  login() {
    const { username, password } = this.loginFrm.value;
    this.apiLoginAdminService
      .apiLoginPost(username, password)
      .subscribe((res) => {
        if (res.code === 200) {
          localStorage.setItem('token', res.token);
          setCookie('SOA-final-prj', res.token, 1);
          this.toastr.success(res.msg, 'Successful!');
          setTimeout(() => {
            this.router.navigate(['/admin']);
          });
        }
      });
  }
}

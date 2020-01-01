import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  constructor(private httpService: HttpService, private snackBar: SnackbarService, private router: Router) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),

    })
  }
  onChangesPassword() {
    let data = this.resetForm.value;
    console.log('---data user/changepassword', data);
    if (this.resetForm.value.newpassword === this.resetForm.value.confirmpassword) {
      this.httpService.post('user/changepassword', data).subscribe((res: any) => {
        console.log('---user/changepassword', res);
        if (res.success) {
          this.router.navigate(['category/list-category', { action: 'add' }])

        } else {
          this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
          

        }

      })
    }else{
    this.resetForm.patchValue({
        confirmpassword: ''
      })
      this.snackBar.openSnackBar('Passwords do not match', 'Close', 'red-snackbar');
    }
  }

}

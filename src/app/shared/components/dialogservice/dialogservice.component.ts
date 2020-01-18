import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import {SnackbarService} from '../../services/snackbar.service';
// import { HttpService } from '../../services/http.service';
// import { Location } from '@angular/common';
import { MasterService } from '../../services/master.service'

@Component({
  selector: 'app-dialogservice',
  templateUrl: './dialogservice.component.html',
  styleUrls: ['./dialogservice.component.scss']
})
export class DialogserviceComponent implements OnInit {

  dialogHeader = "";
  dialogMessage = "";
  dialogAcceptBtn = "Yes";
  dialogRejecteBtn = "No";
  dailogTerm = ""

  constructor(
    // private location: Location,
    // private httpService: HttpService,
    private masterService: MasterService,
    public dialogRef: MatDialogRef<DialogserviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  remaksGroup: FormGroup;
  initializeForm() {
    this.remaksGroup = new FormGroup({
      remarks: new FormControl('', Validators.required)
    });
  }

  acceptResponse: any;
  onDialogAcceptBtn(): void {
    this.acceptResponse = {
      remarks: this.remaksGroup.value.remarks,
      accept: true,
    }
    this.dialogRef.close(this.acceptResponse);
  }

  ngOnInit() {
    this.initializeForm()
  }

  onDialogRejectBtn(): void {
    console.log('In reject');
    this.dialogRef.close({ remarks: '', accept: false });
  }

  validRemark: boolean = false;
  remarkEntered(){
    console.log('hi');
    this.validRemark = (this.remaksGroup.value.remarks.trim().length > 0) ? true : false;
    // console.log('A', this.validRemark);
  }

}

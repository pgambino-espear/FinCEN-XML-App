import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../upload/dialog/dialog.component'
import { UploadService } from '../upload/upload.service';


@Component({
  selector: 'app-fin-cen-submission',
  templateUrl: './fin-cen-submission.component.html',
  styleUrls: ['./fin-cen-submission.component.css']
})
export class FinCENSubmissionComponent implements OnInit {

  message: string;
  fileName: string;
  userForm: FormGroup;
  fxGapV = '1%';

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: null,
      fileType: null
    })
    this.uploadService.currentMessage.subscribe(message => this.message = message)
  }

  onSubmit() {
    let date = new Date();
    console.log(this.userForm.value)
    console.log(this.userForm.value.fileType + "" + this.datePipe.transform(date, "yyyyMMddHHss") + "<" + this.userForm.value.username + ">")
    this.message = this.userForm.value.fileType + "" + this.datePipe.transform(date, "yyyyMMddHHss") + "001" + this.userForm.value.username + ""
    console.log("this.formattedName: ", this.message)
    this.uploadService.changeMessage(this.message);
    console.log(this.uploadService.currentMessage)
    return this.message;
  }

  showFileType() {
    console.log(this.userForm.value.fileType);
  }

  public openUploadDialog() {
    //TODO stuff here...
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });

  }

}

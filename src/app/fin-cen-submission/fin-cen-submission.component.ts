import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fin-cen-submission',
  templateUrl: './fin-cen-submission.component.html',
  styleUrls: ['./fin-cen-submission.component.css']
})
export class FinCENSubmissionComponent implements OnInit {


  fileName: string;
  userForm: FormGroup;
  fxGapV = '1%';

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: '',
      fileType: ''
    })
  }

  onSubmit() {
    let date = new Date();
    console.log(this.userForm.value)
    console.log(this.userForm.value.fileType + "." + this.datePipe.transform(date, "yyyyMMddHHss") + ".<" + this.userForm.value.username + ">")
    return (this.userForm.value.fileType + "." + this.datePipe.transform(date, "yyyyMMddHHss") + ".<" + this.userForm.value.username + ">")
  }

}

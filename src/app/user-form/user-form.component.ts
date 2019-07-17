import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm;
  fxGapV = '1%';

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      username: ''
    })
  }

  ngOnInit() {
  }

}

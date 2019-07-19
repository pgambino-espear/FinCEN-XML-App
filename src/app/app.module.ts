import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//Http 
import { HttpClientModule } from '@angular/common/http';
//Datepipe
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//FX Layout
import { FlexLayoutModule } from '@angular/flex-layout';
//Header
import { HeaderComponent } from './header/header.component';
//Username form
import { UserFormComponent } from './user-form/user-form.component';
//Filetype Radio Form
import { FileTypeFormComponent } from './file-type-form/file-type-form.component';
//File upload Form
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { LogService } from './log.service';
import { FinCENSubmissionComponent } from './fin-cen-submission/fin-cen-submission.component';
//Material
import {

  MatButtonModule,
  MatRadioModule,
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatDialogRef

} from '@angular/material';
import { UploadService } from './app/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserFormComponent,
    FileTypeFormComponent,
    FileUploadComponent,
    FinCENSubmissionComponent,
  ],
  imports: [
    BrowserModule,
    //Browser Animation
    BrowserAnimationsModule,
    //Http
    HttpClientModule,
    //Material
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    //Reactive Forms
    ReactiveFormsModule,
    //FX Layout
    FlexLayoutModule,
  ],
  providers: [LogService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

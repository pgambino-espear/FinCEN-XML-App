import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//Http 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
//Material
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatFormFieldModule,
  MatToolbarModule
} from '@angular/material';
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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserFormComponent,
    FileTypeFormComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    //Browser Animation
    BrowserAnimationsModule,
    //Http
    HttpClientModule,
    //Material
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatFileUploadModule,
    //Reactive Forms
    ReactiveFormsModule,
    //FX Layout
    FlexLayoutModule
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }

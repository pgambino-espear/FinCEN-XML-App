import { Injectable, Input } from '@angular/core';

import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
declare const fs: any;

//From the form, 

const url = 'http://localhost:3000/upload';

@Injectable()
export class UploadService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  formattedName
  seqIndex: number = 0;
  finalSeq: string = '';
  constructor(private http: HttpClient) {
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getMessage() {
    this.currentMessage.forEach(formattedName => {
      this.formattedName = formattedName
    });
  }

  increment() {
    return this.seqIndex++;
  }

  public upload(
    files: Set<File>
  ): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      this.increment();
      if(this.seqIndex < 10){
        this.finalSeq = `00${this.seqIndex}`
      } else if (this.seqIndex <= 99 ) {
        this.finalSeq = `0${this.seqIndex}`
      } else {
        this.finalSeq = `${this.seqIndex}`;
      }
      // create a new multipart-form for every file
      this.getMessage();
      const formData: FormData = new FormData();
      //Actual file upload append
      formData.append('file', file, `${this.formattedName}${this.finalSeq}.xml`);
      // rename(file.name, 'loremipsum', function (err) {
      //   if (err) console.log('ERROR: ' + err);
      // })
      // formData.append('file', file, `File${this.finalSeq}.xml`);
      console.log("File name from inside upload", file.name)

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      console.log(req.body)

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    this.seqIndex = 0;
    this.finalSeq = ''
    return status;
  }
}

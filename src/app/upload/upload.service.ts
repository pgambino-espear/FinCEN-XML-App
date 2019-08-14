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

  private messageSource = new BehaviorSubject('default message'); // Message from finCen-submission component containing formattedName data
  currentMessage = this.messageSource.asObservable(); //Observable for incoming messages
  formattedName // Formatted name that file will be renamed to. 
  seqIndex: number = 0; //Incrementor for file number
  finalSeq: string = ''; // Final sequence number as string based off of seqIndex
  constructor(private http: HttpClient) {
  }

  changeMessage(message: string) { // Called when updating formatted name/incoming message
    this.messageSource.next(message)
  }

  getMessage() { // Retrieves current formatted file name from observable.
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
      this.increment(); //Increment every time a new file is uploaded
      if (this.seqIndex < 10) { // Final seq number must be in format of XXX so we need to change how many 0s are pre-pended based on the number of files being uploaded
        this.finalSeq = `00${this.seqIndex}`
      } else if (this.seqIndex <= 99) {
        this.finalSeq = `0${this.seqIndex}`
      } else {
        this.finalSeq = `${this.seqIndex}`;
      }
      // create a new multipart-form for every file
      this.getMessage();
      const formData: FormData = new FormData();
      //Actual file upload append
      formData.append('file', file, `${this.formattedName}${this.finalSeq}.xml`);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

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

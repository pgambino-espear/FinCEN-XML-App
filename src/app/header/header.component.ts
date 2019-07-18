import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: String = "FinCEN File Submission"
  constructor(private logger: LogService) { }

  ngOnInit() {
  }

}

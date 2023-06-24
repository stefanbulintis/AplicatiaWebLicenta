import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  newData: any;
  display: any;

  constructor(private _apiService: ApiCallService) {
    this.start(1)
  }

  ngOnInit() {
    this._apiService.getData().subscribe(res => {
      this.newData = res;
    });
  }


  refresh() {
    location.reload();
  }
  start(minute: number) {
    // let minute = 1;
    let seconds = minute * 60;
    let textSec: any = "0";
    let statSec = 20;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 20;

      if (statSec < 10) {
        console.log("inside", statSec);
        textSec = "0" + statSec;
      } else {
        console.log("else", statSec);
        textSec = statSec;
      }

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }

  getMessage(field1: string): string {
    const field1Number: number = parseInt(field1, 10);

    if (field1Number === 0) {
      return 'Amprenta nerecunoscută';
    } else if (field1Number === 1) {
      return 'Răzvan a intrat';
    } else if (field1Number === 2) {
      return 'Ștefan a intrat';
    } else {
      return 'Nicio amprentă detectată';
    }
  }

  openDoor() {
    this._apiService.openDoor();
  }
}

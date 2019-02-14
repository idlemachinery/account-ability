import { Injectable } from '@angular/core';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TimeStringAdapterService implements NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return;
    }
    const segments = value.split(':');
    return {
      hour: Number(segments[0]),
      minute: Number(segments[1]),
      second: Number(segments[2])
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return;
    }
    return `${time.hour}:${time.minute}:${time.second}`;
  }
}

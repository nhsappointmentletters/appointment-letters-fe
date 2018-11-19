import {Injectable} from "@angular/core";
import {apiwrapper} from "../apis/apiwrapper";
import {map} from "rxjs/operators";

@Injectable()
export class AppointmentsService {

  constructor(private apiwrapper:apiwrapper) { }

  //only for POC
  createAppointment(userId){
    return this.apiwrapper.createAppointments(userId);
  }

  downloadFile() {
    console.log("from AppointmentsService.downloadFile");
    this.apiwrapper.downloadFile();
  }

  //only for POC
  deleteAllAppointmentsForUserId(userId){
    return this.apiwrapper.deleteAllAppointmentsForUserId(userId).pipe(
      map(res => res),
      errorModel => errorModel
    );
  }
}

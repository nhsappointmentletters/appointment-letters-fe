import {Component, OnInit} from "@angular/core";
import {PatientService} from "../../services/patient.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserHospitalsModel} from "../../models/UserHospitalsModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {concatMap} from "rxjs/operators";
import {AppointmentsService} from "../../services/appointments.service";
import {AppointmentModel} from "../../models/AppointmentModel";
import { Http, ResponseContentType } from '@angular/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private patientService:PatientService, private modalService: NgbModal, private snackbar:MatSnackBar, private router:Router, private appointmentsService:AppointmentsService) { }
  username='test';
  fetching=false;
  isNavbarCollapsed=true;
  userHospitalAppointments:UserHospitalsModel[];
  closeResult: string;

  ngOnInit() {
    this.getUserHospitalAppointments();
  }

  getUserHospitalAppointments(){
    let user = this.authenticationService.getUser();
    this.username = user.username;
    this.fetching = true;
    this.patientService.getAppointmentsForUserId(user.id)
    .subscribe(
      userHospitalAppointments =>{
        this.userHospitalAppointments = userHospitalAppointments;
        this.fetching = false;
      },
      errorModel => {
        //TODO
        this.fetching = false;
      },
      () => {});
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.onAddHospital(result);
    }, (reason) => {

    });
  }

  onAddHospital(addhospitalform){
    console.log(addhospitalform.value);
    console.log(addhospitalform.valid);

    if(!addhospitalform.valid){
      this.snackbar.open('Please provide all mandatory fields','',{duration:2000, panelClass:['red-snackbar']});
      return;
    }
    let data = {
      hospitalId:addhospitalform.value.number,
      hospitalName:addhospitalform.value.name
    };

    let user = this.authenticationService.getUser();

    this.patientService.addHospital(user.id, data)
    .pipe(concatMap(response => this.appointmentsService.createAppointment(user.id)))
    .subscribe(response => {
      this.getUserHospitalAppointments();
    },errorModel => {
    //   if(errorModel.status == ErrorStatus.Unauthorized){
    //     //TODO - nothing
    //   }
    },() => {});
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  deleteAllAppointments(){
    let user = this.authenticationService.getUser();
    this.fetching = true;
    this.appointmentsService.deleteAllAppointmentsForUserId(user.id)
    .subscribe(response => {
        this.getUserHospitalAppointments();
      },
      errorModel => {
        //TODO
        this.fetching = false;
      },
      () => {});
  }

  downloadFile(id) {
    this.appointmentsService.downloadFile(id);
  }

  print(appointment:AppointmentModel){

    var width = 800;
    var height = 800;
    var left = (window.screen.width/2)-(width/2);
    var top = (window.screen.height/2)-(height/2);

    let printContents, popupWin;
    printContents = this.appointmentMockData(appointment);//document.getElementById('print-section').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=2000,width=2000');
    popupWin = window.open('', '_blank', 'width=' + width + ', height=' + height
      + ', left=' + left + ', top=' + top)
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          @page {size: a4; margin: 20mm }
          @media screen { body { margin: 5em }}
          address { white-space: pre; padding: 0 0 1em; font-style: normal }
          aside { float: right; width: 10em }
          footer { float: bottom; text-align: center }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
    return true;
  }



  appointmentMockData(appointment:AppointmentModel){

    return `<p><strong><span style="font-size: 20.0pt; line-height: 107%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Appointment Booked Letter</span></strong></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>S FREDDY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hospital_Number:2345678</p>
<p>1000 Sylvan Avenue,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NHS_NUMBER:7864646969</p>
<p>Timperley</p>
<p>Wa15 6ab&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p>&nbsp;</p>
<p>LETTER_REF_NO: 89713897317</p>
<p>&nbsp;</p>
<p>Dear&nbsp; FREDDY</p>
<p>An appointment has been booked for you on&nbsp; 17/11/2018 09:45 a.m&nbsp; to attend the Outpatient Department.</p>
<p>On arrival, please report to the reception desk where you will be greeted by a member of staff and directed to the required area.</p>
<p>Should you need to change this appointment please contact us at the Appointment Management Centre on 0205645463 to make alternate arrangements.</p>
<p>&nbsp;</p>
<p>Yours Sincerely</p>
<p>Inknlkvnlvn</p>
<p>Gdhfgd Hospital</p>
<p>Hd67n8</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Why not try our express check in facility , Visit one of our Kiosks and follow the instructions on the screen. Your Patient Number is CRN_NUMBER.</p>
<p>&nbsp;</p>`
  }
}

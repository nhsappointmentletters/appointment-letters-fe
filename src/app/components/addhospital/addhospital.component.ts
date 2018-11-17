import {Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../../services/authentication.service";
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";
import {ErrorStatus} from "../../apis/apiErrorStatus";

@Component({
  selector: 'app-addhospital',
  templateUrl: './addhospital.component.html',
  styleUrls: ['./addhospital.component.css']
})
export class AddhospitalComponent implements OnInit {

  constructor(private router:Router, private snackbar:MatSnackBar,
              private patientService:PatientService,
              private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(addhospitalform){
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
    .subscribe(response => {
      this.router.navigate(['/main']);
    }, errorModel => {
      if(errorModel.status == ErrorStatus.Unauthorized){
        //TODO - nothing
      }
    }, () => {});
  }
}

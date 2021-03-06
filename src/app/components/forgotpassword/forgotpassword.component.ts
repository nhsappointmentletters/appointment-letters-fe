import {Component, OnInit} from "@angular/core";
import {PatientService} from "../../services/patient.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  displaySuccess = false;
  disableButton = false;
  constructor(private patientService:PatientService, private snackBar:MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(forgotpasswordform){
    console.log(forgotpasswordform.value);
    console.log(forgotpasswordform.valid);
    if(!forgotpasswordform.valid){
      this.snackBar.open('Please provide username', '', {duration:2000, panelClass:['red-snackbar']});
      return;
    }
    this.disableButton = true;
    this.patientService.resetpassword(forgotpasswordform.value.username)
    .subscribe(response =>{
      this.displaySuccess=true;
    }, error => {
      this.disableButton = false;
      alert(error.message);
    }, () => {});
  }
}

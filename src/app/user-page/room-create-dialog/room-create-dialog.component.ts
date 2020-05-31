import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomCreateDialog} from '../../model/room-create-dialog.model';
import {UserPageService} from '../../services/user-page.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-room-create-dialog',
  templateUrl: './room-create-dialog.component.html',
  styleUrls: ['./room-create-dialog.component.css']
})
export class RoomCreateDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<RoomCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RoomCreateDialog,
              private userPageService: UserPageService,
              public snackBar: MatSnackBar,
              formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.data = new RoomCreateDialog()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createRoom(roomName): void {
    this.userPageService.createNewRoom(roomName)
      .subscribe(
        data => {
          this.dialogRef.close();
        },
        error => {
          console.log(error)
          this.snackBar.open("Error creating room. Try again", '',{
            duration: 10000
          });
        }
      )

  }

}

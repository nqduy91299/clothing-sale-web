import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-order-success',
  templateUrl: './dialog-order-success.component.html',
  styleUrls: ['./dialog-order-success.component.scss'],
})
export class DialogOrderSuccessComponent implements OnInit {
  timeDown: number = 4;
  constructor(public dialogRef: MatDialogRef<DialogOrderSuccessComponent>) {}

  ngOnInit(): void {
    this.autoClose();
  }

  autoClose() {
    setInterval(() => {
      this.countDown();
    }, 1000);
    setTimeout(() => {
      this.closeDialog();
    }, 4000);
  }
  countDown() {
    if (this.timeDown != 0) {
      this.timeDown -= 1;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

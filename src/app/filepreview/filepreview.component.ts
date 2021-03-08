import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog,} from '@angular/material/dialog';
import {Genebank} from '../Genbank';


@Component({
  selector: 'app-filepreview',
  templateUrl: './filepreview.component.html',
  styleUrls: ['./filepreview.component.scss']
})
export class FilepreviewComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<FilepreviewComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

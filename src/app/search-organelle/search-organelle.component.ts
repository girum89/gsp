import { Component, OnInit } from '@angular/core';
import {Organelle} from '../Organelle';
import {OrganelleService} from '../organelle.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-search-organelle',
  templateUrl: './search-organelle.component.html',
  styleUrls: ['./search-organelle.component.scss']
})
export class SearchOrganelleComponent implements OnInit {
  faCoffee = faCoffee;
  organelles: Organelle[];
  searchTerm: string;
  selectedOrganelle: Organelle[]=[];
  
  constructor(private organelleService: OrganelleService,public dialogRef: MatDialogRef<SearchOrganelleComponent>) { }

  ngOnInit(): void {
    this.getOrganelles();
    
  }

  // get organells from the json file
  getOrganelles(){
    this.organelleService.getOrganelle().subscribe(organelles=>this.organelles=organelles);
  }
  
  // add selected organells to the right div
  add(orgnelle: Organelle){
   
    if (!this.selectedOrganelle.includes(orgnelle)){
      this.selectedOrganelle.push(orgnelle);
    }

  }
  remove(orgnelle: Organelle){
    this.selectedOrganelle = this.selectedOrganelle.filter(function(item){return item !==orgnelle})

}
  clear(){
    this.selectedOrganelle = [];
    this.searchTerm="";
  }
 
  onCancel(){
    this.dialogRef.close();
  }
}

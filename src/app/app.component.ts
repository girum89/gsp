import {Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Post } from './Post';
import {Genebank} from './Genbank';
import {FlaskapiService} from './flaskapi.service';
import {SearchOrganelleComponent} from './search-organelle/search-organelle.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router } from '@angular/router';
import {Organelle } from './Organelle';
import {OrganelleNode} from './OrganelleNode';
import { saveAs } from 'file-saver';
import{FilepreviewComponent} from './filepreview/filepreview.component';
import {TreeSearchComponent } from './tree-search/tree-search.component';
import {History} from './History';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //faCoffee = faCoffee;
  title = 'Genome_search_plotter';
  fileName="";
  downfiles="";
  sortedfile="";
  blastfile="";
  plotfile="";
  error = null;  // property to log errors
  sortedtype="text/plain;charset=utf-8"; //sorted result file type
  blastfiletype="text/plain;charset=utf-8"; // blast result file type
  plotfiletype="application/pdf";  // pdf result
  selected:Organelle[] = [] ; // property to hold list of organell from added organelle dialog
  selectedAccession:string[] = []; // property to hold list of accesions from selected to send only accesion as a form data
  resultfiles: any=[];   // property to hold result files fetched from server
  selectedTreeNodes: OrganelleNode[] = []; // property to hold list of selected results from tree search
public inputFile:any = null;   // property to hold upload file
public busy:boolean = false;  // spinner
public waiting:boolean = false; // wait for data spinner full
public resultdisplay: boolean = false;  // result show and hide
  history:boolean = false;
  showhist:boolean=true;
  historyList:History[];
  historySeq: string;
  historySorted:string;
  historyPlot: string;
  onFileChange(event) {
    if (event.target.files[0]!=null){
      this.fileName = event.target.files[0].name;
      this.inputFile = event.target["files"];
      //this.downfiles = event.target.files[0].name.split(".")[0];
      //this.sortedfile=this.downfiles +".sorted";
      //this.blastfile=this.downfiles+".seq";
      //this.plotfile= this.downfiles+".plot.pdf";
      }
    else {
          
    this.fileName="no file selected";
  }
  }

  constructor(public dialog: MatDialog, private flaskApiService:FlaskapiService, private router: Router) {
    this.showHistory();
  }
  
    Accession = new FormControl('',Validators.required)
    Maxb= new FormControl('', Validators.required)
    Ming=new FormControl('', Validators.required)
    Query= new FormControl('',Validators.required)

 
  /// search organelle ref dialog
  addReference(): void {
    const dialogRef = this.dialog.open(SearchOrganelleComponent);
    if (this.selected.length==0){
      dialogRef.afterClosed().subscribe(res=>{
        if(!(res==undefined)){
          this.selected=res;
        }
      });
    }
    else {
    dialogRef.afterClosed().subscribe(res => {
      let mising=res.filter(item=>this.selected.indexOf(item)<0)
      this.selected = this.selected.concat(mising);
      });
    }
  }
  /// search tree
  searchTree(): void {
    const dialogRef = this.dialog.open(TreeSearchComponent,{panelClass: 'mat-dialog-overridee'});
    if (this.selectedTreeNodes.length==0){
      dialogRef.afterClosed().subscribe(res=>{
        if(!(res==undefined)){
          this.selectedTreeNodes=res;
        }
      });
    }
    else {
    dialogRef.afterClosed().subscribe(res => {
      //let mising=res.filter(item=>this.selectedTreeNodes.indexOf(item)<0)
      //this.selectedTreeNodes = this.selectedTreeNodes.concat(mising);
      this.selectedTreeNodes=this.selectedTreeNodes.concat(res.filter(X=>!this.selectedTreeNodes.some(y=>y.accession==X.accession)))
      });
    }
  }

  // file preview dialog
  filePreview(item: Genebank):void{
    const dialogRef = this.dialog.open(FilepreviewComponent,{
      data:{accession:item.accession, file:item.file}
    });
         
  }
  // file preview dialog
  filePreviewforlists(item: string):void{
    this.waiting=true
    let genbankfile=""
    this.flaskApiService.getGenbankFile(item).subscribe(res=>{
      genbankfile=res["data"]
      this.waiting=false
      const dialogRef = this.dialog.open(FilepreviewComponent,{
      
        data:{accession:item, file:genbankfile}
      });
    })
    
         
  }
  
// remove added organelles from list of references
  remove(orgnelle: Organelle){
    this.selected = this.selected.filter(function(item){return item !==orgnelle})
  }
// remove tree search results from list of references
removeTreeNodes(orgnelle: OrganelleNode){
  this.selectedTreeNodes = this.selectedTreeNodes.filter(function(item){return item !==orgnelle})
}
resultClose(){
    this.resultdisplay=false;
  }

removeFromHistory(histitem: History){
    this.historyList = this.historyList.filter(function(item){return item !==histitem})
  }

  /* if selected is null or undefind or zero length return true or if it has
  some value return false.  this is for send button spinner */
 checkSelected(smt:Organelle[], smt2:OrganelleNode[]): boolean{
 
   if(((smt==null || smt==undefined || smt.length== 0) &&
    (smt2 ==null || smt2 == undefined || smt2.length == 0) && !this.Accession.valid)||
    (!this.Maxb.valid || !this.Ming.valid || !this.Query.valid) 
    ){
    
    return true;
   }
   
   else{
   
    return false;
    }
 }
 // from selected organells array get array of accession ( from organelle array to string accession araay) to send as form data
 listofAccessions(smt:Organelle[],  smt2:string[]){
  for (let i=0; i<smt.length; i++){
    smt2.push(smt[i].accession);
 }
 return smt2;
}
// from selected TreeNOdes array get array of accession ( from treeNOdes array to string accession araay) to send as form data
listofTreeAccessions(smt:OrganelleNode[],  smt2:string[]){
  for (let i=0; i<smt.length; i++){
    smt2.push(smt[i].accession);
 }
 return smt2;
}
public addPost(){
  let accessionFromSearch :string[]=[];
  let accessionFromTree: string[]=[];

  this.busy=true;
  this.resultdisplay=false;
  this.error = null;
  accessionFromSearch= this.listofAccessions(this.selected,accessionFromSearch)
  accessionFromTree=this.listofTreeAccessions(this.selectedTreeNodes,accessionFromTree)

  this.selectedAccession=accessionFromTree.concat(accessionFromSearch)
  
  try {
    
  this.flaskApiService.sendPost(this.Accession.value,this.Maxb.value,this.Ming.value, this.inputFile,this.selectedAccession).subscribe(res=>{
    
    if(res["data"]=="No_CDS"){
      alert("Could not find coding sequence for the selected accesion")
      this.router.navigate(["/"]);
      this.busy=false;
    }
    else if(res["data"].split("-")[0]=="No_Plot"){

      alert("Could not get a related gene for plot")
      this.busy=false;
      this.resultdisplay=true;
      this.sortedfile=res["data"].split("-")[1] +".sorted";
      this.blastfile=res["data"].split("-")[1]+".seq";
      this.plotfile=null;
    }
    else {
      this.downfiles =res["data"];
      this.sortedfile=this.downfiles +".sorted";
      this.blastfile=this.downfiles+".seq";
      this.plotfile= this.downfiles+".plot.pdf";
    this.router.navigate(["/"]);
    this.busy=false;
    //this.postForm.reset();
    //this.fileName = "";
    this.selected = [];
    this.selectedAccession=[];
    this.resultdisplay=true;
  }
  }, error =>{this.error=error;
    this.busy=false;
  
  })
} catch (error) {
    this.error="Please provide required the inputs ";
    this.busy=false;

}
  
}
public download (fileName: string, typename:string){
  if(fileName==null){
    alert("There is no plot file")
    return
  }
this.flaskApiService.download(fileName).subscribe(res=>{
  if(res){
   var blob = new Blob([res],{type:typename})
   saveAs(blob,fileName); 
  }
}, err=>{this.error=err});
}

public showHistory(){

  this.flaskApiService.getHistory().subscribe(res=>{
    if(res["data"]!= null){ 
      this.history=true;
    console.log(res)
    this.historyList=res["data"]
    console.log(this.historyList)
    console.log(this.historyList[0].date)
    //console.log(res["data"]["sorted"])
    //this.historySeq=res["data"]["query"]
    //this.historySorted=res["data"]["sorted"]
    //this.historyPlot=res["data"]["plot"]
    //console.log(this.historyPlot)
    }
  })
}
//selectedFileBLOB: any;
public downloadHisory(fileName: string, typename:string){
  this.flaskApiService.download(fileName).subscribe(res=>{
    if(res){
     var blob = new Blob([res],{type:typename})
     //saveAs(blob,fileName);
     let url = window.URL.createObjectURL(blob)
     //this.selectedFileBLOB=this.sanitizer.bypassSecurityTrustUrl(url);
     window.open(url,'_blank');
    
    }
  
  }, err=>{this.error=err});
  }

}

import {NestedTreeControl} from '@angular/cdk/tree'
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {OrganelleNode} from '../OrganelleNode';
import {FlaskapiService} from '../flaskapi.service';

@Component({
  selector: 'app-tree-search',
  templateUrl: './tree-search.component.html',
  styleUrls: ['./tree-search.component.scss']
})
export class TreeSearchComponent implements OnInit {
  treeData: OrganelleNode[] =[];
  dbSearchTerm = new FormControl("", Validators.required);
  selectedNodes: OrganelleNode[] = [];
  texVal:string; 
  mising:OrganelleNode[]=[];
  fetchingData: boolean=false;
  error=null;
  kingdom: string[]=["Animals","Fungi","Other","Plants","Protists"];
  family: string[]=["Amphibians","Birds","Fishes","Flatworms","Insects","Mammals","Other Animals","Reptiles","Roundworms","Ascomycetes","Basidiomycetes","Other Fungi","Other",	"Green Algae","Land Plants","Other Plants","Apicomplexans","Kinetoplasts","Other Protists"]
  
  constructor(public dialogRef: MatDialogRef<TreeSearchComponent>, public flaskService:FlaskapiService) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '90%');
  }

treeControl = new NestedTreeControl<OrganelleNode>(node=>node.children);

dataSource = new MatTreeNestedDataSource<OrganelleNode>();

hasChild=(_:number, node: OrganelleNode)=>!!node.children && node.children.length>0; 
 
 searchOrganelle(){
   this.fetchingData=true;
   this.flaskService.searchTreeData(this.dbSearchTerm.value).subscribe(result=>{
   this.texVal = this.dbSearchTerm.value;
    //console.log(result["data"])
    //console.log(this.texVal)
    //console.log(result["data"][0]["name"])
    if(result["data"]==null){
      alert("Could not find an organelle with that name")
      this.dataSource.data=[];
      this.fetchingData=false;
    }
    else{
    this.treeData=JSON.parse(result["data"]);
    //console.log(this.treeData[0].children[0].children)
    //console.log(this.treeData);
    this.dataSource.data=this.treeData;
    this.fetchingData=false;
   }
  }, error=>{
    this.error=error;
    this.fetchingData=false;
    alert(this.error)
  }); 
  
 }

 enterKeyPress(event:any){
  this.searchOrganelle();
 }

 addNodefromTree(orgNode: OrganelleNode){
  //let mising=orgNode.filter(item=>this.selectedNodes.indexOf(item)<0)
  //this.selectedNodes.concat(orgNode)
  if(!this.selectedNodes.includes(orgNode)){
  this.selectedNodes.push(orgNode);
  }
  //console.log(this.texVal)
 }

  removeNode(orgNode:OrganelleNode){
    this.selectedNodes = this.selectedNodes.filter(function(item){return item !==orgNode})
  }

  clear() {
    this.selectedNodes=[];
  }
  onCancel(){
    this.dialogRef.close();
  }
  addFromHigherParent(name:string){
    this.fetchingData=true;
    let query: string;
   //console.log(this.selectedNodes)
   
    if(name=="Eukaryota"){
      query="select organismName, accession, type from organelle where organismName like '%"+this.texVal+"%' and supergroup = 'Eukaryota'";
      //console.log(query);
    }
    else if(this.kingdom.includes(name)){
      query="select organismName, accession, type from organelle where organismName like '%"+this.texVal+"%' and kingdom = '"+name+"'"; 
    }
    else if(this.family.includes(name)){
      query="select organismName, accession, type from organelle where organismName like '%"+this.texVal+"%' and family = '"+name+"'"; 
    }
    else {
      query="select organismName, accession, type from organelle where genus = '"+name+"'"; 
    }

    this.flaskService.addHigherParentNodes(query).subscribe(res=>{
    //console.log(res)
    //console.log(res["data"])
    //console.log(typeof(res["data"]))
    this.mising=JSON.parse(res["data"])
    
    //console.log(this.mising)
    
    //let addtionalNodes=this.mising.filter((item)=>this.selectedNodes.indexOf(item)<0)
    //let mising=addtionalNodes.filter(item=>this.selectedNodes.indexOf(item)<0)
    //this.selectedNodes=this.selectedNodes.concat(addtionalNodes);
    //console.log(this.selectedNodes[0]==this.mising[0])
    this.selectedNodes=this.selectedNodes.concat(this.mising.filter(X=>!this.selectedNodes.some(y=>y.name==X.name)))
    this.fetchingData=false;
  }, error=>{
    this.error=error;
    this.fetchingData=false;
    alert("Apologies !! Something went wrong.")
  });
    
   
  }
}

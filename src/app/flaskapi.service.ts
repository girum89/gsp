import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Post} from './Post';
import{Genebank} from './Genbank';
import{OrganelleNode} from './OrganelleNode'
import {Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { __param } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class FlaskapiService {
 //public serverResult: string ="http://ds.mju.ac.kr/gspapi/api";
 public serverResult: string ="http://localhost:5000/api";
 //public serverDownloadResult: string ="http://ds.mju.ac.kr/gspapi/uploads/";
 public serverDownloadResult: string ="http://localhost:5000/uploads/";
 //public serverSearchNCBI: string ="http://ds.mju.ac.kr/gspapi/checkAccession";
 public serverSearchNCBI: string ="http://localhost:5000/checkAcc";
 //public serverSearchTree: string= "http://ds.mju.ac.kr/gspapi/searchTree/";
 public serverSearchTree: string= "http://localhost:5000/searchTree/";
 //public serverAddHigherNodes:string ="http://ds.mju.ac.kr/gspapi/addHigher";
 public serverAddHigherNodes:string ="http://localhost:5000/addHigher";
 //public serverFetchGenbankFile:string ="http://ds.mju.ac.kr/gspapi/genbank/";
 public serverFetchGenbankFile:string ="http://localhost:5000/genbank/";
 //public serverGetHistory:string ="http://ds.mju.ac.kr/gspapi/history";
 public serverGetHistory:string ="http://localhost:5000/history";

 searchRes: any;
 loading: boolean;
 dbresult: OrganelleNode[];
 a:string;
constructor(private httpClient: HttpClient) { 
  this.searchRes=[];
  this.loading=false;
}

  public sendPost(acc:string, maxb:string, ming:string, file:File, selectedL:String[]){ 
    const formData: FormData = new FormData();

    formData.append("accession", acc);
    formData.append("maxb", maxb);
    formData.append("ming", ming);
    formData.append("query", file[0], file["filename"]);
    formData.append("selectedAcc", JSON.stringify(selectedL))

    return this.httpClient.post<Post>(this.serverResult, formData).pipe(catchError(this.handleError))

  }

 /*public referenceSearchNCBI (searchT: string, accession: boolean){
    
    const formData: FormData = new FormData();
    formData.append("searchTerm", searchT);
    formData.append("accSearch", accession.toString());
    return this.httpClient.post<Genebank>(this.serverSearchNCBI, formData).pipe(catchError(this.handleError))
   
  }
  */

  public searchTreeData(dbSearchTerm: string){
    //this.a='[{"name":"Eukaryota","children":[{"name":"Animals","children":[{"name":"Fishes","children":[{"name":"Carassius","children":[{"name":"Carassius carassius","accession":"NC_006291.1","type":"mitochondrion"}]}]}]}]}]'
    
    return this.httpClient.get(this.serverSearchTree+dbSearchTerm).pipe(catchError(this.handleError));
  }
  public getGenbankFile(accession:string){

    return this.httpClient.get(this.serverFetchGenbankFile+accession).pipe(catchError(this.handleError));
  }

  public addHigherParentNodes(query:string){
    const formData: FormData = new FormData();
    formData.append("query", query);
    return this.httpClient.post(this.serverAddHigherNodes,formData).pipe(catchError(this.handleError))
  }

  download(filename:string): Observable<Blob>{
    return this.httpClient.get(this.serverDownloadResult+filename, {responseType: 'blob'}).pipe(catchError(this.handleError))
  }
  private handleError(err:HttpErrorResponse){
    return throwError(`Something went wrong: ${err.message}`);
  }

  public getHistory(){
    return this.httpClient.get(this.serverGetHistory)
  }


}

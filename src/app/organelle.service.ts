import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Organelle} from './Organelle';
import {ORGANELLS} from './OrganelleList';
import {Observable, of} from 'rxjs';
import {catchError, map, tap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class OrganelleService {

  // private organelleUrl= 'http://localhost/dashboard/api2/list.php';

  constructor(  ){ }
  
  // get the organells from url or from json file in stored here

  getOrganelle(): Observable<Organelle[]>{
    //return this.http.get<Organelle[]>(this.organelleUrl).pipe(tap(_=>this.log('fetched organelle')),catchError(this.handleError<Organelle[]>('getOrganelle', [])));
      return of(ORGANELLS);
  }
}
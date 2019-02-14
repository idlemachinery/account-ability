import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Contract } from 'src/app/shared/interfaces';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private contractsUrl = '/api/contracts';

  constructor(private http: HttpClient,
              private logger: LoggerService) { }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.contractsUrl)
      .pipe(
        tap(data => this.logger.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // for consideration:
  // the server should be able to give you total number of entries
  // AND perfTarget totals as well.
  getContractsPaged(currPage: number, pageSize: number): Observable<Contract[]> {
    const url = `${this.contractsUrl}?_page=${currPage}&_limit=${pageSize}`;
    return this.http.get<Contract[]>(url)
      .pipe(
        tap(data => this.logger.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getContract(id: number): Observable<Contract> {
    if (id === 0) {
      return of(this.initializeContract());
    }
    const url = `${this.contractsUrl}/${id}`;
    return this.http.get<Contract>(url)
      .pipe(
        tap(data => this.logger.log('getContract: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.contractsUrl, contract)
      .pipe(
        tap(data => this.logger.log('createContract: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateContract(contract: Contract): Observable<Contract> {
    const url = `${this.contractsUrl}/${contract.id}`;
    return this.http.put<Contract>(url, contract)
      .pipe(
        tap(() => this.logger.log('updateContract: ' + contract.id)),
        map(() => contract),
        catchError(this.handleError)
      );
  }

  saveContract(contract: Contract): Observable<Contract> {
    if (contract.id) {
      return this.updateContract(contract);
    } else {
      return this.createContract(contract);
    }
  }

  deleteContract(id: number): Observable<{}> {
    const url = `${this.contractsUrl}/${id}`;
    return this.http.delete<Contract>(url)
      .pipe(
        tap(data => this.logger.log('deleteContract: ' + id)),
        catchError(this.handleError)
      );
  }

  initializeContract(): Contract {
    return {
      id: 0,
      taskName: '',
      owner: '',
      createdDateTime: new Date(),
      expectedDate: null,
      expectedTime: null,
      closedDate: null,
      closedTime: null,
      status: 'ongoing',
      define: '',
      expectations: '',
      actions: '',
      timeline: '',
      stakes: '',
      renegotiation: '',
      quality: 0,
      lessons: ''
    };
  }

  getImages(): any[] {
    return [
      {
        src: 'assets/images/sun-1.jpg',
        title: 'The price of greatness is responsibility.',
        subtitle: 'Winston Churchill'
      },
      {
        src: 'assets/images/nature-1.jpg',
        title: 'I do the very best I know how - the very best I can; and I mean to keep on doing so until the end.',
        subtitle: 'Abraham Lincoln'
      },
      {
        src: 'assets/images/inspiration-1.jpg',
        title: 'You can awaken each day to obligations you never chose — or you can decide now to choose them.',
        subtitle: 'Robert Brault'
      }
    ];
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
        return throwError(errMessage);
        // Use the following instead if using lite-server
        // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(error || 'backend server error');
}
}

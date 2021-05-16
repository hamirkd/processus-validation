import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Direction } from 'app/models/direction';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  constructor(private _httpClient: HttpClient, private router: Router
  ) {
    this.onDirectionsChanged = new BehaviorSubject([]);
  }
  onDirectionsChanged: BehaviorSubject<any>;
  directions: Direction[] = []
  getDirections(): Promise<any> {
    return new Promise((resolve, reject) => {

      this._httpClient.get(environment.addressIp + '/api/directions')
        .subscribe((response: any) => {

          this.directions = response;


          this.directions = this.directions.map(user => {
            return new Direction(user);
          });

          this.onDirectionsChanged.next(this.directions);
          resolve(this.directions);
        }, reject => {
          this.directions = [];
        });
    }
    );
  }
}

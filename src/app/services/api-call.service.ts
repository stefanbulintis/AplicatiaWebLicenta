import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  
  constructor(private _http: HttpClient) { }

  getData() {
    return this._http.get('https://api.thingspeak.com/channels/2135238/feeds.json?api_key=VXQLFXSB9OVOTTAW&results=2')
  }

  openDoor() {
    const url = 'https://api.thingspeak.com/update';
    const apiKey = 'JT80L540KZQP3XG5';
    let fieldValue = '3'; // Valoarea inițială pentru a deschide ușa
  
    const params = {
      api_key: apiKey,
      field2: fieldValue
    };
  
    this._http.post(url, params).subscribe(
      (response) => {
        console.log('Cererea de POST a fost trimisă cu succes', response);
        console.log("Ușa se va deschide în curând!");
  
        // După 7 secunde, modifică valoarea fieldValue la 4
        setTimeout(() => {
          fieldValue = '4';
          params.field2 = fieldValue;
  
          // Trimite o nouă cerere de POST cu valoarea actualizată
          this._http.post(url, params).subscribe(
            (response) => {
              console.log('Cererea de POST pentru valoarea 4 a fost trimisă cu succes', response);
              console.log("Ușa se va deschide complet!");
            },
            (error) => {
              console.log('Eroare în timpul cererii de POST pentru valoarea 4', error);
              console.log("Ușa nu se poate deschide complet!");
            }
          );
        }, 15000);
      },
      (error) => {
        console.log('Eroare în timpul cererii de POST', error);
        console.log("Ușa nu se poate deschide!");
      }
    );
  }
}

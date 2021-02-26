import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }

  GetPersons(){
    return this.http.get("https://localhost:44382/api/Persona");
  }
  DeletePerson(id:number){
    return this.http.delete("https://localhost:44382/api/Persona/"+id)
  }
  Update(person){
    return this.http.put("https://localhost:44382/api/Persona",person)
  } 
  Insert(person){
    return this.http.post("https://localhost:44382/api/Persona",person);
  }
}

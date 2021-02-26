import { PersonService } from './../services/person.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  
  modalRef: BsModalRef;
  public persons=[];
  currentObject:any;
  public userForm:FormGroup;

  constructor(private person:PersonService,private modalService: BsModalService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userForm=this.formBuilder.group({
      nombre: ['',[Validators.required,Validators.maxLength(50)]],
      apellido: ['',[Validators.required,Validators.maxLength(50)]],
      fechaNacimiento: ['',[Validators.required]],
      pasaporte: ['',[Validators.required,Validators.pattern("[0-9]{9}")]],
      direccion: ['',[Validators.required]],
      sexo: ['',[Validators.required]]
    })
    this.GetPersons()
  }
  GetPersons(){
    
    this.person.GetPersons().subscribe(data=>{
      console.log(data);
      this.persons=data as any[];
    },
    err=>{
      console.log(err);      
    })
  }
  SaveChanges(){
    if(this.Validations()){      
      this.modalRef.hide();
      let person={
        nombre: this.userForm.value.nombre,
        apellido:this.userForm.value.apellido,
        fechaNacimiento: this.userForm.value.fechaNacimiento,
        pasaporte: this.userForm.value.pasaporte,
        direccion: this.userForm.value.direccion,
        sexo: this.userForm.value.sexo,      
      }
      this.person.Insert(person).subscribe(data=>{
        console.log(data);
        this.GetPersons();
      },err=>{
        console.log(err);
        
      })
      
    }
  }
  SaveChangesUpdate(){
    if(this.Validations()){      
      this.modalRef.hide();
      let person={
        id:this.currentObject,
        nombre: this.userForm.value.nombre,
        apellido:this.userForm.value.apellido,
        fechaNacimiento: this.userForm.value.fechaNacimiento,
        pasaporte: this.userForm.value.pasaporte,
        direccion: this.userForm.value.direccion,
        sexo: this.userForm.value.sexo,      
      }
      this.person.Update(person).subscribe(data=>{
        console.log(data);
        this.GetPersons();
      },err=>{
        console.log(err);
        
      })
      
    }
  }
  private Validations(): boolean{
    // if (this.loginForm.controls.email.errors) {
    //   if (this.loginForm.controls.email.errors.required) {
    //     // this.OpenModal();
    //   }else if (this.loginForm.controls.email.errors.email) {
    //     // this.OpenModal();
    //   }
    //   return false;
    // }else if (this.loginForm.controls.password.errors) {
    //   if (this.loginForm.controls.password.errors.required) {
    //     // this.OpenModal();
    //   }
    //   return false;
    // }
    return true;
  }
  private Delete(id:number){
    this.person.DeletePerson(id).subscribe(data=>{
      console.log(data);
      this.GetPersons();
    },err=>
    {
      console.log(err);      
    }
    )    
  }
  Update(){
    let params={}
    this.person.Update(params).subscribe(data=>{
      console.log(data);      
    },
    err=>{
      console.log(err);      
    });
  }
  
  openModal(template: TemplateRef<any>,currentObject:any) {
    this.modalRef = this.modalService.show(template);
    this.currentObject=currentObject;
    this.currentObject.fechaNacimiento= new Date(this.currentObject.fechaNacimiento).toDateString();
    this.userForm.controls["nombre"].setValue(currentObject.nombre);
    this.userForm.controls["apellido"].setValue(currentObject.apellido);
    this.userForm.controls["fechaNacimiento"].setValue(new Date(currentObject.fechaNacimiento).toLocaleDateString());
    this.userForm.controls["pasaporte"].setValue(currentObject.pasaporte);
    this.userForm.controls["direccion"].setValue(currentObject.direccion);
    this.userForm.controls["sexo"].setValue(currentObject.sexo=="Masculino"?"M":"F");
  }

  confirm(): void {
    this.Delete(this.currentObject.id);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AulasService } from '../service/aulas';
import ErrorResponseModel from '../models/error-response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aulas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './aulas.html',
  standalone: true,
  styleUrl: './aulas.css'
})
export class Aulas implements OnInit{

  public formAulas:FormGroup;
  public aulasList: any[] = [];

  constructor(private readonly fb: FormBuilder, private readonly aulas:AulasService) {
    this.formAulas = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
    console.log('*****')
  }

  registrar(){
    if(!this.formAulas.valid) return false;
    this.aulas.guardarAulas(this.formAulas.getRawValue()).subscribe({
      next: (response:any)=>{
        console.log(response);
        this.formAulas.controls['nombre'].setValue('');
        this.formAulas.controls['codigo'].setValue('');
      },
      error: (e:any) => {
        const errorResponse = e.error as ErrorResponseModel;
        console.info("MESSAGE: ", errorResponse.message);
        console.info("CODE: ", errorResponse.errorCode);
        Swal.fire(
          {
            icon: 'warning',
            title: errorResponse.errorCode !== null ? errorResponse.errorCode : 'Codigo por defecto',
            text: errorResponse.message !== null ? errorResponse.message : 'Mensaje por defecto',
        }
      );
      this.formAulas.controls['codigo'].setValue('');
      }
    })
    return true;
  }

  listar(){
    this.aulas.obtenerAulas().subscribe({
      next: (response) => {
        console.log(response);
        this.aulasList = response;
      },
      error: (e:any) => {
        console.error(e);
      }
    })
  }
}

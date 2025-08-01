import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { EstudianteService } from '../service/estudiantes';
import { compileDeferResolverFunction } from '@angular/compiler';

@Component({
  selector: 'app-estudiantes',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class estudiantes implements OnInit{

  public formEstudiante:FormGroup;
  public formEstudianteEditar:FormGroup;

  estudiantes:any;
  estudianteEditar = {
    apellido: "",
    carrera: "",
    correo: "",
    habilitado: 0,
    id: 0,
    nombre: ""
  };

  constructor(private readonly fb: FormBuilder, private readonly estudianteService:EstudianteService) {
    this.formEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      carrera: ['', Validators.required],
      habilitado: ['', Validators.required],
    });
    this.formEstudianteEditar = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      carrera: ['', Validators.required],
      habilitado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('*****')
    this.listar();
  }

  registrar(){
    if(!this.formEstudiante.valid) return false;
    this.estudianteService.guardarEstudiantes(this.formEstudiante.getRawValue()).subscribe({
      next: (response:any) => {
        console.log(response);
        this.formEstudiante.reset();
        this.listar();
      },
      error: (e:any) =>{
        console.error(e);
      }
    })
    return true;
  }

  listar(){
    this.estudianteService.obtenerEstudiantes().subscribe({
      next: (response:any) => {
        console.log(response);
        this.estudiantes = response;
      },
      error: (e:any) => {
        console.error(e);
      }
    })
  }

  modalEditar(e:any){
    this.estudianteEditar = e;  
    this.formEstudianteEditar.controls['nombre'].setValue(this.estudianteEditar.nombre);
    this.formEstudianteEditar.controls['apellido'].setValue(this.estudianteEditar.apellido);
    this.formEstudianteEditar.controls['correo'].setValue(this.estudianteEditar.correo);
    this.formEstudianteEditar.controls['carrera'].setValue(this.estudianteEditar.carrera);
    this.formEstudianteEditar.controls['habilitado'].setValue(this.estudianteEditar.habilitado);
  }

  editar(){
    this.estudianteService.editarEstudiantes(this.formEstudianteEditar.getRawValue(), this.estudianteEditar.id).subscribe({
      next: (response:any) => {
        console.log(response);
        this.listar();
      },
      error: (e:any) => {
        console.error(e);
      }
    })
  }


}

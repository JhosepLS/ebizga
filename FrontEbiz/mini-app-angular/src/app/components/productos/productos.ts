import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [FormsModule, CommonModule],  // <- Agregar imports
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productoSeleccionado: any = null;
  
  nuevoProducto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.dataService.getProductos().subscribe(
      data => {
        this.productos = data;
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  verDetalles(producto: any): void {
    this.productoSeleccionado = producto;
  }

  agregarProducto(): void {
    if (this.nuevoProducto.nombre && this.nuevoProducto.precio && this.nuevoProducto.descripcion) {
      const id = Math.max(...this.productos.map(p => p.id)) + 1;
      const producto = {
        id: id,
        nombre: this.nuevoProducto.nombre,
        precio: this.nuevoProducto.precio,
        descripcion: this.nuevoProducto.descripcion,
        imagen: this.nuevoProducto.imagen || 'https://via.placeholder.com/200'
      };
      
      this.productos.push(producto);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.nuevoProducto = {
      nombre: '',
      precio: 0,
      descripcion: '',
      imagen: ''
    };
  }
}
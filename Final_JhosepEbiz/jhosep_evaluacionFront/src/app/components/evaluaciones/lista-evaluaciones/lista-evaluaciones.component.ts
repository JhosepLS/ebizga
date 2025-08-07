import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { AuthService } from '../../../services/auth.service';
import { Evaluacion } from '../../../models/evaluacion.model';
import { Usuario } from '../../../models/usuario.model';
import { EstadoEvaluacionPipe } from '../../../pipes/estado-evaluacion.pipe';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-evaluaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, EstadoEvaluacionPipe],
  templateUrl: './lista-evaluaciones.component.html'
})
export class ListaEvaluacionesComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasFirma') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  
  evaluaciones: Evaluacion[] = [];
  currentUser: Usuario | null = null;
  evaluacionParaFirmar: Evaluacion | null = null;
  evaluacionSeleccionada: Evaluacion | null = null;
  
  // Variables para controlar el modo de firma
  modoFirma: 'ninguno' | 'imagen' | 'dibujo' = 'ninguno';
  
  // Variables para el canvas
  isDrawing = false;
  colorTrazo = '#000000';
  grosorTrazo = 3;
  
  // Variables para la imagen
  firmaImagenSubida: string = '';

  constructor(
    private evaluacionService: EvaluacionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.cargarEvaluaciones();
  }

  ngAfterViewInit() {
    // Inicializar canvas después de que la vista esté lista
    setTimeout(() => {
      this.inicializarCanvas();
    }, 200);
  }

  inicializarCanvas() {
    if (this.canvasRef?.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d')!;
      ctx.lineWidth = this.grosorTrazo;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this.colorTrazo;
      // Fondo blanco para el canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  cargarEvaluaciones() {
    this.evaluacionService.obtenerEvaluaciones().subscribe({
      next: (response) => {
        this.evaluaciones = response.data;
      },
      error: (error) => {
        console.error('Error al cargar evaluaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las evaluaciones', 'error');
      }
    });
  }

  puedeCompletar(evaluacion: Evaluacion): boolean {
    return this.currentUser?.id === evaluacion.evaluador.id;
  }

  puedeFirmar(evaluacion: Evaluacion): boolean {
    return this.currentUser?.id === evaluacion.evaluado.id;
  }

  abrirModalFirma(evaluacion: Evaluacion) {
    this.evaluacionParaFirmar = evaluacion;
    this.resetearFirma();
    
    const modalElement = document.getElementById('firmaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      
      // Inicializar canvas después de mostrar el modal
      setTimeout(() => {
        this.inicializarCanvas();
      }, 500);
    }
  }

  verDetalleEvaluacion(evaluacion: Evaluacion) {
    this.evaluacionSeleccionada = evaluacion;
    const modalElement = document.getElementById('verFirmaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Métodos para controlar el modo de firma
  seleccionarModoImagen() {
    this.modoFirma = 'imagen';
    this.limpiarCanvas();
    // Focus en el input file
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.click();
    }
  }

  seleccionarModoDibujo() {
    this.modoFirma = 'dibujo';
    this.firmaImagenSubida = '';
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
    setTimeout(() => {
      this.inicializarCanvas();
    }, 100);
  }

  resetearFirma() {
    this.modoFirma = 'ninguno';
    this.firmaImagenSubida = '';
    this.limpiarCanvas();
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  // Métodos para subir imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB máximo
        Swal.fire('Error', 'La imagen es muy grande. Máximo 5MB.', 'error');
        this.resetearFirma();
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.firmaImagenSubida = reader.result as string;
        this.modoFirma = 'imagen';
      };
      reader.readAsDataURL(file);
    }
  }

  // Métodos para dibujar en canvas
  startDrawing(event: MouseEvent | TouchEvent) {
    if (this.modoFirma !== 'dibujo') return;
    
    this.isDrawing = true;
    
    if (!this.canvasRef?.nativeElement) return;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
      event.preventDefault();
    }
    
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing || this.modoFirma !== 'dibujo') return;
    
    if (!this.canvasRef?.nativeElement) return;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
      event.preventDefault();
    }
    
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  limpiarCanvas() {
    if (this.canvasRef?.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Fondo blanco
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Restaurar propiedades
      ctx.lineWidth = this.grosorTrazo;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this.colorTrazo;
    }
  }

  cambiarColorTrazo() {
    const colores = ['#000000', '#0000FF', '#FF0000', '#008000', '#800080'];
    const indiceActual = colores.indexOf(this.colorTrazo);
    this.colorTrazo = colores[(indiceActual + 1) % colores.length];
    
    if (this.canvasRef?.nativeElement) {
      const ctx = this.canvasRef.nativeElement.getContext('2d')!;
      ctx.strokeStyle = this.colorTrazo;
    }
  }

  tieneFirmaEnCanvas(): boolean {
    if (!this.canvasRef?.nativeElement) return false;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Verificar si hay píxeles que no sean blancos (255,255,255,255)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];
      
      // Si encuentra un pixel que no es blanco y tiene alpha > 0
      if (a > 0 && (r !== 255 || g !== 255 || b !== 255)) {
        return true;
      }
    }
    return false;
  }

  puedeConfirmarFirma(): boolean {
    return (this.modoFirma === 'imagen' && !!this.firmaImagenSubida) ||
           (this.modoFirma === 'dibujo' && this.tieneFirmaEnCanvas());
  }

  confirmarFirma() {
    let firmaData = '';
    
    if (this.modoFirma === 'imagen' && this.firmaImagenSubida) {
      firmaData = this.firmaImagenSubida;
    } else if (this.modoFirma === 'dibujo' && this.tieneFirmaEnCanvas()) {
      const canvas = this.canvasRef.nativeElement;
     firmaData = canvas.toDataURL('image/jpeg', 0.3);
    }

    if (!firmaData) {
      Swal.fire('Error', 'Debe seleccionar una opción de firma y completarla', 'error');
      return;
    }

    if (this.evaluacionParaFirmar) {
      // Mostrar loading
      Swal.fire({
        title: 'Procesando firma...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.evaluacionService.firmarEvaluacion(this.evaluacionParaFirmar.id, firmaData).subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Evaluación firmada correctamente', 'success');
          this.cargarEvaluaciones();
          
          // Cerrar modal
          const modalElement = document.getElementById('firmaModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
          }
          
          this.resetearFirma();
        },
        error: (error) => {
          console.error('Error completo al firmar:', error);
          let errorMessage = 'No se pudo firmar la evaluación';
          
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          
          Swal.fire('Error', errorMessage, 'error');
        }
      });
    }
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionService.eliminarEvaluacion(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La evaluación ha sido eliminada', 'success');
            this.cargarEvaluaciones();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la evaluación', 'error');
          }
        });
      }
    });
  }
}
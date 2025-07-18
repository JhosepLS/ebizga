package org.ebiz.msestudiantescmd.service;

import org.ebiz.msestudiantescmd.model.Aula;
import org.ebiz.msestudiantescmd.model.Estudiante;

import java.util.List;

public interface EstudianteServiceInterface {
    Estudiante guardar(Estudiante estudiante);
    List<Estudiante> listar();
    Estudiante obtenerPorId(Long id);
    Estudiante actualizar(Long id, Estudiante estudiante);
    void eliminar(Long id);
    void cambiarEstado(Long id, boolean habilitado);

    Aula guardarAula(Aula aula);
    Aula agregarEstudianteAula(Long idAula, Long idEstudiante);
    List<Aula> listarAulas();
}

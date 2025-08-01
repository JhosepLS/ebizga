package org.ebiz.msestudiantescmd.service.impl;

import org.ebiz.msestudiantescmd.model.Aula;
import org.ebiz.msestudiantescmd.model.Estudiante;
import org.ebiz.msestudiantescmd.repository.AulaJpaRepository;
import org.ebiz.msestudiantescmd.repository.EstudianteJpaRepository;
import org.ebiz.msestudiantescmd.service.EstudianteServiceInterface;
import org.ebiz.msestudiantescmd.service.exception.BusinessException;
import org.ebiz.msestudiantescmd.service.exception.ErrorCodeEnum;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImpl implements EstudianteServiceInterface {

    private EstudianteJpaRepository repo;
    private AulaJpaRepository aulaRepo;

    public EstudianteServiceImpl(
            EstudianteJpaRepository estudianteJpaRepository,
            AulaJpaRepository aulaRepo
    ) {
        this.repo = estudianteJpaRepository;
        this.aulaRepo = aulaRepo;
    }

    @Override
    public Estudiante guardar(Estudiante estudiante) {

        Optional<Estudiante> existePorNombreApellido = repo.findByNombreAndApellido(
                estudiante.getNombre(),
                estudiante.getApellido()
        );
        if (existePorNombreApellido.isPresent()) {
            throw new RuntimeException("Nombre y Apellido ya se encuentran registrados");
        }

        Optional<Estudiante> existePorCorreo = repo.findByCorreo(estudiante.getCorreo());
        if (existePorCorreo.isPresent()) {
            throw new RuntimeException("Correo ya se encuentra registrado");
        }

        estudiante.setHabilitado(1);
        return repo.save(estudiante);
    }

    @Override
    public List<Estudiante> listar() {
        return repo.findAllByHabilitado(1);
    }

    @Override
    public Estudiante obtenerPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Estudiante actualizar(Long id, Estudiante estudiante) {
        Estudiante entidadActual = repo.findById(id).orElse(null);
        if (entidadActual == null) {
            throw new RuntimeException("Estudiante no encontrado");
        }
        entidadActual.setNombre(estudiante.getNombre());
        entidadActual.setApellido(estudiante.getApellido());
        entidadActual.setCorreo(estudiante.getCorreo());
        entidadActual.setCarrera(estudiante.getCarrera());
        return repo.save(entidadActual);
    }

    @Override
    public void eliminar(Long id) {
        Estudiante entidadActual = repo.findById(id).orElse(null);
        if (entidadActual == null) {
            throw new RuntimeException("Estudiante no encontrado");
        }
        entidadActual.setHabilitado(0);
        repo.save(entidadActual);
    }

    @Override
    public void cambiarEstado(Long id, boolean habilitado) {
        Estudiante estudiante = repo.findById(id).orElse(null);
        if (estudiante == null) {
            throw new RuntimeException("Estudiante no encontrado");
        }
        estudiante.setHabilitado(habilitado ? 1 : 0);
        repo.save(estudiante);
    }

    @Override
    public Aula guardarAula(Aula aula) {
        Optional<Aula> aulaExistePorCodigo = aulaRepo.findByCodigo(aula.getCodigo());
        if (aulaExistePorCodigo.isPresent()) {
            throw new BusinessException(ErrorCodeEnum.AULA_CODIGO_EN_USO);
        }
        return aulaRepo.save(aula);
    }

    @Override
    public Aula agregarEstudianteAula(Long idAula, Long idEstudiante) {
        Optional<Aula> aulaOptional = aulaRepo.findById(idAula);
        if (aulaOptional.isEmpty()) {
            throw new RuntimeException("Aula no encontrada");
        }

        Optional<Estudiante> estudianteOptional = repo.findById(idEstudiante);
        if (estudianteOptional.isEmpty()) {
            throw new RuntimeException("Estudiante no encontrado");
        }

        Aula aula = aulaOptional.get();
        Estudiante estudiante = estudianteOptional.get();

        aula.getEstudiantes().add(estudiante);
        estudiante.setAula(aula);

        repo.save(estudiante);
        return aulaRepo.save(aula);
    }

    @Override
    public List<Aula> listarAulas() {
        return aulaRepo.findAll();
    }
}

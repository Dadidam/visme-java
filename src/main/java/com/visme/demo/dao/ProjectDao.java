package com.visme.demo.dao;

import com.visme.demo.model.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectDao {
    Project insertProject(UUID id, Project project);

    default Project insertProject(Project project) {
        UUID id = UUID.randomUUID();
        return insertProject(id, project);
    }

    List<Project> selectAllUserProjects(UUID userId);

    List<Project> selectAllProjects();

    Optional<Project> selectProjectById(UUID id);

    int removeProjectById(UUID id);

    int toggleProjectType(UUID id, Project project);

    int updateProjectById(UUID id, Project project);
}

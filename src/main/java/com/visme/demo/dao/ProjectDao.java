package com.visme.demo.dao;

import com.visme.demo.model.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectDao {
    int insertProject(UUID id, Project project);

    default int insertProject(Project project) {
        UUID id = UUID.randomUUID();
        return insertProject(id, project);
    }

    List<Project> selectAllUserProjects(UUID userId);

    Optional<Project> selectProjectById(UUID id);

    int removeProjectById(UUID id);

    int toggleProjectType(UUID id, Project project);

    int updateProjectById(UUID id, Project project);
}

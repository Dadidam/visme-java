package com.visme.demo.dao;

import com.visme.demo.model.Project;

import java.util.List;
import java.util.UUID;

public interface ProjectDao {
    Project insertProject(UUID id, Project project);

    default Project insertProject(Project project) {
        UUID id = UUID.randomUUID();
        return insertProject(id, project);
    }

    List<Project> selectAllUserProjects(UUID userId);

    List<Project> selectAllProjects(Boolean type, int start, int size);

    List<Project> selectAllProjects(Boolean type);

    Project selectProjectById(UUID id);

    void removeProjectById(UUID id);

    Project toggleProjectType(UUID id);

    Project updateProjectById(UUID id, Project project);

    Boolean doesProjectExist(Project project);
}

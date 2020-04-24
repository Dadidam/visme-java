package com.visme.demo.service;

import com.visme.demo.dao.ProjectDao;
import com.visme.demo.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectDao projectDao;

    @Autowired
    public ProjectService(@Qualifier("localProjectDao") ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    public Project addProject(Project project) {
        return projectDao.insertProject(project);
    }

    public List<Project> fetchUserProjects(UUID userId) {
        return projectDao.selectAllUserProjects(userId);
    }

    public List<Project> fetchProjectList() {
        return projectDao.selectAllProjects();
    }

    public Optional<Project> getProjectById(UUID id) {
        return projectDao.selectProjectById(id);
    }

    public int deleteProject(UUID id) {
        return projectDao.removeProjectById(id);
    }

    public int updateProjectInfo(UUID id, Project updatedInfo) {
        return projectDao.updateProjectById(id, updatedInfo);
    }

    public int toggleProjectType(UUID id, Project project) {
        return projectDao.toggleProjectType(id, project);
    }
}

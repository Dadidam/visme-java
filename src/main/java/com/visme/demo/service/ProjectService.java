package com.visme.demo.service;

import com.visme.demo.dao.ProjectDao;
import com.visme.demo.dao.UserDao;
import com.visme.demo.exception.EntityNotFoundException;
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
    private final UserDao userDao;

    @Autowired
    public ProjectService(@Qualifier("localProjectDao") ProjectDao projectDao, UserDao userDao) {
        this.projectDao = projectDao;
        this.userDao = userDao;
    }

    public Project addProject(Project project) {
        if (userDao.doesUserExist(userDao.selectUserById(project.getUserId()))) {
            return projectDao.insertProject(project);
        }

        throw new EntityNotFoundException("Can't find passed user ID");
    }

    public List<Project> fetchUserProjects(UUID userId) {
        return projectDao.selectAllUserProjects(userId);
    }

    public List<Project> fetchProjectList() {
        return projectDao.selectAllProjects();
    }

    public Project getProjectById(UUID id) {
        return projectDao.selectProjectById(id);
    }

    public void deleteProject(UUID id) {
        projectDao.removeProjectById(id);
    }

    public Project updateProjectInfo(UUID id, Project updatedInfo) {
        return projectDao.updateProjectById(id, updatedInfo);
    }

    public Project toggleProjectType(UUID id) {
        return projectDao.toggleProjectType(id);
    }
}

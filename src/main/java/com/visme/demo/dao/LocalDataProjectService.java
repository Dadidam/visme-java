package com.visme.demo.dao;

import com.visme.demo.exception.EntityNotFoundException;
import com.visme.demo.model.Project;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository("localProjectDao")
public class LocalDataProjectService implements ProjectDao {

    private static List<Project> DB = new ArrayList<>();

    @Override
    public Project insertProject(UUID id, Project project) {
        // set type by default to `false` if not passed
        Boolean projectType = project.getType() != null ? project.getType() : false;

        // create new model
        Project projectToAdd = new Project(
                id,
                project.getUserId(),
                project.getTitle(),
                projectType,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        DB.add(projectToAdd);

        return projectToAdd;
    }

    @Override
    public List<Project> selectAllUserProjects(UUID userId) {
        return DB.stream()
                .filter(project -> project.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    @Override
    public List<Project> selectAllProjects(Boolean type, int start, int size) {
        List<Project> projectList = selectAllProjects(type);

        // check if the total amount of filtered data more or equal to pager size
        if (projectList.size() <= size) {
            // nothing to paginate - return "as-is"
            return projectList;
        }

        return projectList.stream().skip(start).limit(size).collect(Collectors.toList());
    }

    @Override
    public List<Project> selectAllProjects(Boolean type) {
        List<Project> projectList = new ArrayList<>(DB);

        // if `type` passed as query param (has Boolean type) - need to filter by type
        if (type != null) {
            projectList = projectList
                    .stream()
                    .filter(project -> project.getType().equals(type))
                    .collect(Collectors.toList());
        }
        return projectList;
    }

    @Override
    public Project selectProjectById(UUID id) {
        return DB.stream()
                .filter(project -> project.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Project with passed ID not found"));
    }

    @Override
    public void removeProjectById(UUID id) {
        Project projectToDelete = selectProjectById(id);
        DB.remove(projectToDelete);

        // if project still exists
        if (doesProjectExist(projectToDelete)) {
            throw new EntityNotFoundException("Can't delete the project from the Database");
        }
    }

    @Override
    public Project updateProjectById(UUID id, Project projectToBeUpdated) {
        Project possibleProject = selectProjectById(id);

        // get project index
        int projectIndex = DB.indexOf(possibleProject);

        // create new Project model with updated project values
        Project updatedProject = new Project(
                id,
                possibleProject.getUserId(),
                projectToBeUpdated.getTitle(),
                possibleProject.getType(),
                possibleProject.getCreationDate(),
                LocalDateTime.now() // <- need to update modification date
        );

        // now we can update selected entry
        DB.set(projectIndex, updatedProject);

        // return updated object to client
        return updatedProject;
    }

    @Override
    public Project toggleProjectType(UUID id) {
        Project projectToUpdate = selectProjectById(id);

        Boolean toggledType = !projectToUpdate.getType();

        // create new model based on founded data
        Project updatedProject = new Project(
                id,
                projectToUpdate.getUserId(),
                projectToUpdate.getTitle(),
                toggledType,
                projectToUpdate.getCreationDate(),
                projectToUpdate.getModificationDate());

        return updateProjectById(id, updatedProject);
    }

    @Override
    public Boolean doesProjectExist(Project project) {
        int projectIndex = DB.indexOf(project);
        return projectIndex >= 0;
    }
}

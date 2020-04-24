package com.visme.demo.dao;

import com.visme.demo.model.Project;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository("localProjectDao")
public class LocalDataProjectService implements ProjectDao {

    private static List<Project> DB = new ArrayList<>();

    @Override
    public Project insertProject(UUID id, Project project) {
        Project projectToAdd = new Project(id, project.getUserId(), project.getTitle(), project.isFavorite(), LocalDate.now(), LocalDate.now());
        DB.add(projectToAdd);
        return projectToAdd;
    }

    @Override
    public List<Project> selectAllUserProjects(UUID userId) {
        return DB.stream().filter(project -> project.getUserId().equals(userId)).collect(Collectors.toList());
    }

    @Override
    public List<Project> selectAllProjects() {
        return new ArrayList<>(DB);
    }

    @Override
    public Optional<Project> selectProjectById(UUID id) {
        return DB.stream().filter(project -> project.getId().equals(id)).findFirst();
    }

    @Override
    public int removeProjectById(UUID id) {
        Optional<Project> possibleProject = selectProjectById(id);
        if (possibleProject.isPresent()) {
            DB.remove(possibleProject.get());
            return 1;
        }
        return 0;
    }

    @Override
    public int updateProjectById(UUID id, Project projectToBeUpdated) {
        return selectProjectById(id)
                .map(project -> {
                    int projectIndex = DB.indexOf(project);
                    if (projectIndex >= 0) {
                        DB.set(projectIndex, new Project(id, id, projectToBeUpdated.getTitle(), projectToBeUpdated.isFavorite(), projectToBeUpdated.getCreationDate(), LocalDate.now()));
                        return 1;
                    }
                    return 0;
                }).orElse(0);
    }

    @Override
    public int toggleProjectType(UUID id, Project projectToBeUpdated) {
        // toggle its favorite flag first to opposite value
//        boolean favFlag = !projectToBeUpdated.isFavorite();

        return selectProjectById(id)
                .map(project -> {
                    int projectIndex = DB.indexOf(project);
                    if (projectIndex >= 0) {
                        DB.set(projectIndex, new Project(id, id, projectToBeUpdated.getTitle(), !projectToBeUpdated.isFavorite(), projectToBeUpdated.getCreationDate(), projectToBeUpdated.getModificationDate()));
                        return 1;
                    }
                    return 0;
                }).orElse(0);
    }
}

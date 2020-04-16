package com.visme.demo.api;

import com.visme.demo.model.Project;
import com.visme.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/project")
@RestController
@CrossOrigin("localhost:3000")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public void addProject(@Valid @NonNull @RequestBody Project project) {
        projectService.addProject(project);
    }

    @GetMapping(path = "/user/{userId}")
    public List<Project> fetchProjects(@PathVariable("userId") UUID userId) {
        return projectService.fetchUserProjects(userId);
    }

    @GetMapping(path = "{id}")
    public Project getProjectById(@PathVariable("id") UUID id) {
        return projectService.getProjectById(id).orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public void deleteProject(@PathVariable("id") UUID id) {
        projectService.deleteProject(id);
    }

    @PutMapping(path = "{id}")
    public void updateProjectInfo(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody Project projectInfo) {
        projectService.updateProjectInfo(id, projectInfo);
    }
}

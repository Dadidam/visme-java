package com.visme.demo.api;

import com.visme.demo.model.Pager;
import com.visme.demo.model.Project;
import com.visme.demo.response.ResponseTransfer;
import com.visme.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/project")
@RestController
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project addProject(@Valid @NonNull @RequestBody Project project) {
        return projectService.addProject(project);
    }

    @GetMapping(path = "/user/{userId}")
    public List<Project> fetchUserProjects(@PathVariable("userId") UUID userId) {
        return projectService.fetchUserProjects(userId);
    }

    @GetMapping(path = "/list")
    public ResponseTransfer fetchProjectList(
            @RequestParam(name = "type", required = false) Boolean type,
            @RequestParam(name = "start", required = false, defaultValue = "0") int start,
            @RequestParam(name = "size", required = false, defaultValue = "3") int size
    ) {
        List<Project> projectList = projectService.fetchProjectList(type, start, size);

        // DIRTY HACK, don't know hot to get rid of it ¯\_(ツ)_/¯
        // need it for pager total amount
        List<Project> allEntries = projectService.fetchProjectList();

        Pager pager = new Pager(start, size, allEntries.size());

        return new ResponseTransfer(
                HttpStatus.OK,
                new ArrayList<>(projectList),
                pager
        );
    }

    @GetMapping(path = "{id}")
    public Project getProjectById(@PathVariable("id") UUID id) {
        return projectService.getProjectById(id);
    }

    @DeleteMapping(path = "{id}")
    public void deleteProject(@PathVariable("id") UUID id) {
        projectService.deleteProject(id);
    }

    @PutMapping(path = "{id}")
    public Project updateProjectInfo(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody Project projectInfo) {
        return projectService.updateProjectInfo(id, projectInfo);
    }

    @GetMapping(path = "{id}/toggle")
    public Project toggleProjectType(@PathVariable("id") UUID id) {
        return projectService.toggleProjectType(id);
    }
}

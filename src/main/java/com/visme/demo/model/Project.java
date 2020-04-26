package com.visme.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.UUID;

public class Project {
    private final UUID id;

    @NotNull(message = "User id has not been provided")
    private final UUID userId;

    @NotBlank
    @Size(min=3, message = "Project title should have at least 3 characters")
    private final String title;

    private final Boolean type;

    private final LocalDateTime created_at;

    private final LocalDateTime modified_at;

    public Project(
            @JsonProperty("id") UUID id,
            @JsonProperty("userId") UUID userId,
            @JsonProperty("title") String title,
            @JsonProperty("type") Boolean type,
            @JsonProperty("created_at") LocalDateTime created_at,
            @JsonProperty("modified_at") LocalDateTime modified_at
    ) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.type = type;
        this.created_at = created_at;
        this.modified_at = modified_at;
    }

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getType() {
        return type;
    }

    public LocalDateTime getCreationDate() {
        return created_at;
    }

    public LocalDateTime getModificationDate() {
        return modified_at;
    }
}

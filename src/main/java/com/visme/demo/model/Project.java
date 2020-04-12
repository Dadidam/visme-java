package com.visme.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

public class Project {
    private final UUID id;

    private final UUID userId;

    @NotBlank
    private final String title;

    private final Boolean isFavorite;

    private final LocalDate created_at;

    private final LocalDate modified_at;

    public Project(@JsonProperty("id") UUID id, @JsonProperty("userId") UUID userId, @JsonProperty("title") String title, @JsonProperty("isFavorite") Boolean isFavorite, @JsonProperty("created_at") LocalDate created_at, @JsonProperty("modified_at") LocalDate modified_at) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.isFavorite = isFavorite;
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

    public Boolean isFavorite() {
        return isFavorite;
    }

    public LocalDate getCreationDate() {
        return created_at;
    }

    public LocalDate getModificationDate() {
        return modified_at;
    }
}

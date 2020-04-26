package com.visme.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.UUID;

public class User {
    private final UUID id;

    @NotBlank(message = "Please provide a full name")
    @Size(min=3, message = "Full name should have at least 3 characters")
    private final String name;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Please provide an email address")
    private final String email;

    @NotBlank(message = "Please provide a password")
    @Size(min=6, message = "Password should have at least 6 characters")
    private final String password;

    public User(
            @JsonProperty("id") UUID id,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("password") String password
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}

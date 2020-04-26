package com.visme.demo.api;

import com.visme.demo.model.Credentials;
import com.visme.demo.model.User;
import com.visme.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/user")
@RestController
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User addUser(@Valid @NonNull @RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping public List<User> fetchUsers() {
        return userService.fetchUsers();
    }

    @GetMapping(path = "{id}")
    public User getUserById(@PathVariable("id") UUID id) {
        return userService.getUserById(id);
    }

    @DeleteMapping(path = "{id}")
    public void deleteUser(@PathVariable("id") UUID id) {
        userService.deleteUser(id);
    }

    @PutMapping(path = "{id}")
    public User updateUserInfo(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody User userInfoToUpdate) {
        return userService.updateUserInfo(id, userInfoToUpdate);
    }

    @PostMapping(path = "/auth")
    public User authUser(@Valid @NonNull @RequestBody Credentials credentials) {
        return userService.authUser(credentials).orElse(null);
    }
}

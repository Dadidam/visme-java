package com.visme.demo.dao;

import com.visme.demo.model.Credentials;
import com.visme.demo.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {
    User insertUser(UUID id, User user);

    default User insertUser(User user) {
        UUID id = UUID.randomUUID();
        return insertUser(id, user);
    }

    List<User> selectAllUsers();

    Optional<User> selectUserById(UUID id);

    Optional<User> selectUserByEmail(String email);

    int removeUserById(UUID id);

    int updateUserById(UUID id, User user);

    Optional<User> checkUserCredentials(Credentials credentials);
}

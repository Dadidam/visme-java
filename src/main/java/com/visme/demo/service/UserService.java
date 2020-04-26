package com.visme.demo.service;

import com.visme.demo.dao.UserDao;
import com.visme.demo.model.Credentials;
import com.visme.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(@Qualifier("localUserDao") UserDao userDao) {
        this.userDao = userDao;
    }

    public User addUser(User user) {
        return userDao.insertUser(user);
    }

    public List<User> fetchUsers() {
        return userDao.selectAllUsers();
    }

    public User getUserById(UUID id) {
        return userDao.selectUserById(id);
    }

    public User getUserByEmail(String email) {
        return userDao.selectUserByEmail(email);
    }

    public void deleteUser(UUID id) {
        userDao.removeUserById(id);
    }

    public User updateUserInfo(UUID id, User updatedInfo) {
        return userDao.updateUserById(id, updatedInfo);
    }

    public Optional<User> authUser(Credentials credentials) {
        return userDao.checkUserCredentials(credentials);
    }

    public Boolean doesUserExist(User user) { return userDao.doesUserExist(user); }
}

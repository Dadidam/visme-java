package com.visme.demo.dao;

import com.visme.demo.helpers.CryptHelper;
import com.visme.demo.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("localDao")
public class LocalDataService implements UserDao {

    private static List<User> DB = new ArrayList<>();

    @Override
    public int insertUser(UUID id, User user) {
        // all passwords should be encrypted
        String encodedPassword = CryptHelper.encodePassword(user.getPassword());

        // put entry to Database
        DB.add(new User(id, user.getName(), user.getEmail(), encodedPassword));

        return 1;
    }

    @Override
    public List<User> selectAllUsers() {
        return DB;
    }

    @Override
    public Optional<User> selectUserById(UUID id) {
        return DB.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    @Override
    public int removeUserById(UUID id) {
        Optional<User> possibleUser = selectUserById(id);
        if (possibleUser.isPresent()) {
            DB.remove(possibleUser.get());
            return 1;
        }
        return 0;
    }

    @Override
    public int updateUserById(UUID id, User userToBeUpdated) {
        return selectUserById(id)
                .map(user -> {
                    int userIndex = DB.indexOf(user);
                    if (userIndex >= 0) {
                        // encode password first
                        String encodedPassword = CryptHelper.encodePassword(userToBeUpdated.getPassword());

                        // now we can update selected entry
                        DB.set(userIndex, new User(id, userToBeUpdated.getName(), userToBeUpdated.getEmail(), encodedPassword));

                        return 1;
                    }
                    return 0;
                }).orElse(0);
    }
}

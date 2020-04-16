package com.visme.demo.dao;

import com.visme.demo.helpers.CryptHelper;
import com.visme.demo.model.Credentials;
import com.visme.demo.model.User;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("localUserDao")
public class LocalDataUserService implements UserDao {

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

    @Override
    public Optional<User> selectUserByEmail(String email) {
        return DB.stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }

    @Override
    public Optional<User> checkUserCredentials(Credentials credentials) {
        // look up for a username first
        Optional<User> possibleUser = DB.stream()
                .filter(dbUser -> dbUser.getEmail().equals(credentials.getEmail()))
                .findFirst();

         if (possibleUser.isPresent()) {
            User realUser = possibleUser.get();
            // check if passed password matches to its hash
            Boolean passEquals = CryptHelper.isMatched(credentials.getPassword(), realUser.getPassword());

            // compare passwords' hashes (passed and saved in DB)
            if (passEquals) {
                return possibleUser;
            } else {
                System.out.println("Passwords don't macth");
                return null;
            }
        };
        System.out.println("User with passed email doesn't exist");
        return null;
    }
}

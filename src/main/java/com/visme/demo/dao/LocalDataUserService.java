package com.visme.demo.dao;

import com.visme.demo.exception.ApiRequestException;
import com.visme.demo.exception.EntityNotFoundException;
import com.visme.demo.helpers.CryptHelper;
import com.visme.demo.model.Credentials;
import com.visme.demo.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("localUserDao")
public class LocalDataUserService implements UserDao {

    private static List<User> DB = new ArrayList<>();

    @Override
    public User insertUser(UUID id, User user) {

        try {
            User existedUser = selectUserByEmail(user.getEmail());

            if (doesUserExist(existedUser)) {
                throw new ApiRequestException("User with passed Email address already exists");
            }
        } catch (EntityNotFoundException e) {
            // okay, email is unique, moving forward
        }

        // all passwords should be encrypted
        String encodedPassword = CryptHelper.encodePassword(user.getPassword());

        // put entry to Database
        User userToAdd = new User(id, user.getName(), user.getEmail(), encodedPassword);
        DB.add(userToAdd);

        if (doesUserExist(userToAdd)) {
            return userToAdd;
        } else throw new EntityNotFoundException("Can't add a new user to the Database");
    }

    @Override
    public List<User> selectAllUsers() {
        return DB;
    }

    @Override
    public User selectUserById(UUID id) {
        return DB.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst().orElseThrow(() -> new EntityNotFoundException("User with passed ID not found"));
    }

    @Override
    public void removeUserById(UUID id) {
        User possibleUser = selectUserById(id);
        DB.remove(possibleUser);

        // check if the user still exists in the DB
        if (doesUserExist(possibleUser)) {
            throw new EntityNotFoundException("Can't delete the user from DB");
        }
    }

    @Override
    public User updateUserById(UUID id, User userToBeUpdated) {
        User possibleUser = selectUserById(id);

        if (doesUserExist(possibleUser)) {
            // get user's index
            int userIndex = DB.indexOf(possibleUser);

            // encode password first
            String encodedPassword = CryptHelper.encodePassword(userToBeUpdated.getPassword());

            // create new User model
            User updatedUserModel = new User(id, userToBeUpdated.getName(), userToBeUpdated.getEmail(), encodedPassword);

            // now we can update selected entry
            DB.set(userIndex, updatedUserModel);

            return updatedUserModel;
        }

        return null;
    }

    @Override
    public User selectUserByEmail(String email) {
        return DB.stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst().orElseThrow(() -> new EntityNotFoundException("User with passed email not found"));
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
        }
        ;
        System.out.println("User with passed email doesn't exist");
        return null;
    }

    @Override
    public Boolean doesUserExist(User user) {
        int userIndex = DB.indexOf(user);
        return userIndex >= 0;
    }
}

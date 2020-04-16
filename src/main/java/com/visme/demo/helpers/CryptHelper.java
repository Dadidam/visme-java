package com.visme.demo.helpers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CryptHelper {

    private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String encodePassword(String rawPassword) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(rawPassword);
    }

    public static Boolean isMatched(String rawPassword, String hash) {
        return passwordEncoder.matches(rawPassword, hash);
    }
}
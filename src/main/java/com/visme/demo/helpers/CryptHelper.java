package com.visme.demo.helpers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CryptHelper {
    public static String encodePassword(String rawPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(rawPassword);
    }
}
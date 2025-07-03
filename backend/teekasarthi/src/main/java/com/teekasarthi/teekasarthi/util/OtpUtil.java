package com.teekasarthi.teekasarthi.util;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Random;

@Component
public class OtpUtil {
    private final Map<String, String> otpMap = new java.util.HashMap<>();
    private final Random random = new Random();

    public String generateOtp(String phone) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        otpMap.put(phone, otp);
        System.out.println("Generated OTP for " + phone + ": " + otp);
        return otp;
    }

    public boolean verifyOtp(String phone, String otp){
        return otp.equals(otpMap.get(phone));

    }
    public void clearOtp(String phone) {
        otpMap.remove(phone);
    }
}

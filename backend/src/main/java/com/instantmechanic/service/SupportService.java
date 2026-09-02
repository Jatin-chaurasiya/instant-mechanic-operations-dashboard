package com.instantmechanic.service;

import com.instantmechanic.dto.support.SupportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupportService {

    public void sendSupportMessage(SupportRequest request) {

        System.out.println("Support Request Received");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Subject: " + request.getSubject());
        System.out.println("Message: " + request.getMessage());
    }
}
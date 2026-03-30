package net.engineeringdigest.journalApp.controller;

import net.engineeringdigest.journalApp.Entity.JwtResponse;
import net.engineeringdigest.journalApp.Entity.LoginRequest;
import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @GetMapping("/health-check")
    public String healthcheck()
    {
        return "OK";
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody User user)
    {

        userService.saveNewUser(user);
        return ResponseEntity.ok("User Created");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest)
    {
        try
        {
            JwtResponse jwt = userService.authenticate(loginRequest);
            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }

}

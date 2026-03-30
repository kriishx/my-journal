package net.engineeringdigest.journalApp.controller;


import net.engineeringdigest.journalApp.Entity.NewPassword;
import net.engineeringdigest.journalApp.Entity.UpdateUserPhoneAndAddress;
import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.Repository.UserRepository;
import net.engineeringdigest.journalApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @PutMapping("/change-details")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserPhoneAndAddress user)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User userInDB = userService.findByUsername(username);
        if (userInDB != null)
        {
            userInDB.setPhone(user.getPhone());
            userInDB.setAddress(user.getAddress());
            userService.saveNewUser(userInDB);


        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUserById(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userRepository.deleteByUsername(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody NewPassword dto, Principal principal){
        String username = principal.getName();
        boolean changed = userService.changePassword(username, dto.getOldPassword(), dto.getNewPassword());

        if (changed){return ResponseEntity.ok("Password Updated Successfully");}
        else {return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect Old Password");}
    }


}

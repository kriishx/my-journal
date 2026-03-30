package net.engineeringdigest.journalApp.controller;


import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.Entity.userRole;
import net.engineeringdigest.journalApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers(){
        List<User> all = userService.getAll();
        if(all!=null && !all.isEmpty())
        {
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-admin-user")
    public void createUser(@RequestBody User user)
    {
        userService.saveAdmin(user);
    }

    @PostMapping("get-all-admin")
    public ResponseEntity<List<User>> getAdmin(){
        List<User> admins = userService.getAllAdmin();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PostMapping("get-all-user")
    public ResponseEntity<List<User>> getUsers(){
        List<User> admins = userService.getAllUsers();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @DeleteMapping("delete-user/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username){
        try{
            userService.deleteUserByUsername(username);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("promote-user/{username}")
    public ResponseEntity<?> promoteUser(@PathVariable String username){
        try{
            User user = userService.findByUsername(username);
            user.setRoles(userRole.ADMIN);
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("demote-user/{username}")
    public ResponseEntity<?> demoteUser(@PathVariable String username){
        try{
            User user = userService.findByUsername(username);
            user.setRoles(userRole.USER);
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

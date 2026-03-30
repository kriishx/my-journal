package net.engineeringdigest.journalApp.Services;

import net.engineeringdigest.journalApp.Entity.JwtResponse;
import net.engineeringdigest.journalApp.Entity.LoginRequest;
import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.Entity.userRole;
import net.engineeringdigest.journalApp.Exception.BadCredentialsException;
import net.engineeringdigest.journalApp.Exception.PhoneAlreadyExistsException;
import net.engineeringdigest.journalApp.Exception.UserNotFoundException;
import net.engineeringdigest.journalApp.Exception.UsernameAlreadyExistsException;
import net.engineeringdigest.journalApp.Repository.UserRepository;
import net.engineeringdigest.journalApp.Security.JwtTokenProvider;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveNewUser(User user)
    {
        if (userRepository.existsByUsername(user.getUsername())){
            throw new UsernameAlreadyExistsException("Username Already Exists!!");
        }
        if (userRepository.existsByPhone(user.getPhone())){
            throw new PhoneAlreadyExistsException("Phone Number Already Exists!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(userRole.valueOf("USER"));
        userRepository.save(user);
    }

    public void saveAdmin(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(userRole.valueOf("ADMIN"));
        userRepository.save(user);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }


    public List<User> getAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(ObjectId id)
    {
        return userRepository.findById(id);
    }

    public void deleteById(ObjectId id)
    {
        userRepository.deleteById(id);
    }

    public User findByUsername(String username)
    {
        return userRepository.findByUsername(username).orElseThrow(()-> new UserNotFoundException("User not found"));
    }

    public List<User> getAllAdmin(){
        return userRepository.findByRoles("ADMIN");
    }

    public List<User> getAllUsers(){
        return userRepository.findByRoles("USER");
    }

    public void deleteUserByUsername(String username)
    {
        userRepository.deleteByUsername(username);
    }

    public JwtResponse authenticate(LoginRequest request){
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(()-> new UserNotFoundException("User not Found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid Password");
        }

        String token = jwtTokenProvider.generateToken(user.getUsername());
        return new JwtResponse(token, user.getUsername());
    }

    public boolean changePassword(String username, String oldPassword, String newPassword){
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isEmpty()){
            return false;
        }

        User user = optionalUser.get();

        if(!passwordEncoder.matches(oldPassword,user.getPassword())){
            return false;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);



        return true;

    }
}

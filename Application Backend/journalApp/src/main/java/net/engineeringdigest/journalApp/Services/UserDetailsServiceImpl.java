package net.engineeringdigest.journalApp.Services;

import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.Exception.UserNotFoundException;
import net.engineeringdigest.journalApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new UserNotFoundException("User Not Found"));
        if(user!=null){
            return org.springframework.security.core.userdetails.User.builder()
                   .username(user.getUsername())
                   .password(user.getPassword())
                   .roles(String.valueOf(user.getRoles()))
                   .build();
        }
        throw new UsernameNotFoundException("Username not found with username: " + username);
    }
}

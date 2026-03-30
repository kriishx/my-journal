package net.engineeringdigest.journalApp.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type ;
    private String username;

    public JwtResponse(String token, String username){
        this.token = token;
        this.username = username;
        this.type = "Bearer";
    }
}

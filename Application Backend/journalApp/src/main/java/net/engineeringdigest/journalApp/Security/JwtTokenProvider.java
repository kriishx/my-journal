package net.engineeringdigest.journalApp.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import static io.jsonwebtoken.SignatureAlgorithm.HS512;

@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String JWT_SECRET;

    public String generateToken(String username){
        Date now = new Date();
        long JWT_EXPIRATION_MS = 86400000;
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION_MS);

        byte[] keyBytes = JWT_SECRET.getBytes(StandardCharsets.UTF_8);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, HS512)
                .compact();
    }

    public boolean validateToken(String token){
        try{
            byte[] keyBytes = JWT_SECRET.getBytes(StandardCharsets.UTF_8);
            Key key = Keys.hmacShaKeyFor(keyBytes);
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                    .build()
                    .parseClaimsJws(token);
            return true;

        }catch (JwtException | IllegalArgumentException e){
            System.out.println("Invalid JWT:" + e.getMessage());
            return false;
        }

    }

    public String extractUsername(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(JWT_SECRET.getBytes())) // <-- use this
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


}

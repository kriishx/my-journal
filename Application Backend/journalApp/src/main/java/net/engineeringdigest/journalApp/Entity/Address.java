package net.engineeringdigest.journalApp.Entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class Address {
    @Field("house_number")
    private String hno;
    private String city;
    private String state;
    private String country;
}

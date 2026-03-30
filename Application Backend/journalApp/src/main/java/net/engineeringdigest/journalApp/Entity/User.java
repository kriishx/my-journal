package net.engineeringdigest.journalApp.Entity;


import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document(collection = "users")
@Data
public class User {

    @Id
    private ObjectId id;
    @Indexed(unique = true)
    @NonNull
    private String username;
    @NonNull
    private String password;
    private userRole roles;
    @Indexed(unique = true)
    @NonNull
    private long phone;
    @DBRef(lazy = false)
    private List<JournalEntry> journalEntries = new ArrayList<>();
    private Address address;

}

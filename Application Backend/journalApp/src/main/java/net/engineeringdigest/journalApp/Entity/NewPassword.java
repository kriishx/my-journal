package net.engineeringdigest.journalApp.Entity;

import lombok.Data;

@Data
public class NewPassword {

    private String oldPassword;
    private String newPassword;
}

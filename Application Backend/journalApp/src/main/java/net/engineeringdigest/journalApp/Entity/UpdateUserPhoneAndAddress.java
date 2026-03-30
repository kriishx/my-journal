package net.engineeringdigest.journalApp.Entity;

import lombok.Data;

@Data
public class UpdateUserPhoneAndAddress {
    private long phone;
    private Address address;
}

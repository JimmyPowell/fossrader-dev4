package tech.cspioneer.fossraderde4.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "test")
public class User {
    
    @Id
    private String id;
    
    private String name;
    
    private Integer age;
    
    private String email;
} 
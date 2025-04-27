package tech.cspioneer.fossraderde4.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tech.cspioneer.fossraderde4.model.User;
//继承MongoRepository，泛型为User和String
public interface UserRepository extends MongoRepository<User, String> {
} 
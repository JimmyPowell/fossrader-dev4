package tech.cspioneer.fossraderde4.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.cspioneer.fossraderde4.model.User;
import tech.cspioneer.fossraderde4.repository.UserRepository;
import tech.cspioneer.fossraderde4.service.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
} 
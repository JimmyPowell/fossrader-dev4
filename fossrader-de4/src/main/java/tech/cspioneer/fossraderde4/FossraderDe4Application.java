package tech.cspioneer.fossraderde4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 服务主启动类
 * Spring Boot 3中不需要手动添加@EnableDiscoveryClient注解
 * 只需要在应用中添加Eureka Client依赖并配置注册中心
 */
@SpringBootApplication
public class FossraderDe4Application {

    public static void main(String[] args) {
        SpringApplication.run(FossraderDe4Application.class, args);
    }

}

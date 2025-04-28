package tech.cspioneer.fossraderde4.config;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tech.cspioneer.fossraderde4.model.Project;
import tech.cspioneer.fossraderde4.model.ProjectDetail;
import tech.cspioneer.fossraderde4.repository.ProjectDetailRepository;
import tech.cspioneer.fossraderde4.repository.ProjectRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 数据初始化器，用于初始化演示数据
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    private final ProjectRepository projectRepository;
    private final ProjectDetailRepository projectDetailRepository;
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("开始初始化演示数据");
        initProjects();
        initProjectDetails();
        logger.info("演示数据初始化完成");
    }
    
    /**
     * 初始化项目数据
     */
    private void initProjects() {
        if (projectRepository.count() > 0) {
            logger.info("项目数据已存在，跳过初始化");
            return;
        }
        
        // 示例项目数据
        List<Project> projects = Arrays.asList(
            createProject("项目名称", "项目所有者", "github", 
                "一个非常简单的mcp server客户端，可以提供自动化的邮件转发服务",
                Arrays.asList("html", "java", "docker"), 20),
            createProject("React组件库", "开发团队", "github", 
                "一个现代化的React UI组件库，包含丰富的界面元素和主题定制功能",
                Arrays.asList("react", "typescript", "css"), 156),
            createProject("数据可视化工具", "数据团队", "gitlab", 
                "强大的数据可视化工具，支持多种图表类型和实时数据展示",
                Arrays.asList("javascript", "d3", "svg"), 89),
            createProject("API网关服务", "后端团队", "github", 
                "高性能的API网关，提供路由、认证、限流等功能",
                Arrays.asList("go", "microservice", "docker"), 112),
            createProject("移动端框架", "移动开发者", "github", 
                "跨平台移动应用开发框架，一次编写多端运行",
                Arrays.asList("flutter", "dart", "mobile"), 78),
            createProject("自动化测试平台", "测试团队", "bitbucket", 
                "端到端自动化测试平台，支持多浏览器测试和CI集成",
                Arrays.asList("python", "selenium", "testing"), 45)
        );
        
        projectRepository.saveAll(projects);
        logger.info("初始化了 {} 个项目数据", projects.size());
    }
    
    /**
     * 初始化项目详情数据
     */
    private void initProjectDetails() {
        if (projectDetailRepository.count() > 0) {
            logger.info("项目详情数据已存在，跳过初始化");
            return;
        }
        
        // 获取已创建的项目列表
        List<Project> projects = projectRepository.findAll();
        if (projects.isEmpty()) {
            logger.warn("未找到项目数据，无法初始化项目详情");
            return;
        }
        
        // 为每个项目创建详情数据
        for (Project project : projects) {
            ProjectDetail detail = new ProjectDetail();
            detail.setId(project.getId());
            detail.setTitle(project.getTitle());
            detail.setDescription(project.getDescription());
            detail.setAuthor(project.getOwner());
            detail.setPlatform(project.getSource());
            detail.setStars(project.getLikes() * 10 + 300);  // 模拟更多的星标数
            detail.setForks(project.getLikes() * 5 + 100);   // 模拟分支数
            detail.setIssues(project.getLikes() + 20);       // 模拟问题数
            detail.setTags(project.getTags());
            detail.setKeywords(project.getTags().subList(0, 1)); // 使用部分标签作为关键词
            detail.setScreenshots(Arrays.asList(
                "/placeholder.svg?height=120&width=320", 
                "/placeholder.svg?height=120&width=320"
            ));
            detail.setDetailedDescription(
                "这是一个功能强大的开源项目，提供了许多实用功能。它具有简单易用的API、高性能的处理能力、" +
                "完善的文档和示例，以及活跃的社区支持。" + project.getDescription() + 
                "适用于各种应用场景，获得了广泛的使用和好评。"
            );
            
            projectDetailRepository.save(detail);
        }
        
        logger.info("初始化了 {} 个项目详情数据", projects.size());
    }
    
    /**
     * 创建项目
     */
    private Project createProject(String title, String owner, String source, String description, List<String> tags, Integer likes) {
        Project project = new Project();
        project.setTitle(title);
        project.setOwner(owner);
        project.setSource(source);
        project.setDescription(description);
        project.setTags(tags);
        project.setLikes(likes);
        return project;
    }
} 
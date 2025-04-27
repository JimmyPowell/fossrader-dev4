package tech.cspioneer.fossraderde4.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * 项目详情数据模型
 */
@Data
@Document(collection = "project_details")
public class ProjectDetail {
    
    @Id
    private String id;                      // 项目唯一标识符
    
    private String title;                   // 项目名称
    
    private String description;             // 项目简短描述
    
    private String author;                  // 项目作者/所有者
    
    private String platform;                // 项目托管平台
    
    private Integer stars;                  // 项目星标数
    
    private Integer forks;                  // 项目分支数
    
    private Integer issues;                 // 项目问题数
    
    private List<String> tags;              // 技术栈标签
    
    private List<String> keywords;          // 关键词
    
    private List<String> screenshots;       // 项目截图URL数组
    
    private String detailedDescription;     // 项目详细描述
} 
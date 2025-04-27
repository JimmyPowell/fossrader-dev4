package tech.cspioneer.fossraderde4.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * 项目列表数据模型
 */
@Data
@Document(collection = "projects")
public class Project {
    
    @Id
    private String id;
    
    private String title;           // 项目名称
    
    private String owner;           // 项目所有者/创建者
    
    private String source;          // 项目来源平台(如 github, gitlab, bitbucket)
    
    private String description;     // 项目简短描述
    
    private List<String> tags;      // 项目标签/技术栈
    
    private Integer likes;          // 项目点赞/收藏数
} 
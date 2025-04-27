package tech.cspioneer.fossraderde4.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tech.cspioneer.fossraderde4.model.Project;

import java.util.List;

/**
 * 项目数据仓库接口
 */
public interface ProjectRepository extends MongoRepository<Project, String> {
    
    /**
     * 根据项目标签查找项目
     * @param tag 项目标签
     * @return 项目列表
     */
    List<Project> findByTagsContaining(String tag);
    
    /**
     * 根据项目名称或描述模糊查询
     * @param keyword 关键词
     * @return 项目列表
     */
    List<Project> findByTitleContainingOrDescriptionContaining(String keyword, String sameKeyword);
    
    /**
     * 根据项目源查找项目
     * @param source 项目源平台
     * @return 项目列表
     */
    List<Project> findBySource(String source);
} 
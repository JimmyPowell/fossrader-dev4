package tech.cspioneer.fossraderde4.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tech.cspioneer.fossraderde4.model.ProjectDetail;

import java.util.List;

/**
 * 项目详情数据仓库接口
 */
public interface ProjectDetailRepository extends MongoRepository<ProjectDetail, String> {
    
    /**
     * 根据技术栈标签查找项目
     * @param tag 技术栈标签
     * @return 项目详情列表
     */
    List<ProjectDetail> findByTagsContaining(String tag);
    
    /**
     * 根据关键词查找项目
     * @param keyword 关键词
     * @return 项目详情列表
     */
    List<ProjectDetail> findByKeywordsContaining(String keyword);
    
    /**
     * 根据平台查找项目
     * @param platform 项目平台
     * @return 项目详情列表
     */
    List<ProjectDetail> findByPlatform(String platform);
} 
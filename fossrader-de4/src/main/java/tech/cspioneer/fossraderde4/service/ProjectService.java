package tech.cspioneer.fossraderde4.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.cspioneer.fossraderde4.model.Project;
import tech.cspioneer.fossraderde4.model.ProjectDetail;

import java.util.List;
import java.util.Map;

/**
 * 项目服务接口
 */
public interface ProjectService {
    
    /**
     * 获取所有项目
     * @return 项目列表
     */
    List<Project> getAllProjects();
    
    /**
     * 分页获取项目
     * @param pageable 分页参数
     * @return 分页项目列表
     */
    Page<Project> getProjects(Pageable pageable);
    
    /**
     * 根据ID获取项目
     * @param id 项目ID
     * @return 项目
     */
    Project getProjectById(String id);
    
    /**
     * 创建项目
     * @param project 项目
     * @return 创建后的项目
     */
    Project createProject(Project project);
    
    /**
     * 更新项目
     * @param id 项目ID
     * @param projectDetails 更新的项目详情
     * @return 更新后的项目
     */
    Project updateProject(String id, Project projectDetails);
    
    /**
     * 删除项目
     * @param id 项目ID
     */
    void deleteProject(String id);
    
    /**
     * 根据标签查找项目
     * @param tag 标签
     * @return 项目列表
     */
    List<Project> findProjectsByTag(String tag);
    
    /**
     * 搜索项目
     * @param keyword 关键词
     * @return 项目列表
     */
    List<Project> searchProjects(String keyword);
    
    /**
     * 项目点赞
     * @param id 项目ID
     * @return 更新后的项目
     */
    Project likeProject(String id);
    
    /**
     * 获取项目总数
     * @return 项目总数
     */
    long getProjectCount();
    
    /**
     * 创建完整项目（包括基本信息和详情）
     * @param projectDetail 完整的项目详情
     * @return 包含创建后的项目基本信息和详情的Map
     */
    Map<String, Object> createCompleteProject(ProjectDetail projectDetail);
} 
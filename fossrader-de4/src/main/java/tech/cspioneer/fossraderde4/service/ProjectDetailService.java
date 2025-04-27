package tech.cspioneer.fossraderde4.service;

import tech.cspioneer.fossraderde4.model.ProjectDetail;

import java.util.List;

/**
 * 项目详情服务接口
 */
public interface ProjectDetailService {
    
    /**
     * 获取所有项目详情
     * @return 项目详情列表
     */
    List<ProjectDetail> getAllProjectDetails();
    
    /**
     * 根据ID获取项目详情
     * @param id 项目ID
     * @return 项目详情
     */
    ProjectDetail getProjectDetailById(String id);
    
    /**
     * 创建项目详情
     * @param projectDetail 项目详情
     * @return 创建后的项目详情
     */
    ProjectDetail createProjectDetail(ProjectDetail projectDetail);
    
    /**
     * 更新项目详情
     * @param id 项目ID
     * @param projectDetail 更新的项目详情
     * @return 更新后的项目详情
     */
    ProjectDetail updateProjectDetail(String id, ProjectDetail projectDetail);
    
    /**
     * 删除项目详情
     * @param id 项目ID
     */
    void deleteProjectDetail(String id);
    
    /**
     * 根据技术栈标签查找项目详情
     * @param tag 标签
     * @return 项目详情列表
     */
    List<ProjectDetail> findProjectDetailsByTag(String tag);
    
    /**
     * 根据关键词查找项目详情
     * @param keyword 关键词
     * @return 项目详情列表
     */
    List<ProjectDetail> findProjectDetailsByKeyword(String keyword);
} 
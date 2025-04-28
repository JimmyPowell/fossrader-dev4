package tech.cspioneer.fossraderde4.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.cspioneer.fossraderde4.exception.ResourceNotFoundException;
import tech.cspioneer.fossraderde4.model.Project;
import tech.cspioneer.fossraderde4.model.ProjectDetail;
import tech.cspioneer.fossraderde4.repository.ProjectDetailRepository;
import tech.cspioneer.fossraderde4.repository.ProjectRepository;
import tech.cspioneer.fossraderde4.service.ProjectService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 项目服务实现类
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectRepository;
    private final ProjectDetailRepository projectDetailRepository;
    
    @Override
    public List<Project> getAllProjects() {
        log.debug("获取所有项目");
        List<Project> projects = projectRepository.findAll();
        log.debug("获取到 {} 个项目", projects.size());
        return projects;
    }
    
    @Override
    public Page<Project> getProjects(Pageable pageable) {
        log.debug("分页获取项目，页码：{}，每页大小：{}", pageable.getPageNumber(), pageable.getPageSize());
        Page<Project> projectPage = projectRepository.findAll(pageable);
        log.debug("分页获取项目成功，总记录数：{}，总页数：{}", projectPage.getTotalElements(), projectPage.getTotalPages());
        return projectPage;
    }
    
    @Override
    public Project getProjectById(String id) {
        log.debug("根据ID查询项目：{}", id);
        return projectRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("找不到ID为: {} 的项目", id);
                    return new ResourceNotFoundException("找不到ID为: " + id + " 的项目");
                });
    }
    
    @Override
    public Project createProject(Project project) {
        log.debug("创建项目: {}", project);
        if (project.getLikes() == null) {
            project.setLikes(0);
            log.debug("项目点赞数为null，已设置为0");
        }
        Project savedProject = projectRepository.save(project);
        log.debug("项目创建成功，ID: {}", savedProject.getId());
        return savedProject;
    }
    
    @Override
    public Project updateProject(String id, Project projectDetails) {
        log.debug("更新项目，ID: {}, 项目详情: {}", id, projectDetails);
        Project project = getProjectById(id);
        
        project.setTitle(projectDetails.getTitle());
        project.setOwner(projectDetails.getOwner());
        project.setSource(projectDetails.getSource());
        project.setDescription(projectDetails.getDescription());
        project.setTags(projectDetails.getTags());
        project.setLikes(projectDetails.getLikes());
        project.setIconUrl(projectDetails.getIconUrl());
        project.setImageUrls(projectDetails.getImageUrls());
        project.setProjectAddress(projectDetails.getProjectAddress());
        
        Project updatedProject = projectRepository.save(project);
        log.debug("项目更新成功，ID: {}", updatedProject.getId());
        return updatedProject;
    }
    
    @Override
    public void deleteProject(String id) {
        log.debug("删除项目，ID: {}", id);
        Project project = getProjectById(id);
        projectRepository.delete(project);
        log.debug("项目删除成功，ID: {}", id);
    }
    
    @Override
    public List<Project> findProjectsByTag(String tag) {
        log.debug("根据标签查找项目: {}", tag);
        List<Project> projects = projectRepository.findByTagsContaining(tag);
        log.debug("根据标签 {} 找到 {} 个项目", tag, projects.size());
        return projects;
    }
    
    @Override
    public List<Project> searchProjects(String keyword) {
        log.debug("搜索项目，关键词: {}", keyword);
        List<Project> projects = projectRepository.findByTitleContainingOrDescriptionContaining(keyword, keyword);
        log.debug("根据关键词 {} 搜索到 {} 个项目", keyword, projects.size());
        return projects;
    }
    
    @Override
    public Project likeProject(String id) {
        log.debug("项目点赞，ID: {}", id);
        Project project = getProjectById(id);
        project.setLikes(project.getLikes() + 1);
        Project updatedProject = projectRepository.save(project);
        log.debug("项目点赞成功，ID: {}，当前点赞数: {}", id, updatedProject.getLikes());
        return updatedProject;
    }
    
    @Override
    public long getProjectCount() {
        log.debug("获取项目总数");
        long count = projectRepository.count();
        log.debug("项目总数: {}", count);
        return count;
    }
    
    /**
     * 创建完整项目（包括基本信息和详情）
     * @param projectDetail 完整的项目详情
     * @return 包含创建后的项目基本信息和详情的Map
     */
    @Override
    @Transactional
    public Map<String, Object> createCompleteProject(ProjectDetail projectDetail) {
        log.debug("创建完整项目: {}", projectDetail);
        
        // 1. 从项目详情中提取基本项目信息
        Project project = new Project();
        
        if (projectDetail.getId() != null && !projectDetail.getId().isEmpty()) {
            project.setId(projectDetail.getId());
        }
        
        // 设置基本项目属性
        project.setTitle(projectDetail.getTitle());
        project.setOwner(projectDetail.getAuthor());  // author 映射到 owner
        project.setSource(projectDetail.getPlatform());  // platform 映射到 source
        project.setDescription(projectDetail.getDescription());
        project.setTags(projectDetail.getTags());
        project.setLikes(projectDetail.getStars() != null ? projectDetail.getStars() / 10 : 0);  // 从stars估算likes
        project.setProjectAddress(projectDetail.getProjectAddress());
        projectDetail.setProjectAddress(projectDetail.getProjectAddress());
        
        // 处理iconUrl，确保不为空
        if (projectDetail.getIconUrl() != null && !projectDetail.getIconUrl().isEmpty()) {
            project.setIconUrl(projectDetail.getIconUrl()); 
            log.debug("使用详情中的图标URL: {}", projectDetail.getIconUrl());
        } else {
            // 设置默认图标URL
            project.setIconUrl("/placeholder-icon.svg"); 
            log.debug("使用默认图标URL");
            
            // 同时更新项目详情中的图标URL
            projectDetail.setIconUrl("/placeholder-icon.svg");
        }
        
        project.setImageUrls(projectDetail.getScreenshots());  // 使用screenshots作为imageUrls
        
        // 2. 保存基本项目信息
        Project savedProject = projectRepository.save(project);
        log.debug("项目基本信息创建成功，ID: {}", savedProject.getId());
        
        // 3. 确保项目详情使用相同的ID
        projectDetail.setId(savedProject.getId());
        
        // 4. 保存项目详情
        ProjectDetail savedDetail = projectDetailRepository.save(projectDetail);
        log.debug("项目详情创建成功，ID: {}", savedDetail.getId());
        
        // 5. 返回结果
        Map<String, Object> result = new HashMap<>();
        result.put("project", savedProject);
        result.put("detail", savedDetail);
        
        return result;
    }
} 
package tech.cspioneer.fossraderde4.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.cspioneer.fossraderde4.exception.ResourceNotFoundException;
import tech.cspioneer.fossraderde4.model.Project;
import tech.cspioneer.fossraderde4.repository.ProjectRepository;
import tech.cspioneer.fossraderde4.service.ProjectService;

import java.util.List;

/**
 * 项目服务实现类
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectRepository;
    
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
        project.setOwnerAvatarUrl(projectDetails.getOwnerAvatarUrl());
        project.setImageUrls(projectDetails.getImageUrls());
        
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
} 
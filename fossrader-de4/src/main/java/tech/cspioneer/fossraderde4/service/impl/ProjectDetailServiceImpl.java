package tech.cspioneer.fossraderde4.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.cspioneer.fossraderde4.exception.ResourceNotFoundException;
import tech.cspioneer.fossraderde4.model.ProjectDetail;
import tech.cspioneer.fossraderde4.repository.ProjectDetailRepository;
import tech.cspioneer.fossraderde4.service.ProjectDetailService;

import java.util.List;

/**
 * 项目详情服务实现类
 */
@Service
@RequiredArgsConstructor
public class ProjectDetailServiceImpl implements ProjectDetailService {
    
    private final ProjectDetailRepository projectDetailRepository;
    
    @Override
    public List<ProjectDetail> getAllProjectDetails() {
        return projectDetailRepository.findAll();
    }
    
    @Override
    public ProjectDetail getProjectDetailById(String id) {
        return projectDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("找不到ID为: " + id + " 的项目详情"));
    }
    
    @Override
    public ProjectDetail createProjectDetail(ProjectDetail projectDetail) {
        return projectDetailRepository.save(projectDetail);
    }
    
    @Override
    public ProjectDetail updateProjectDetail(String id, ProjectDetail projectDetailInfo) {
        ProjectDetail projectDetail = getProjectDetailById(id);
        
        projectDetail.setTitle(projectDetailInfo.getTitle());
        projectDetail.setDescription(projectDetailInfo.getDescription());
        projectDetail.setAuthor(projectDetailInfo.getAuthor());
        projectDetail.setPlatform(projectDetailInfo.getPlatform());
        projectDetail.setStars(projectDetailInfo.getStars());
        projectDetail.setForks(projectDetailInfo.getForks());
        projectDetail.setIssues(projectDetailInfo.getIssues());
        projectDetail.setTags(projectDetailInfo.getTags());
        projectDetail.setKeywords(projectDetailInfo.getKeywords());
        projectDetail.setScreenshots(projectDetailInfo.getScreenshots());
        projectDetail.setDetailedDescription(projectDetailInfo.getDetailedDescription());
        projectDetail.setIconUrl(projectDetailInfo.getIconUrl());
        projectDetail.setProjectAddress(projectDetailInfo.getProjectAddress());
        
        return projectDetailRepository.save(projectDetail);
    }
    
    @Override
    public void deleteProjectDetail(String id) {
        ProjectDetail projectDetail = getProjectDetailById(id);
        projectDetailRepository.delete(projectDetail);
    }
    
    @Override
    public List<ProjectDetail> findProjectDetailsByTag(String tag) {
        return projectDetailRepository.findByTagsContaining(tag);
    }
    
    @Override
    public List<ProjectDetail> findProjectDetailsByKeyword(String keyword) {
        return projectDetailRepository.findByKeywordsContaining(keyword);
    }
} 
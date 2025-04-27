package tech.cspioneer.fossraderde4.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.cspioneer.fossraderde4.model.ProjectDetail;
import tech.cspioneer.fossraderde4.service.ProjectDetailService;

import java.util.List;

/**
 * 项目详情控制器
 */
@RestController
@RequestMapping("/api/project-details")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // 允许跨域请求
public class ProjectDetailController {
    
    private final ProjectDetailService projectDetailService;
    
    /**
     * 获取所有项目详情
     * @return 项目详情列表
     */
    @GetMapping
    public ResponseEntity<List<ProjectDetail>> getAllProjectDetails() {
        List<ProjectDetail> projectDetails = projectDetailService.getAllProjectDetails();
        return new ResponseEntity<>(projectDetails, HttpStatus.OK);
    }
    
    /**
     * 根据ID获取项目详情
     * @param id 项目ID
     * @return 项目详情
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetail> getProjectDetailById(@PathVariable String id) {
        ProjectDetail projectDetail = projectDetailService.getProjectDetailById(id);
        return new ResponseEntity<>(projectDetail, HttpStatus.OK);
    }
    
    /**
     * 创建项目详情
     * @param projectDetail 项目详情
     * @return 创建后的项目详情
     */
    @PostMapping
    public ResponseEntity<ProjectDetail> createProjectDetail(@RequestBody ProjectDetail projectDetail) {
        ProjectDetail newProjectDetail = projectDetailService.createProjectDetail(projectDetail);
        return new ResponseEntity<>(newProjectDetail, HttpStatus.CREATED);
    }
    
    /**
     * 更新项目详情
     * @param id 项目ID
     * @param projectDetail 更新的项目详情
     * @return 更新后的项目详情
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDetail> updateProjectDetail(@PathVariable String id, @RequestBody ProjectDetail projectDetail) {
        ProjectDetail updatedProjectDetail = projectDetailService.updateProjectDetail(id, projectDetail);
        return new ResponseEntity<>(updatedProjectDetail, HttpStatus.OK);
    }
    
    /**
     * 删除项目详情
     * @param id 项目ID
     * @return 删除成功响应
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectDetail(@PathVariable String id) {
        projectDetailService.deleteProjectDetail(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    /**
     * 根据技术栈标签查找项目详情
     * @param tag 标签
     * @return 项目详情列表
     */
    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<ProjectDetail>> findProjectDetailsByTag(@PathVariable String tag) {
        List<ProjectDetail> projectDetails = projectDetailService.findProjectDetailsByTag(tag);
        return new ResponseEntity<>(projectDetails, HttpStatus.OK);
    }
    
    /**
     * 根据关键词查找项目详情
     * @param keyword 关键词
     * @return 项目详情列表
     */
    @GetMapping("/keyword/{keyword}")
    public ResponseEntity<List<ProjectDetail>> findProjectDetailsByKeyword(@PathVariable String keyword) {
        List<ProjectDetail> projectDetails = projectDetailService.findProjectDetailsByKeyword(keyword);
        return new ResponseEntity<>(projectDetails, HttpStatus.OK);
    }
} 
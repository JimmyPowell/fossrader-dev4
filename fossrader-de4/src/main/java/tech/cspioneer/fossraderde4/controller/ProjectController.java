package tech.cspioneer.fossraderde4.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.cspioneer.fossraderde4.controller.dto.ApiResponse;
import tech.cspioneer.fossraderde4.controller.dto.PageResponseDTO;
import tech.cspioneer.fossraderde4.model.Project;
import tech.cspioneer.fossraderde4.model.ProjectDetail;
import tech.cspioneer.fossraderde4.service.ProjectDetailService;
import tech.cspioneer.fossraderde4.service.ProjectService;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

/**
 * 项目控制器
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // 允许跨域请求
@Slf4j
public class ProjectController {
    
    private final ProjectService projectService;
    private final ProjectDetailService projectDetailService;
    
    /**
     * 获取所有项目
     * @return 项目列表
     */
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        log.debug("接收到获取所有项目的请求");
        List<Project> projects = projectService.getAllProjects();
        log.debug("返回 {} 个项目", projects.size());
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    
    /**
     * 分页获取项目
     * @param page 页码（从0开始）
     * @param size 每页大小
     * @param sort 排序字段
     * @param direction 排序方向
     * @return 分页项目列表
     */
    @GetMapping("/paged")
    public ResponseEntity<ApiResponse<PageResponseDTO<Project>>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "asc") String direction) {
        
        log.debug("接收到分页获取项目的请求，页码：{}，每页大小：{}，排序字段：{}，排序方向：{}", 
                page, size, sort, direction);
        
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
        Page<Project> projectPage = projectService.getProjects(pageable);
        
        PageResponseDTO<Project> pageResponseDTO = PageResponseDTO.fromPage(projectPage);
        ApiResponse<PageResponseDTO<Project>> response = ApiResponse.success("获取项目列表成功", pageResponseDTO);
        
        log.debug("分页查询成功，总记录数：{}，总页数：{}", 
                pageResponseDTO.getTotalElements(), pageResponseDTO.getTotalPages());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 根据ID获取项目
     * @param id 项目ID
     * @return 项目
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        log.debug("接收到根据ID获取项目的请求，ID：{}", id);
        Project project = projectService.getProjectById(id);
        log.debug("获取到ID为 {} 的项目", id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
    
    /**
     * 创建项目
     * @param project 项目
     * @return 创建后的项目
     */
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        log.debug("接收到创建项目的请求，项目内容：{}", project);
        Project newProject = projectService.createProject(project);
        log.debug("项目创建成功，ID：{}", newProject.getId());
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }
    
    /**
     * 更新项目
     * @param id 项目ID
     * @param project 更新的项目详情
     * @return 更新后的项目
     */
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project project) {
        log.debug("接收到更新项目的请求，ID：{}，项目内容：{}", id, project);
        Project updatedProject = projectService.updateProject(id, project);
        log.debug("项目更新成功，ID：{}", updatedProject.getId());
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }
    
    /**
     * 删除项目
     * @param id 项目ID
     * @return 删除成功响应
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        log.debug("接收到删除项目的请求，ID：{}", id);
        projectService.deleteProject(id);
        log.debug("项目删除成功，ID：{}", id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    /**
     * 根据标签查找项目
     * @param tag 标签
     * @return 项目列表
     */
    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<Project>> findProjectsByTag(@PathVariable String tag) {
        log.debug("接收到根据标签查找项目的请求，标签：{}", tag);
        List<Project> projects = projectService.findProjectsByTag(tag);
        log.debug("根据标签 {} 找到 {} 个项目", tag, projects.size());
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    
    /**
     * 搜索项目
     * @param keyword 关键词
     * @return 项目列表
     */
    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam String keyword) {
        log.debug("接收到搜索项目的请求，关键词：{}", keyword);
        List<Project> projects = projectService.searchProjects(keyword);
        log.debug("根据关键词 {} 搜索到 {} 个项目", keyword, projects.size());
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    
    /**
     * 项目点赞
     * @param id 项目ID
     * @return 更新后的项目
     */
    @PostMapping("/{id}/like")
    public ResponseEntity<Project> likeProject(@PathVariable String id) {
        log.debug("接收到项目点赞的请求，ID：{}", id);
        Project project = projectService.likeProject(id);
        log.debug("项目点赞成功，ID：{}，当前点赞数：{}", id, project.getLikes());
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
    
    /**
     * 获取项目总数
     * @return 项目总数
     */
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getProjectCount() {
        log.debug("接收到获取项目总数的请求");
        long count = projectService.getProjectCount();
        Map<String, Long> countMap = new HashMap<>();
        countMap.put("count", count);
        ApiResponse<Map<String, Long>> response = ApiResponse.success("获取项目总数成功", countMap);
        log.debug("项目总数：{}", count);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 统一创建完整项目（包括基本信息和详情）
     * @param projectDetail 完整的项目详情
     * @return 包含创建后的项目基本信息和详情的响应
     */
    @PostMapping("/complete")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createCompleteProject(@RequestBody ProjectDetail projectDetail) {
        log.debug("接收到创建完整项目的请求，项目内容：{}", projectDetail);
        
        // 调用服务层方法处理创建完整项目的逻辑
        Map<String, Object> result = projectService.createCompleteProject(projectDetail);
        log.debug("项目创建成功，ID：{}", ((Project)result.get("project")).getId());
        
        ApiResponse<Map<String, Object>> response = ApiResponse.success("项目创建成功", result);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
} 
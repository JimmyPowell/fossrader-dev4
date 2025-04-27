package tech.cspioneer.fossraderde4.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 分页响应数据传输对象
 * @param <T> 数据类型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResponseDTO<T> {
    
    private List<T> content;         // 分页内容
    private int pageNumber;          // 当前页码
    private int pageSize;            // 每页大小
    private long totalElements;      // A总元素数量
    private int totalPages;          // 总页数
    private boolean first;           // 是否为第一页
    private boolean last;            // 是否为最后一页
    private boolean empty;           // 是否为空
    
    /**
     * 从Spring Data Page创建PageResponseDTO
     * @param page Spring Data Page
     * @param <T> 数据类型
     * @return PageResponseDTO
     */
    public static <T> PageResponseDTO<T> fromPage(Page<T> page) {
        return new PageResponseDTO<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast(),
                page.isEmpty()
        );
    }
} 
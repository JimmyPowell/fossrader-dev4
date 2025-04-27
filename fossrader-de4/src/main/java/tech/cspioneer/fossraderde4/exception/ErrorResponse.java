package tech.cspioneer.fossraderde4.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

/**
 * 错误响应
 */
@Data
@AllArgsConstructor
public class ErrorResponse {
    
    private Date timestamp;
    private int status;
    private String error;
    private String message;
    private String details;
} 
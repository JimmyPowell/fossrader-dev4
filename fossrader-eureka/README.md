# Fossrader Eureka Server

这是Fossrader项目的微服务注册中心，基于Spring Cloud Eureka实现。

## 功能特性

- 服务注册与发现：允许微服务注册到Eureka服务器，并从中发现其他服务
- 自动集成Spring Security：提供基本的安全认证
- 监控端点：集成Spring Boot Actuator提供系统监控功能

## 技术栈

- Spring Boot 2.7.15
- Spring Cloud 2021.0.8
- Spring Cloud Netflix Eureka Server
- Spring Security

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.6+

### 编译与运行

```bash
# 编译项目
mvn clean package

# 运行项目
java -jar target/fossrader-eureka-0.0.1-SNAPSHOT.jar
```

### 访问服务

- Eureka管理页面: http://localhost:8761
- 用户名: admin
- 密码: fossrader123

## 配置说明

配置文件位于 `src/main/resources/application.yml`，主要配置包括：

- 服务端口: 8761
- 应用名称: fossrader-eureka-server
- 安全认证信息
- Eureka服务器配置
- 监控端点配置 
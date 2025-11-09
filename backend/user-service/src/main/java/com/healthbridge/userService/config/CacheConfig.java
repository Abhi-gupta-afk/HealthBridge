package com.healthbridge.userService.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    // Spring Boot auto-configures a ConcurrentMapCacheManager for development
    // In production, consider using Redis or Caffeine for better performance
}

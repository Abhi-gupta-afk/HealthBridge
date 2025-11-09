package com.healthbridge.gatewayService.filter;

import com.healthbridge.gatewayService.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        // Skip JWT validation for public endpoints
        if (path.startsWith("/api/auth/login") || 
            path.startsWith("/api/auth/register") ||
            path.contains("/swagger-ui") ||
            path.contains("/api-docs") ||
            path.contains("/v3/api-docs") ||
            path.contains("/actuator")) {
            return chain.filter(exchange);
        }

        // Extract JWT token
        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        // Validate token
        try {
            if (jwtUtil.isTokenValid(token)) {
                String username = jwtUtil.extractUsername(token);
                // Add username to request header for downstream services
                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                        .header("X-User-Email", username)
                        .build();
                return chain.filter(exchange.mutate().request(modifiedRequest).build());
            } else {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }

    @Override
    public int getOrder() {
        return -100;
    }
}

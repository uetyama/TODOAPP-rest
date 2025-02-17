package com.example.todo_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 全エンドポイントに対して
                        .allowedOrigins("http://localhost:5173") // 許可するオリジン
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するHTTPメソッド
                        .allowedHeaders("*") // 全ヘッダーを許可
                        .allowCredentials(true); // 認証情報を許可
            }
        };
    }
}

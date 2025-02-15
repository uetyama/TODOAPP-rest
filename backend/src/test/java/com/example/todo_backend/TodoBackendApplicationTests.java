package com.example.todo_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = TodoBackendApplication.class, 
                  properties = "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration")
public class TodoBackendApplicationTests {

    @Test
    void contextLoads() {
        // コンテキストロードのテスト
    }
}

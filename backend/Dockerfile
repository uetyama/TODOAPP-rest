# Build stage: Maven+JDK21のイメージを使ってビルド
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Run stage: ランタイム環境としてopenjdk:21を使用
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/todo-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

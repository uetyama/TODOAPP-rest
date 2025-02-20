# ベースイメージ
FROM openjdk:21-jdk-slim

# 作業ディレクトリ
WORKDIR /app

# Mavenでビルド（マルチステージビルド推奨）
COPY target/todo-backend-0.0.1-SNAPSHOT.jar app.jar


# ポートを開放
EXPOSE 8080

# アプリ起動
CMD ["java", "-jar", "app.jar"]

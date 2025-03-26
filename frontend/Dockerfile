# ビルド用ステージ
FROM node:18-alpine AS build
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 環境変数を渡す
ARG VITE_LOCAL_API_HOST
ARG VITE_LOCAL_API_PATH
ENV VITE_LOCAL_API_HOST=$VITE_LOCAL_API_HOST
ENV VITE_LOCAL_API_PATH=$VITE_LOCAL_API_PATH

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# プロダクションビルドを実行（Viteの場合は "npm run build" など）
RUN npm run build

# Nginx ステージ
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

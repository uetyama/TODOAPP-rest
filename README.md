# TODO App (Spring Boot & React)

このプロジェクトは、Spring Boot をバックエンド、React をフロントエンドに採用したシンプルな TODO 管理アプリ

#　バージョン

- **Java**: 21.0.6 (2025-01-21 LTS)  
  - Java(TM) SE Runtime Environment (build 21.0.6+8-LTS-188)  
  - Java HotSpot(TM) 64-Bit Server VM (build 21.0.6+8-LTS-188, mixed mode, sharing)
- **Node.js**: v22.13.1
- **MySQL**: 8.x 系

## 概要

- **バックエンド (Spring Boot):**

  - REST API で TODO の取得（GET `/todos/read`）と作成（POST `/todos/create`）を実装。
  - Spring Data JPA を利用し、SQL 文なしで DB 操作が可能。
  - CORS 設定で React アプリ（例: `http://localhost:3000`）からのアクセスを許可。

- **フロントエンド (React):**
  - axios でバックエンド API に接続し、TODO リストを取得・追加。
  - React の状態管理（useState）でチェックボックスのオンオフを実装（現状はフロント側のみ）。

## セットアップ

### バックエンド

1. リポジトリをクローンし、プロジェクトディレクトリへ移動。
2. `application.properties`に DB 接続情報を設定。
3. Spring Boot で Web サーバーを立ち上げる
   ```bash
   java -jar your.jar
   ```
   ※ デフォルトでは `http://localhost:8080` で動作

### フロントエンド

1. 別ディレクトリ（または同一リポジトリ内）に移動。
2. 依存関係をインストール：
   ```bash
   npm install
   ```
3. アプリケーションを起動：
   ```bash
   npm start
   npm run dev
   ```
   ※ デフォルトでは `http://localhost:3000` で動作

## API エンドポイント

- **GET /todos/read**

  - DB 内の全 TODO を JSON 形式で返却

- **POST /todos/create**
  - リクエストボディの TODO 情報を DB に保存し、作成済み TODO を返却

## 今後の予定

- チェックボックス状態変更のバックエンド反映（PATCH/PUT の追加）
- 認証機能の実装など

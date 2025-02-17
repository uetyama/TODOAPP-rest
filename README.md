# TODO App (Spring Boot & React)

このプロジェクトは、Spring Bootをバックエンド、Reactをフロントエンドに採用したシンプルなTODO管理アプリです。

## 概要

- **バックエンド (Spring Boot):**  
  - REST APIでTODOの取得（GET `/todos/read`）と作成（POST `/todos/create`）を実装。
  - Spring Data JPAを利用し、SQL文なしでDB操作が可能。
  - CORS設定でReactアプリ（例: `http://localhost:3000`）からのアクセスを許可。

- **フロントエンド (React):**  
  - axiosでバックエンドAPIに接続し、TODOリストを取得・追加。
  - Reactの状態管理（useState）でチェックボックスのオンオフを実装（現状はフロント側のみ）。

## セットアップ

### バックエンド

1. リポジトリをクローンし、プロジェクトディレクトリへ移動。
2. `application.properties`にDB接続情報を設定。
3. Mavenでビルド＆起動：
   ```bash
   mvn clean install
   mvn spring-boot:run
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
   ```
   ※ デフォルトでは `http://localhost:3000` で動作

## API エンドポイント

- **GET /todos/read**  
  - DB内の全TODOをJSON形式で返却

- **POST /todos/create**  
  - リクエストボディのTODO情報をDBに保存し、作成済みTODOを返却

## 今後の予定

- チェックボックス状態変更のバックエンド反映（PATCH/PUTの追加）
- 認証機能の実装など

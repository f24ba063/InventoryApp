# InventoryApp

## 概要
Java(Spring Boot) + フロントエンド(JS/HTML)で作成した簡易在庫管理アプリです。  
ポートフォリオ用のサンプルとして作成しており、実務運用は想定していません。

## 主な機能
- 在庫アイテムの一覧表示
- アイテムの作成・編集・削除 (CRUD)
- 数量・価格・名前での並び替え
- 編集のキャンセル機能

## 使用技術
- バックエンド: Java, Spring Boot, JPA, Oracle DB
- フロントエンド: HTML, JavaScript (モジュール構成)
- ビルド: Maven
- IDE: Eclipse / STS / IntelliJ など

## セットアップ方法
1. Mavenをインストール  
2. Oracle Database XEをインストール  
3. DBユーザー作成・権限付与  
4. 本プログラムのzipをダウンロード  
5. プログラムを解凍し、`application.properties` 内のDB接続情報を書き換え  
6. コマンドプロンプトから `mvn clean install` で依存ライブラリを解決  
7. コマンドプロンプトから `mvn spring-boot:run`、または JDK 上で  
   `\inventoryApp\src\main\java\com\example\demo\InventoryApplication.java` を実行して Spring Boot を起動  
8. ブラウザで以下を開く:  
http://localhost:8080/index.html

markdown
コードをコピーする
CRUD 操作が可能です。

> **注意:** 起動すると対象テーブルのデータが削除され、試験用のデータが挿入されるようコードされています。ご注意ください

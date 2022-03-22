# 短網址產生器

![image](https://github.com/Kate-Chu/URL_Shortener/blob/main/imgs/Url_Shortener_intro.png)

## Web Page - 雲端部署版本

View on Heroku: https://powerful-taiga-78579.herokuapp.com/

## Features - 產品功能

1. 使用者可以在表單輸入原始網址，送出表單之後，畫面會回傳格式化後的短網址
2. 在伺服器啟動期間，使用者可以在瀏覽器的網址列，輸入你提供的短網址，瀏覽器就會導向原本的網站

## Prerequisites - 環境建置與需求

1. Node.js v16.13.1
2. Express v4.17.3
3. Express-Handlebars v6.0.3
4. Mongoose v6.2.6
5. Body-Parser: 1.19.2

## Installing - 專案安裝流程

1. 確認本地端已安裝 node.js 與 npm

2. 使用終端機 (Terminal) 複製此專案至本機電腦

```
git clone https://github.com/Kate-Chu/URL_Shortener.git
```

3. 開啟終端機，進入存放此專案的資料夾

```
cd URL_Shortener
```

4. 安裝套件

```
npm install

```

5. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

6. 當終端機出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on localhost:3000
```

7. 開啟任一瀏覽器，輸入 [http://localhost:3000](http://localhost:3000) ，或 (MacOS 系統) 在終端機中按住 Command 鍵點選 [http://localhost:3000]，即可開始使用我的餐廳清單網頁

8. 在終端機按下 control + C 即可結束程式

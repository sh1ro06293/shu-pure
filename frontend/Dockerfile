# front
FROM node:20

WORKDIR /usr/src/app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install --legacy-peer-deps

# アプリのソースコードをコピー
COPY . .

CMD ["npm", "start"]
# MySQL 5.7の公式イメージを使用
FROM mysql:5.7

# 環境変数の設定
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=shupure
ENV MYSQL_USER=shiro
ENV MYSQL_PASSWORD=shiro06293

# 初期化用SQLファイルをコンテナにコピー
COPY ./init.sql /docker-entrypoint-initdb.d/init.d

# ポートを公開（必要に応じて）
EXPOSE 3307

from ext import db
from flask_login import UserMixin


# ユーザーテーブル
class UserTable(db.Model, UserMixin):
    __tablename__ = "UserTable"
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(100), nullable=False, unique=True)
    Password = db.Column(db.String(100), nullable=False)


# 投稿テーブル
class PostTable(db.Model):
    __tablename__ = "PostTable"
    Id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(100), nullable=False)
    PostTime = db.Column(db.DateTime, nullable=False)
    UserId = db.Column(db.Integer, db.ForeignKey("UserTable.Id"), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    UseKnife = db.Column(db.Boolean, nullable=False)
    UseFire = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.String(100), nullable=True)


# レシピテーブル
class RecipeTable(db.Model):
    __tablename__ = "RecipeTable"
    Id = db.Column(db.Integer, primary_key=True)
    PostId = db.Column(db.Integer, db.ForeignKey("PostTable.Id"), nullable=False)
    Recipe = db.Column(db.Text, nullable=False)


# 食材テーブル
class FoodStuffTable(db.Model):
    __tablename__ = "FoodStuffTable"
    Id = db.Column(db.Integer, primary_key=True)
    PostId = db.Column(db.Integer, db.ForeignKey("PostTable.Id"), nullable=False)
    FoodName = db.Column(db.String(50), nullable=False)
    Amount = db.Column(db.String(50), nullable=False)


# 投稿タグテーブル
class PostTagTable(db.Model):
    __tablename__ = "PostTagTable"
    Id = db.Column(db.Integer, primary_key=True)
    PostId = db.Column(db.Integer, db.ForeignKey("PostTable.Id"), nullable=False)
    TagID = db.Column(db.Integer, db.ForeignKey("TagTable.Id"), nullable=False)


# タグテーブル
class TagTable(db.Model):
    __tablename__ = "TagTable"
    Id = db.Column(db.Integer, primary_key=True)
    TagName = db.Column(db.String(50), nullable=False)


# ブックマークテーブル
class BookmarkTable(db.Model):
    __tablename__ = "BookmarkTable"
    Id = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey("UserTable.Id"), nullable=False)
    PostId = db.Column(db.Integer, db.ForeignKey("PostTable.Id"), nullable=False)


# アンケートテーブル
class EnqueteTable(db.Model):
    __tablename__ = "EnqueteTable"
    Id = db.Column(db.Integer, primary_key=True)
    PostId = db.Column(db.Integer, db.ForeignKey("PostTable.Id"), nullable=False)
    UserId = db.Column(db.Integer, db.ForeignKey("UserTable.Id"), nullable=False)
    TagId = db.Column(db.Integer, db.ForeignKey("TagTable.Id"), nullable=False)

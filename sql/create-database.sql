use artifiziTest;
go

CREATE TABLE asset (
  id VARCHAR(48) NOT NULL  PRIMARY KEY,
  name TEXT NOT NULL,
  url VARCHAR(256) NOT NULL,
  is_public BIT NOT NULL DEFAULT 0
);
go

-- INSERT INTO asset(id, name, url, is_public)
--     VALUES ('12345678900101001', 'test Assset', 'this/is/a/test/url', 1);


CREATE TABLE article (
  id VARCHAR(48) NOT NULL  PRIMARY KEY,
  main_heading TEXT NOT NULL,
  sub_heading TEXT NOT NULL,
  data TEXT,
  is_public BIT NOT NULL DEFAULT 0
);
go

-- INSERT INTO article
-- VALUES ('111111111', 'test heading', 'test subheading', 'lorpum ipunm tes is some thing', 1);
-- go

CREATE TABLE article_asset(
  id INT IDENTITY,
  asset_id VARCHAR(48) FOREIGN KEY REFERENCES asset(id),
  article_id VARCHAR(48) FOREIGN KEY REFERENCES article(id),
  is_thumbnail BIT NOT NULL DEFAULT 0,
  CONSTRAINT PK_thumbnail PRIMARY KEY(asset_id, article_id, is_thumbnail)
)
go

-- DROP TABLE thumbnail;

-- INSERT INTO article_asset(asset_id, article_id, is_thumbnail) VALUES ('12345678900101001', '111111111', 1);


-- SELECT * from article;

-- DROP TABLE  article;

-- SELECT *
-- from asset FULL JOIN article_asset On asset.id = article_asset.asset_id
-- WHERE  article_asset.article_id = '111111111';
import { ArticleFactory } from "./article-factory";
import * as uuid from "uuid";
import { Article } from "../../models/article";
import { Asset } from "../../models/asset";

export class DefaultAssetFactory implements ArticleFactory
{
    public create(mainHeading: string, data: string, isPublic: boolean, subHeading?: string, thumbNail?: Asset, assets?: Asset[]): Promise<Article>
    {
        let id = uuid.v4();
        subHeading = subHeading && !subHeading.isEmptyOrWhiteSpace() ? subHeading : null;
        assets = assets && !(assets.length === 0) ? assets.map(t => t) : [];
        thumbNail = thumbNail ? thumbNail : null;
        return Promise.resolve(new Article(id, mainHeading, data, assets, data, thumbNail, isPublic));
    }
}
import { Article } from "../../models/article";
import { Asset } from "../../models/asset";

export interface ArticleFactory
{
    create(mainHeading: string, data: string, isPublic: boolean,
        subHeading?: string, thumbNail?: Asset, assets?: Asset[]): Promise<Article>;
}
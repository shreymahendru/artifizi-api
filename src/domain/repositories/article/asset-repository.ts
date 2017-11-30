import { Article } from "../../models/article";

export interface ArticleRepository
{
    save(article: Article): Promise<void>;
    getAll(): Promise<Array<Article>>;
    get(id: string): Promise<Article>;
    delete(id: string): Promise<void>;
}
import { Asset } from "../../models/asset";

export interface AssetFactory
{
    create(name: string, url: string, isPublic: boolean): Promise<Asset>;
}
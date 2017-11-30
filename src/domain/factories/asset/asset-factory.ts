import { Asset } from "../../models/asset";

export interface AssetFactory
{
    create(name: string, isPublic: boolean, image: string): Promise<Asset>;
}
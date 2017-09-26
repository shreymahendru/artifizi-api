import { Asset } from "../../models/asset";

export interface AssetRepository
{
    save(asset: Asset): Promise<void>;
    getAll(): Promise<Array<Asset>>;
    get(id: string): Promise<Asset>;
    delete(id: string): Promise<void>;
}
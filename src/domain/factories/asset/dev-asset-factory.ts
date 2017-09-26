import { AssetFactory } from "./asset-factory";
import * as uuid from "uuid";
import { Asset } from "../../models/asset";

export class DevAssetFactory implements AssetFactory
{
    public create(name: string, url: string, isPublic: boolean): Promise<Asset>
    {
        return Promise.resolve(new Asset(uuid.v4(), name, url, isPublic));
    }
}
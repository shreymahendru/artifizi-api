import { AssetFactory } from "./asset-factory";
import * as uuid from "uuid";
import { Asset } from "../../models/asset";

export class DefaultAssetFactory implements AssetFactory
{
    public create(name: string, isPublic: boolean, image_data: string): Promise<Asset>
    {
        //  can put Image to S3 here 
        let urlGenerated: string = "This is the test url";
        return Promise.resolve(new Asset(uuid.v4(), name, urlGenerated, isPublic));
    }
}
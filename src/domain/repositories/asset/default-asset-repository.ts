// import { AssetRepository } from "./asset-repository";
// import { Asset } from "../../models/asset";
// import { inject } from "n-ject";
// import { given } from "n-defensive";
// import { DbConnectionService } from "../../../services/db-connection-service";
// import { ApplicationException } from "n-exception";

// @inject("DbConnectionService")
// export class DefaultAssetRepository implements AssetRepository
// {
//     private _dbConnectionService: DbConnectionService;
    
//     public constructor(dbConnectionService: DbConnectionService)
//     {
//         given(dbConnectionService, "dbConnectionService").ensureHasValue();
        
//         this._dbConnectionService = dbConnectionService;
//     }
    
//     public async save(asset: Asset): Promise<void>
//     {
//         throw new Error("Method not  implemented." + asset);
//     }
//     public async getAll(): Promise<Asset[]>
//     {
//         throw new Error("Method not implemented.");
//     }
//     public async get(id: string): Promise<Asset>
//     {
//         given(id, "id").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        
//         let connection = await this._dbConnectionService.getConnection();
        
        
//         let querResult = await connection.query`select * from asset where id = ${id}`;
        
//         if (querResult.recordsets.length === 0)
//             throw new ApplicationException("not found");
        
//         let assetRaw: AssetRaw = (<AssetRaw>)querResult.recordsets[0] as AssetRaw; 
        
//         return new Asset(assetRaw.id, assetRaw.name, assetRaw.url, assetRaw.is_public);
        
//     }
//     public async delete(id: string): Promise<void>
//     {
//         throw new Error("Method not implemented." + id);
//     }
// }

// interface AssetRaw
// {
//     id: string;
//     name: string;
//     url: string;
//     is_public: boolean;
// }
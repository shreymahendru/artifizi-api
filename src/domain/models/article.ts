import { given } from "n-defensive";
import { Asset } from "./asset";
import { BaseModel } from "./base-model";

export class Article extends BaseModel
{
    private _heading: string;
    private _subHeading: string;
    private _assets: Array<Asset>;
    private _thumbNail: Asset;
    private _data: string;
    
    public get heading(): string { return this._heading; }
    public get subHeading(): string { return this._subHeading; }
    public get assets(): Array<Asset> { return this._assets; }
    public get thumbnail(): Asset { return this._thumbNail; }
    public get data(): string { return this._data; }
    
    public constructor(id: string, heading: string, subHeading: string,
        assets: Array<Asset>, data: string, thumbNail: Asset, isPublic: boolean)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString();
        given(isPublic, "isPublic")
            .ensureHasValue()
            .ensureIsBoolean();
        given(heading, "heading")
            .ensureHasValue()
            .ensureIsString();
        given(subHeading, "subHeading")
            .ensureHasValue()
            .ensureIsString();
        given(data, "data")
            .ensureHasValue()
            .ensureIsString();
        given(assets, "assets")
            .ensureHasValue()
            .ensureIsArray();
        given(thumbNail, "thumbNail")
            .ensureHasValue()
            .ensureIsArray();
        
        super(id, isPublic); 
        this._heading = heading;
        this._subHeading = subHeading;
        this._assets = assets;
        this._data = data;
        this._thumbNail = thumbNail;
    }
    
    public updateHeading(heading: string)
    {
        given(heading, "heading")
            .ensureHasValue()
            .ensureIsString();
        this._heading = heading;
    }
    
    public updateSubHeading(subHeading: string)
    {
        given(subHeading, "subHeading")
            .ensureHasValue()
            .ensureIsString();
        this._subHeading = subHeading;
    }
    public updateThumbnail(thumbnail: Asset)
    {
        given(thumbnail, "thumbnail")
            .ensureHasValue()
        this._thumbNail = thumbnail;
    }
    public addAsset(asset: Asset)
    {
        given(asset, "asset")
            .ensureHasValue();
        let newAsset = new Asset(asset.id, asset.name, asset.url, asset.isPublic);
        this._assets.push(newAsset); 
    }
    public removeAsset(asset: Asset)
    {
        given(asset, "asset")
            .ensureHasValue();
        
        this._assets.find(t => t.id == asset.id);
        this._assets.remove(asset);
    }
    
    public updateData(data: string)
    {
        given(data, "data")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        this._data = data;
    }
}
import { given } from "n-defensive";
import { Asset } from "./asset";

export class Article
{
    private _id: string;
    private _mainHeading: string;
    private _subHeading: string;
    private _assets: Array<Asset>;
    private _thumbNail: Asset;
    private readonly _isPublic: boolean;
    private _data: string;
    
    public constructor(id: string, mainHeading: string, subHeading: string,
        assets: Array<Asset>, data: string, thumbNail: Asset, isPublic: boolean)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString();
        given(isPublic, "isPublic")
            .ensureHasValue()
            .ensureIsBoolean();
        given(mainHeading, "mainHeading")
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
        
        this._id = id;
        this._mainHeading = mainHeading;
        this._subHeading = subHeading;
        this._assets = assets;
        this._data = data;
        this._thumbNail = thumbNail;
        this._isPublic = isPublic;
    }
}
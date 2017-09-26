import { given } from "n-defensive";

export class Asset
{
    private readonly _id: string;
    private readonly _name: string;
    private readonly _url: string;
    private readonly _isPublic: boolean;
    
    public constructor(id: string, name: string, url: string, isPublic: boolean)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString();
        given(name, "name")
            .ensureHasValue()
            .ensureIsString();
        given(url, "url")
            .ensureHasValue()
            .ensureIsString();
        given(isPublic, "isPublic")
            .ensureHasValue()
            .ensureIsString();
        this._id = id;
        this._name = name; 
        this._url = url;
        this._isPublic = isPublic;
    } 
}
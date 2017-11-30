import { given } from "n-defensive";
import { BaseModel } from "./base-model";

export class Asset extends BaseModel
{
    private  _name: string;
    private  _url: string;
    
    public get name(): string { return this._name; }
    public get url(): string { return this._url; }
    
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
        super(id, isPublic);
        this._name = name; 
        this._url = url;
    }
    
    public updateName(name: string)
    {
        given(name, "name")
            .ensureHasValue()
            .ensureIsString();
        this._name = name; 
    }
    
    public updateUrl(url: string)
    {
        given(url, "url")
            .ensureHasValue()
            .ensureIsString();
        this._url = url;
    }
}
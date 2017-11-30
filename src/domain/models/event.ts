import { given } from "n-defensive";
import { BaseModel } from "./base-model";

export class Event extends BaseModel
{ 
    private  _name: string;
    private  _url: string;
    private  _description: string;
    private _startDate: number;
    private _endDate: number;

    public get name(): string { return this._name; }
    public get url(): string { return this._url; }
    public get description(): string { return this._description; }
    public get startDate(): number { return this._startDate; }
    public get endDate(): number { return this._endDate; }
    
    public constructor(id: string, name: string,
        url: string, isPublic: boolean, description: string)
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
        given(description, "description")
            .ensureHasValue()
            .ensureIsString();
        given(isPublic, "isPublic")
            .ensureHasValue()
            .ensureIsString();
        
        super(id, isPublic); 
        this._name = name;
        this._url = url;
        this._description = description;
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
    
    public updateDescription(description: string)
    {
        given(description, "description")
            .ensureHasValue()
            .ensureIsString();
        this._description = description;
    }

    public updateStartDate(date: number)
    {
        given(date, "date")
            .ensureHasValue()
            .ensureIsNumber();
        
        this._startDate = date;
    }
    
    public updateEndDate(date: number)
    {
        given(date, "date")
            .ensureHasValue()
            .ensureIsNumber();

        this._endDate = date;
    }
}
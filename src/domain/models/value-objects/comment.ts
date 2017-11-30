import { User } from "../user";
import { given } from "n-defensive";

export class Comment
{
    private readonly _id: string;
    private readonly _user: User; 
    private _data: string;
    private _lastedUpdated: number;
    
    public get id(): string { return this._id; }
    public get user(): User { return this._user; }
    public get data(): string { return this._data; }
    public get lastedUpdated(): number { return this._lastedUpdated; }
    
    public constructor(id: string, user: User, data: string, lastUpdated: number)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        this._id = id;
        this._user = user;
        this._data = data; 
        this._lastedUpdated = lastUpdated;
    }
    
    public updateData(newData: string)
    {
        given(newData, "newData")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        this._data = newData;
        this._lastedUpdated = Date.now();
    }
}
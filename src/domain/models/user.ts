import { BaseModel } from "./base-model";
import { given } from "n-defensive";

export class User
{
    private _id: string;
    private _name: string;
    private _email: string;
    private _liked: Array<BaseModel>;
    private _commented: Array<BaseModel>;
    
    public get id(): string { return this._id; }
    public get name(): string { return this._name; }
    public get email(): string { return this._email; }
    public get liked(): Array<BaseModel> { return this._liked; }
    public get commented(): Array<BaseModel> { return this._commented; }
    
    
    public constructor(id: string, name: string, email: string, commented: Array<BaseModel>, liked: Array<BaseModel>)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        given(name, "name")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        this._id = id;
        this._email = email;
        this._commented = commented;
        this._liked = liked;
        this._name = name; 
    }
    
    public updateName(name: string)
    {
        given(name, "name")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        this._name = name;
    }
    
    public updateEmail(Email: string)
    {
        given(Email, "Email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        this._email = Email;
    }
    
    public addLiked(model: BaseModel)
    {
        given(model, "model")
            .ensureHasValue();
        this._liked.push(model)
    }
    
    public removeLiked(model: BaseModel)
    {
        given(model, "model")
            .ensureHasValue();
        let modelToDelete = this._liked.find(t => t.id === model.id);
        this._liked.remove(modelToDelete);
    }
    
    public addComment(model: BaseModel)
    {
        given(model, "model")
            .ensureHasValue();
        this._commented.push(model)
    }

    public removeComment(model: BaseModel)
    {
        given(model, "model")
            .ensureHasValue();
        let modelToDelete = this._commented.find(t => t.id === model.id);
        this._commented.remove(modelToDelete);
    }  
} 
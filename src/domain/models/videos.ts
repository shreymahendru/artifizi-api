import { given } from "n-defensive";

export class Video
{
    private readonly _id: string;
    private readonly _name: string;
    private readonly _url: string;
    private readonly _isPublic: boolean;
    private readonly _description: string;

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
        this._id = id;
        this._name = name;
        this._url = url;
        this._isPublic = isPublic;
        this._description = description;
    }
}
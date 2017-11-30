import { given } from "n-defensive";
import { User } from "./user";
import { Comment } from "./value-objects/comment";

export class BaseModel
{
    private readonly _id: string;
    private _isPublic: boolean;
    private _comments: Array<Comment>;
    private _likedByUser: Array<User>;

    public get id(): string { return this._id; }
    public get isPublic(): boolean { return this._isPublic; }
    public comments(): Array<Comment> { return this._comments; }
    public likedByUser(): Array<User> { return this._likedByUser; }

    public constructor(id: string, isPublic: boolean)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString();
        given(isPublic, "isPublic")
            .ensureHasValue()
            .ensureIsString();
        this._id = id;
        this._isPublic = isPublic;
    }

    public updatePublicStatus(status: boolean)
    {
        given(status, "status")
            .ensureHasValue()
            .ensureIsString();
        this._isPublic = status;
    }
    
    public addComment(comment: Comment)
    {
        given(comment, "comment")
            .ensureHasValue();
        this._comments.push(comment);
    }
    public removeComment(comment: Comment)
    {
        given(comment, "comment")
            .ensureHasValue();

        this._comments.find(t => t.id == comment.id);
        this._comments.remove(comment);
    }
    
    public addLike(user: User)
    {
        given(user, "user")
            .ensureHasValue();
        this._likedByUser.push(user);
    }
    public removeLike(user: User)
    {
        given(user, "user")
            .ensureHasValue();

        this._likedByUser.find(t => t.id == user.id);
        this._likedByUser.remove(user);
    }
}
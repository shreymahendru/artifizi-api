import * as uuid from "uuid";
import { CommentFactory } from "./comment-factory";
import { User } from "../../models/user";
import { Comment } from "../../models/value-objects/comment";
import { given } from "n-defensive";

export class DefaultCommentFactory implements CommentFactory 
{
    public create(user: User, data: string): Comment
    {
        given(user, "user").ensureHasValue(); 
        given(data, "data").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        
        let id = uuid.v4();
        return new Comment(id, user, data, Date.now());  
    }
}
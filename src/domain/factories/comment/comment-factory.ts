import { Comment } from "../../models/value-objects/comment";
import { User } from "../../models/user";

export interface CommentFactory
{
    create(user: User, data: string): Comment; 
}
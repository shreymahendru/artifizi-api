import { User } from "../../models/user";

export interface UserFactory
{
    create(name: string, email: string, password: string): Promise<User>;
}
import { UserFactory } from "./user-factory";
import { User } from "../../models/user";
import * as uuid from "uuid";
import { given } from "n-defensive";
import { Promise } from "mssql";

export class DevUserFactory implements UserFactory
{
    public create(name: string, email: string, password: string): Promise<User>
    {
        given(name, "name")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        given(password, "password")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let id = uuid.v4();
        
        // hash password here
        
        return Promise.resolve(new User(id, name, email, [], [], password));
    }
    
}
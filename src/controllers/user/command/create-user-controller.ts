import { given } from "n-defensive";
import { command, route, Controller, HttpException, Utils } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";
import { UserFactory } from "../../../domain/factories/user/user-factory";
import { UserRepository } from "../../../domain/repositories/user/user-repository";

@command
@route(Routes.createUser)
@inject("UserFactory", "UserRepository", "ConfigService")
export class CreateUserController extends Controller
{
    private readonly _userFactory: UserFactory;
    private readonly _userRepository: UserRepository;
    private readonly _configService: ConfigService;

    public constructor(userFactory: UserFactory, userRepository: UserRepository, configService: ConfigService)
    {
        given(userFactory, "userFactory").ensureHasValue();
        given(userRepository, "userRepository").ensureHasValue();
        given(configService, "configService").ensureHasValue();
        super();
        this._userFactory = userFactory;
        this._userRepository = userRepository;
        this._configService = configService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);

        let newUser = await this._userFactory.create(model.name, model.email, model.password);
        
        await this._userRepository.save(newUser); 

        let baseUrl = await this._configService.getBaseUrl();
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            links: {
                self: Utils.generateUrl(Routes.getUser, { id: newUser.id }, baseUrl),
                update: Utils.generateUrl(Routes.updateUser, { id: newUser.id }, baseUrl),
                delete: Utils.generateUrl(Routes.deleteUser, { id: newUser.id }, baseUrl)
            }
        };
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        validator.for<string>("name").isRequired().useValidationRule(strval.hasMaxLength(10));
        validator.for<string>("email").isRequired().useValidationRule(strval.hasMaxLength(100));
        validator.for<string>("password").isRequired().useValidationRule(strval.hasMaxLength(100));
        
        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    name: string;
    email: string;
    password: string;
}

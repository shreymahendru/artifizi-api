import { given } from "n-defensive";
import { command, route, Controller, HttpException, Utils } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";
import { UserRepository } from "../../../domain/repositories/user/user-repository";

@command
@route(Routes.updateUser)
@inject("UserRepository", "ConfigService")
export class UpdateUserController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _configService: ConfigService;

    public constructor(userRepository: UserRepository, configService: ConfigService)
    {
        given(userRepository, "userRepository").ensureHasValue();
        given(configService, "configService").ensureHasValue();
        super();
        this._userRepository = userRepository;
        this._configService = configService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);

        let user = await this._userRepository.get(model.id);
        user.updateName(model.name);
        user.updateEmail(model.email);
        
        await this._userRepository.save(user);

        let baseUrl = await this._configService.getBaseUrl();
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            links: {
                self: Utils.generateUrl(Routes.getUser, { id: user.id }, baseUrl),
                update: Utils.generateUrl(Routes.updateUser, { id: user.id }, baseUrl),
                delete: Utils.generateUrl(Routes.deleteUser, { id: user.id }, baseUrl)
            }
        };
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        validator.for<string>("id").isRequired().useValidationRule(strval.hasMaxLength(10));
        validator.for<string>("name").isRequired().useValidationRule(strval.hasMaxLength(10));
        validator.for<string>("email").isRequired().useValidationRule(strval.hasMaxLength(100));

        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    id: string;
    name: string;
    email: string;
}

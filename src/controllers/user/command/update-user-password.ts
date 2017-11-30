import { given } from "n-defensive";
import { command, route, Controller, HttpException, Utils } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";
import { UserRepository } from "../../../domain/repositories/user/user-repository";
import { UserNotFoundException } from "../../../exceptions/user-not-found-exception";

@command
@route(Routes.updateUserPassword)
@inject("UserRepository", "ConfigService")
export class UpdateUserPasswordController extends Controller
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
        
        if (user == null)
            throw new UserNotFoundException(model.id);    
        
        user.updatePassword(model.password);

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
        validator.for<string>("password").isRequired().useValidationRule(strval.hasMaxLength(100));

        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    id: string;
    password: string;
}

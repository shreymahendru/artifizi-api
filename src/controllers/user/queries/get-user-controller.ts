import { given } from "n-defensive";
import { query, route, Controller, Utils } from "n-web";
import * as Routes from "../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { UserRepository } from "../../../domain/repositories/user/user-repository";
import { UserNotFoundException } from "../../../exceptions/user-not-found-exception";

@query
@route(Routes.getUser)
@inject("UserRepository", "ConfigService")
export class GetUserController extends Controller
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


    public async execute(id: string): Promise<any>
    {
        let user = await this._userRepository.get(id);
        
        if (user == null)
            throw new UserNotFoundException(id);

        let baseUrl = await this._configService.getBaseUrl();
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            links: {
                self: Utils.generateUrl(Routes.getUser, { id: user.id }, baseUrl),
                update: Utils.generateUrl(Routes.updateUser, { id: user.id }, baseUrl),
                delete: Utils.generateUrl(Routes.deleteUser, { id: user.id }, baseUrl),
                getUserComments: Utils.generateUrl(Routes.getUserComments, { id: user.id }, baseUrl),
                getUserLiked: Utils.generateUrl(Routes.getUserLiked, { id: user.id }, baseUrl),
            }
        };
    }
}
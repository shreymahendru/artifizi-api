import { ConfigService } from "./config-service";
import { ConfigurationManager } from "n-config";

export class DevConfigService implements ConfigService
{
    getBaseUrl(): Promise<string>
    {
        let value = ConfigurationManager.getConfig<string>("baseUrl");
        return Promise.resolve(value);
    }
}
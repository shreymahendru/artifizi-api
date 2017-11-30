import { ComponentInstaller, Registry } from "n-ject";
import { ConfigurationManager } from "n-config";
import { WebApp } from "n-web";
import { DevConfigService } from "./services/config-service/dev-config-service";
import { AppExceptionHandler } from "./exceptions/app-exception-handler";
import { ConsoleLogger } from "n-log/dist/console-logger";

class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        const isDev = ConfigurationManager.getConfig<string>("mode") === "dev";
        
        registry
            .registerSingleton("ConfigService", isDev ? DevConfigService : null)
            .registerSingleton("Logger", ConsoleLogger);

    }
}

const controllers: Array<Function> = [];

const app = new WebApp(ConfigurationManager.getConfig<number>("port"))
    .useInstaller(new Installer())
    .enableCors()
    .registerControllers(...controllers)  
    .registerExceptionHandler(AppExceptionHandler);
    
app.bootstrap();
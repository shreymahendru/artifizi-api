import { ComponentInstaller, Registry } from "n-ject";
import { ConfigurationManager } from "n-config";
import { WebApp } from "n-web";

class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        // const isDev = ConfigurationManager.getConfig<string>("mode") === "dev";
        
        // registry.registerSingleton("ConfigService", ConfigManager))
        console.log(registry);

    }

}

const controllers: Array<Function> = [];

const app = new WebApp(ConfigurationManager.getConfig<number>("port"))
    .useInstaller(new Installer())
    .enableCors()
    .registerControllers(...controllers);    
    // .registerExceptionHandler();
    
app.bootstrap();
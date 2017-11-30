import { ConnectionPool, config } from "mssql";
import { DbConnectionService } from "./db-connection-service";

export class DefaultDbConnectionService implements DbConnectionService
{
    private _connection: ConnectionPool;
    
    
    // public get connection(): ConnectionPool{return this._connection; }
    
    public constructor()
    {
        this._connection = null;
    }
    
    public async getConnection(): Promise<ConnectionPool> 
    {
        if (this._connection)
            return this._connection;    
        
        const config: config = {
            user: "sa",
            password: "P@55w0rd",
            server: "localhost", // You can use 'localhost\\instance' to connect to named instance
            database: "artifiziTest"
        };
        
        let pool = new ConnectionPool(config);
        this._connection = await pool.connect();
        return this._connection;
    }
}
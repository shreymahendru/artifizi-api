import { ConnectionPool } from "mssql";

export interface DbConnectionService
{
    getConnection(): Promise<ConnectionPool>;
}
// import * as assert from "assert";
import { DefaultDbConnectionService } from "../src/services/default-db-connection-service";

suite("Tests", () =>
{
    test("Test", async () =>
    {
        let con = new DefaultDbConnectionService();
        let connection = await con.getConnection();
        let res = await connection.query`select * from asset where id = 12345678900101001`;
        console.log(res);
    });
});
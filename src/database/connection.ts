//import { createConnection } from 'typeorm';

import { Connection, createConnection, getConnectionOptions } from "typeorm";


//createConnection();

export default async (): Promise<Connection> => {
    const dafaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(dafaultOptions, {
            database: process.env.NODE_ENV === 'test' ? "../../tests/test.sqlite" : dafaultOptions.database
        })
    )
}

import knex from 'knex';
import path from 'path';

// migrations = controlam a versão do banco de dados (como se fosse controle de versão)
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default db;
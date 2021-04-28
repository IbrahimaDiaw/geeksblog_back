import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const DATABASE_CONFIG : TypeOrmModuleOptions ={
    type: 'postgres',
    port: 5432,
    host: '127.0.0.1',
    username: 'postgres',
    password: 'postgres',
    database: 'sngeeksblog',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true, // TODO: switch to false in prod & use migrations instead !

    migrationsTableName: 'migrations',
    migrations: ['migration/*.js'],
    cli: {
        migrationsDir: 'migration',
    },
}
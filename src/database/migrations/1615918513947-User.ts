import {Column, MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1615918513947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'User',
            columns: [
                {
                    name: 'id', 
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true, 
                    generationStrategy: 'increment'
                },

                {
                    name: 'name',
                    type: 'varchar'
                },

                {
                    name: 'email',
                    type: 'varchar'
                },

                {
                    name: 'number',
                    type: 'varchar'
                },

                {
                    name: 'userName',
                    type: 'varchar',
                    isNullable: false
                },

                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('User')
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1737727170182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "question",
                columns: [
                    {
                        name: "id",
                        isPrimary: true,
                        isGenerated: true,
                        type: "int",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "80",
                        isUnique: true
                    },
                    {
                        name: "senha",
                        type: "varchar",
                        length: "200",
                        isNullable: false,
                    }

                ],
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

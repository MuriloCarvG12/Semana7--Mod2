import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Medicamentos1737725924513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "medicamento_usuario",
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
                        length: '50'
                    },
                    {
                        name: "description",
                        type: "text",
                    },
                    {
                        name: "quantity",
                        type: "int",
                    },
                    {
                        name: "userId",
                        type: "int",
                    },
                ], 
            }), true)

            await queryRunner.createForeignKey("medicamento_usuario",
                new TableForeignKey({
                    columnNames: ["userId"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                })
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

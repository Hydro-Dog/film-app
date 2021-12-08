const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SecondMigration1638994055950 {
    name = 'SecondMigration1638994055950'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
    }
}

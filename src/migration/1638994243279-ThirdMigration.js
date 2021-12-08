const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ThirdMigration1638994243279 {
    name = 'ThirdMigration1638994243279'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }
}

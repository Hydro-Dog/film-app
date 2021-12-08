const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class FirstMigration1638879894017 {
    name = 'FirstMigration1638879894017'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userName" TO "username"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" TO "UQ_78a916df40e02a9deb1c4b75edb"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_da5934070b5f2726ebfd3122c80"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "username" TO "userName"`);
    }
}

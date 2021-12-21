const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class FourthMigration1640112796355 {
    name = 'FourthMigration1640112796355'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "matchSession_status_enum" RENAME TO "matchSession_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "matchSession_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "matchSession" ALTER COLUMN "status" TYPE "matchSession_status_enum" USING "status"::"text"::"matchSession_status_enum"`);
        await queryRunner.query(`DROP TYPE "matchSession_status_enum_old"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "matchSession_status_enum_old" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "matchSession" ALTER COLUMN "status" TYPE "matchSession_status_enum_old" USING "status"::"text"::"matchSession_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "matchSession_status_enum"`);
        await queryRunner.query(`ALTER TYPE "matchSession_status_enum_old" RENAME TO "matchSession_status_enum"`);
    }
}

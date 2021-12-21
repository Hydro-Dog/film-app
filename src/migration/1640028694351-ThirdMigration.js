const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ThirdMigration1640028694351 {
    name = 'ThirdMigration1640028694351'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "hostMatchStats"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "guestMatchStats"`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "hostCurrentFilmIndex" integer`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "guestCurrentFilmIndex" integer`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "hostLikedFilms" text array`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "guestLikedFilms" text array`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "hostLikedFilmIndex" text`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "guestLikedFilmIndex" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "guestLikedFilmIndex"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "hostLikedFilmIndex"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "guestLikedFilms"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "hostLikedFilms"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "guestCurrentFilmIndex"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP COLUMN "hostCurrentFilmIndex"`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "guestMatchStats" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD "hostMatchStats" json NOT NULL`);
    }
}

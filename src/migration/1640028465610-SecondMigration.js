const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SecondMigration1640028465610 {
    name = 'SecondMigration1640028465610'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "matchSession" RENAME COLUMN "matchedMoviesJSON" TO "matchedMovies"`);
        await queryRunner.query(`ALTER TABLE "matchSession" ALTER COLUMN "matchedMovies" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "matchSession" ALTER COLUMN "matchedMovies" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "matchSession" RENAME COLUMN "matchedMovies" TO "matchedMoviesJSON"`);
    }
}

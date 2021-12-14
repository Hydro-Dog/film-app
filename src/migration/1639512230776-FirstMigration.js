const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class FirstMigration1639512230776 {
    name = 'FirstMigration1639512230776'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "game_mode" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_ef9a2ad96f7bcea1655cd17e575" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying, "password" character varying, "accessToken" character varying, "refreshToken" character varying, "currentMatchSession" uuid, "invites" uuid array, "hosted" uuid array, "emailConfirmed" boolean, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matchSession" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "category" character varying, "filmsSequence" text array NOT NULL, "filterParams" json, "matchedMoviesJSON" text array NOT NULL, "matchLimit" integer NOT NULL, "status" "matchSession_status_enum" NOT NULL, "hostMatchStats" json NOT NULL, "guestMatchStats" json NOT NULL, "hostId" uuid, "guestId" uuid, CONSTRAINT "PK_082059d0de0dab88d3dc5e5bf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD CONSTRAINT "FK_103f771dac5b18aec1167cf07b1" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matchSession" ADD CONSTRAINT "FK_17b39b9e3b88a70b133b60966b0" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "matchSession" DROP CONSTRAINT "FK_17b39b9e3b88a70b133b60966b0"`);
        await queryRunner.query(`ALTER TABLE "matchSession" DROP CONSTRAINT "FK_103f771dac5b18aec1167cf07b1"`);
        await queryRunner.query(`DROP TABLE "matchSession"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "game_mode"`);
    }
}

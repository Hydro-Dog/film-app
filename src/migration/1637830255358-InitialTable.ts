import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTable1637830255358 implements MigrationInterface {
    name = 'InitialTable1637830255358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_mode" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_ef9a2ad96f7bcea1655cd17e575" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "accessToken" character varying, "refreshToken" character varying, "currentMatchSession" text, "sessionsInvite" text array, "createdInvite" text array, "favoriteFilms" text array, "sessionHistory" text array, "emailConfirmed" boolean NOT NULL, "phoneNumber" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_session" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "region" character varying, "category" character varying, "filmsSequenceJson" text array NOT NULL, "lang" character varying, "hostCurrentFilmIndex" integer NOT NULL, "guestCurrentFilmIndex" integer NOT NULL, "hostLikedFilms" text array NOT NULL, "guestLikedFilms" text array NOT NULL, "hostLikedFilmIndex" text, "guestLikedFilmIndex" text, "filterParams" character varying, "matchedMoviesJSON" text array NOT NULL, "matchLimit" integer NOT NULL, "page" integer NOT NULL, "completed" boolean, "accepted" boolean, "declined" boolean, "hostId" integer, "guestId" integer, CONSTRAINT "PK_bb24d40d99705b73ca71fd01582" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match_session" ADD CONSTRAINT "FK_7512ebe4b8671a11d962513b506" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_session" ADD CONSTRAINT "FK_eb5dd50d5407dc76e4eaa4a5c95" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_session" DROP CONSTRAINT "FK_eb5dd50d5407dc76e4eaa4a5c95"`);
        await queryRunner.query(`ALTER TABLE "match_session" DROP CONSTRAINT "FK_7512ebe4b8671a11d962513b506"`);
        await queryRunner.query(`DROP TABLE "match_session"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "game_mode"`);
    }

}

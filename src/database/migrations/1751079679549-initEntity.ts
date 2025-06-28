import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntity1751079679549 implements MigrationInterface {
    name = 'InitEntity1751079679549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments_post" ("id" SERIAL NOT NULL, "content" text NOT NULL, "like" text NOT NULL, "post_id" integer, "author_id" uuid, CONSTRAINT "PK_259bf9825d9d198608d1b46b0b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, "deleted_at" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "tags" text NOT NULL, "like" text NOT NULL, "author_id" uuid, CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, "deleted_at" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments_post" ADD CONSTRAINT "FK_727bba7b4cc6cec39958f48d556" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_post" ADD CONSTRAINT "FK_30337e4991684d57565c511b4ec" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`ALTER TABLE "comments_post" DROP CONSTRAINT "FK_30337e4991684d57565c511b4ec"`);
        await queryRunner.query(`ALTER TABLE "comments_post" DROP CONSTRAINT "FK_727bba7b4cc6cec39958f48d556"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comments_post"`);
    }

}

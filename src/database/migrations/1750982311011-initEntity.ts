import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntity1750982311011 implements MigrationInterface {
    name = 'InitEntity1750982311011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, "deleted_at" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, "deleted_at" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

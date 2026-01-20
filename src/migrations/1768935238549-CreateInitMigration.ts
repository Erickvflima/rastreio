import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitMigration1768935238549 implements MigrationInterface {
    name = 'CreateInitMigration1768935238549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."devices" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" integer, "serial" character varying NOT NULL, "model" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_f3a8ce1efac49c94b300d05eb18" UNIQUE ("serial"), CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."devices_by_user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" integer, "userId" integer, "deviceId" integer, CONSTRAINT "UQ_a62e99ea278721220d0736a6cd8" UNIQUE ("userId", "deviceId"), CONSTRAINT "PK_572f881c5d3927258cc14f6bdcd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dbo"."devices_by_user" ADD CONSTRAINT "FK_448f0c7354f302199b75b4ef664" FOREIGN KEY ("userId") REFERENCES "dbo"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."devices_by_user" ADD CONSTRAINT "FK_c2f06a849fdbeece3c193b03a2c" FOREIGN KEY ("deviceId") REFERENCES "dbo"."devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."devices_by_user" DROP CONSTRAINT "FK_c2f06a849fdbeece3c193b03a2c"`);
        await queryRunner.query(`ALTER TABLE "dbo"."devices_by_user" DROP CONSTRAINT "FK_448f0c7354f302199b75b4ef664"`);
        await queryRunner.query(`DROP TABLE "dbo"."devices_by_user"`);
        await queryRunner.query(`DROP TABLE "dbo"."devices"`);
    }

}

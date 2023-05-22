import { Migration } from '@mikro-orm/migrations';

export class Migration20230521042117 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "gifs" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "uploader_id" int not null, "gif" varchar(255) not null);');

    this.addSql('alter table "gifs" add constraint "gifs_uploader_id_foreign" foreign key ("uploader_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "gifs" cascade;');
  }

}

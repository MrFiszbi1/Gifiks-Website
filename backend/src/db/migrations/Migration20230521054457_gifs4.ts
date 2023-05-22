import { Migration } from '@mikro-orm/migrations';

export class Migration20230521054457 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "gifs" add column "count" int not null;');
    this.addSql('alter table "gifs" alter column "gif" type bytea using ("gif"::bytea);');
    this.addSql('alter table "gifs" alter column "gif" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "gifs" alter column "gif" type varchar(255) using ("gif"::varchar(255));');
    this.addSql('alter table "gifs" alter column "gif" set not null;');
    this.addSql('alter table "gifs" drop column "count";');
  }

}

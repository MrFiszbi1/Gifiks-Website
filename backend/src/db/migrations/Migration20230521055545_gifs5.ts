import { Migration } from '@mikro-orm/migrations';

export class Migration20230521055545 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "gifs" alter column "gif" type bytea using ("gif"::bytea);');
    this.addSql('alter table "gifs" alter column "gif" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "gifs" alter column "gif" type bytea using ("gif"::bytea);');
    this.addSql('alter table "gifs" alter column "gif" drop not null;');
  }

}

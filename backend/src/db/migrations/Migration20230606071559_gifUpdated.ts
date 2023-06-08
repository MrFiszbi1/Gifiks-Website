import { Migration } from '@mikro-orm/migrations';

export class Migration20230606071559 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "gifs" add column "gif_uri" varchar(255) not null;');
    this.addSql('alter table "gifs" drop column "gif";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "gifs" add column "gif" bytea not null;');
    this.addSql('alter table "gifs" drop column "gif_uri";');
  }

}

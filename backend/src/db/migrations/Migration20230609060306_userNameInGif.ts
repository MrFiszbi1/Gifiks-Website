import { Migration } from '@mikro-orm/migrations';

export class Migration20230609060306 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "gifs" add column "uploader_name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "gifs" drop column "uploader_name";');
  }

}

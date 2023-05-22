import { Migration } from '@mikro-orm/migrations';

export class Migration20230522011338 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "gifs" add column "name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "gifs" drop column "name";');
  }

}

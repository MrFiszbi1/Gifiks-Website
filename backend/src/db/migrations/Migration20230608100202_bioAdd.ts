import { Migration } from '@mikro-orm/migrations';

export class Migration20230608100202 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "gif_uri" varchar(255) not null;');
    this.addSql('alter table "users" rename column "img_uri" to "bio";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add column "img_uri" varchar(255) not null;');
    this.addSql('alter table "users" drop column "bio";');
    this.addSql('alter table "users" drop column "gif_uri";');
  }

}

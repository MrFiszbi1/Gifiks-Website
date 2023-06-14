import { Migration } from '@mikro-orm/migrations';

export class Migration20230614125224 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop column "pet_type";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add column "pet_type" varchar(255) not null;');
  }

}

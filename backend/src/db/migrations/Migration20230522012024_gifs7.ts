import { Migration } from '@mikro-orm/migrations';

export class Migration20230522012024 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "gifs" drop column "count";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "gifs" add column "count" int not null;');
  }

}

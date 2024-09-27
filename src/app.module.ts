import { DatabaseModule } from '@app/database/database.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

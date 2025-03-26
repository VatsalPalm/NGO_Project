import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsQueries } from './events.query';
import { SqlService } from 'src/dbConfig/sql.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsQueries, SqlService],
})
export class EventsModule {}

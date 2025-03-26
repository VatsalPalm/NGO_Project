import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { EVENT_ERROR_LOGS } from 'src/common/constants/app.message';

@Controller('events')
@ApiBearerAuth()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiResponse({
    status: 200,
    description: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
  })
  @ApiResponse({
    status: 400,
    description: EVENT_ERROR_LOGS.EVENT_NOT_FOUND,
  })
  @Get('/getAllEvents/:page/:size')
  findAll(@Param('page') page: number, @Param('size') size: number) {
    page *= 10;
    return this.eventsService.findAll(size, page);
  }
  @ApiResponse({
    status: 200,
    description: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
  })
  @ApiResponse({
    status: 400,
    description: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_BY_ID,
  })
  @Get('/getEventById/:id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
  })
  @ApiResponse({
    status: 400,
    description: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_BY_ID,
  })
  @Get('/getRecommendedEvents')
  getRecommendedEvents(@Req() req: any) {
    return this.eventsService.recommendEvents(req?.users?.userId);
  }
  @ApiResponse({
    status: 200,
    description: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
  })
  @ApiResponse({
    status: 400,
    description: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_BY_ID,
  })
  @Get('/getMyCalender/:startDate/:Interval/:page/:size')
  getMyCalendar(
    @Req() req: any,
    @Param('page') page: number,
    @Param('size') size: number,
    @Param('startDate') startDate: string,
    @Param('Interval') Interval: number,
  ) {
    page *= 10;
    return this.eventsService.getMyCalender(
      req?.users?.userId,
      startDate,
      Interval,
      page,
      size,
    );
  }
  @ApiResponse({
    status: 200,
    description: EVENT_ERROR_LOGS.EVENT_CREATED_SUCCESSFULLY,
  })
  @Post('/createEvents')
  create(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    return this.eventsService.create(createEventDto, req?.users?.userId);
  }

  @ApiResponse({
    status: 200,
    description: EVENT_ERROR_LOGS.EVENT_UPDATED_SUCCESSFULLY,
  })
  @ApiResponse({
    status: 400,
    description: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_BY_ID,
  })
  @Patch('/updateEvent/:id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EVENT_ERROR_LOGS } from '../../common/constants/app.message';
import { EventListDto } from './dto/event-list.dto';

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

  // @ApiParam({
  //   name: 'page',
  //   type: String,
  //   description: 'Page no for pagination',
  //   example: '0',
  // })
  // @ApiParam({
  //   name: 'size',
  //   type: String,
  //   description: 'size of the page',
  //   example: '10',
  // })
  @Get('/getAllEvents')
  findAll(@Query() eventListDto: EventListDto) {
    // @Param('page') page: number, @Param('size') size: number
    // page *= 10;
    return this.eventsService.findAll(eventListDto);
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
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the event',
    example: '123',
  })
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
  @ApiParam({
    name: 'startDate',
    type: String,
    description: 'Date of the event',
    example: '2023-08-01',
  })
  @ApiParam({
    name: 'Interval',
    type: String,
    description: 'How many days after the event',
    example: '2',
  })
  @ApiParam({
    name: 'page',
    type: String,
    description: 'Page no for pagination',
    example: '0',
  })
  @ApiParam({
    name: 'size',
    type: String,
    description: 'size of the page',
    example: '10',
  })
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
    console.log(
      '🚀 ~ EventsController ~ update ~ updateEventDto:',
      updateEventDto,
    );
    if (!updateEventDto || Object.keys(updateEventDto).length === 0) {
      return {
        status: 400,
        message: EVENT_ERROR_LOGS.NO_DATA_FOUND,
      };
    } else {
      return this.eventsService.update(+id, updateEventDto);
    }
  }
}

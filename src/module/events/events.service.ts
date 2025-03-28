import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsQueries } from './events.query';
import { SqlService } from '../../dbConfig/sql.service';
import {
  EVENT_ERROR_LOGS,
  USER_ERROR_LOGS,
} from '../../common/constants/app.message';
import { EventListDto } from './dto/event-list.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsQueries: EventsQueries,
    private readonly sqlService: SqlService,
  ) {}

  async create(createEventDto: CreateEventDto, userId: number) {
    try {
      let data = {
        ...createEventDto,
        userId,
      };

      let keys = Object.keys(data);
      let values = Object.values(data);

      let updatedValues = values.map((item) => "'" + item + "'");

      let result = await this.sqlService.run(
        this.eventsQueries.InsertEvents(keys, updatedValues),
      );
      if (result) {
        return {
          status: 200,
          message: EVENT_ERROR_LOGS.EVENT_CREATED_SUCCESSFULLY,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(eventListDto: EventListDto) {
    try {
      let page = eventListDto.page;
      let limit = eventListDto.limit;
      let res = await this.sqlService.run(this.eventsQueries.GetEvents(page,limit));
      let countRes = await this.sqlService.run(
        this.eventsQueries.GetEventCount(),
      );

      if (!res || res.length == 0) {
        return {
          status: 400,
          message: EVENT_ERROR_LOGS.EVENT_NOT_FOUND,
        };
      } else
        return {
          status: 200,
          message: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
          data: res,
        };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      let res = await this.sqlService.run(this.eventsQueries.GetEventById(id));

      if (!res || res.length == 0) {
        return {
          status: 400,
          message: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_BY_ID,
        };
      } else
        return {
          status: 200,
          message: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
          data: res,
        };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      let data = { ...updateEventDto };
      console.log('🚀 ~ EventsService ~ update ~ data:', data);
      let EventRes = await this.sqlService.run(
        this.eventsQueries.GetEventById(id),
      );
      if (!EventRes || EventRes.length == 0) {
        return {
          status: 400,
          message: EVENT_ERROR_LOGS.EVENT_NOT_FOUND,
        };
      } else {
        let keys = Object.keys(data);

        let updatedKeysValues = keys.map(
          (keys) => `${keys} = '${updateEventDto[keys]}'`,
        );
        let updatedResult = await this.sqlService.run(
          this.eventsQueries.UpdateEvent(id, updatedKeysValues),
        );
        if (!updatedResult || updatedResult.length == 0) {
          return {
            status: 400,
            message: EVENT_ERROR_LOGS.EVENT_NOT_UPDATED,
          };
        } else {
          return {
            status: 200,
            message: EVENT_ERROR_LOGS.EVENT_UPDATED_SUCCESSFULLY,
          };
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async recommendEvents(id: number) {
    try {
      let result = await this.sqlService.run(
        this.eventsQueries.FindUserById(id),
      );
      if (result.length == 0 || !result) {
        return {
          status: 400,
          message: USER_ERROR_LOGS.USER_NOT_FOUND,
        };
      } else {
        let userData = result[0];
        let Latitude = userData?.latitude;
        let Longitude = userData?.longitude;

        let resRecommended = await this.sqlService.run(
          this.eventsQueries.FindRecommendedEvents(Latitude, Longitude),
        );
        if (!resRecommended || resRecommended.length == 0) {
          return {
            status: 400,
            message: EVENT_ERROR_LOGS.EVENT_NOT_FOUND,
          };
        } else {
          return {
            status: 200,
            message: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
            data: resRecommended,
          };
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMyCalender(
    id: number,
    startDate: string,
    Interval: number,
    page: number,
    size: number,
  ) {
    try {
      let res = await this.sqlService.run(
        this.eventsQueries.FindEventDetailsForUser(id),
      );
      if (!res || res.length == 0) {
        return {
          status: 400,
          message: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_FOR_USER,
        };
      } else {
        let eventResult = await this.sqlService.run(
          this.eventsQueries.FindEventDetailsForMyCalendar(
            startDate,
            Interval,
            page,
            size,
          ),
        );
        if (!eventResult || eventResult.length == 0) {
          return {
            status: 400,
            message: EVENT_ERROR_LOGS.EVENT_NOT_FOUND_FOR_MY_CALENDER,
          };
        } else {
          return {
            status: 200,
            message: EVENT_ERROR_LOGS.EVENT_FOUND_SUCCESSFULLY,
            data: eventResult,
          };
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

import { TableName } from '../../common/constants/app.table_entity';

export class EventsQueries {
  InsertEvents(keys: any, values: any) {
    let query = `INSERT INTO ${TableName.Table_Event} (${keys}) VALUES (${values})`;
    return {
      name: 'INSERT EVENTS',
      type: 'INSERT',
      query: query,
    };
  }

  GetEvents(offset: number, limit: number) {
    let query = `SELECT eventId,userId,gender,eventStartDate,eventEndDate,
    eventStartTime,
    eventEndTime,meetingType,participantsCount
    ,eventType,eventName,eventDescription
    eventLat,eventLong,ageGroupId ,cat.name as categoryName,cat.categoryId
    FROM ${TableName.Table_Event} as ev
    LEFT JOIN ${TableName.Table_Category} as cat
    ON ev.categoryId = cat.categoryId
    LIMIT ${limit} OFFSET ${offset}
    `;
    return {
      name: 'GET EVENTS',
      type: 'SELECT',
      query: query,
    };
  }

  GetEventCount() {
    let query = `SELECT COUNT(*) AS total FROM ${TableName.Table_Event}`;
    return {
      name: 'GET EVENT COUNT',
      type: 'SELECT',
      query: query,
    };
  }

  GetEventById(id: number) {
    let query = `SELECT 
    eventId,userId,gender,eventStartDate,eventEndDate,
    eventStartTime,
    eventEndTime,meetingType,participantsCount
    ,eventType,eventName,eventDescription
    eventLat,eventLong,ageGroupId FROM ${TableName.Table_Event} WHERE eventId = ${id}`;

    return {
      name: 'GET EVENT BY ID',
      type: 'SELECT',
      query: query,
    };
  }

  UpdateEvent(id: number, data: any) {
    let query = `UPDATE ${TableName.Table_Event} SET ${data} WHERE eventId = ${id}`;
    return {
      name: 'UPDATE EVENT',
      type: 'UPDATE',
      query: query,
    };
  }

  FindUserById(id: number) {
    let query = `SELECT * FROM ${TableName.Table_Users} WHERE userId = ${id}`;
    return {
      name: 'FIND USER BY ID',
      type: 'SELECT',
      query: query,
    };
  }

  FindEventDetailsForUser(id: number) {
    let query = `select * from eventTb where eventId in(select eventId from userEventTb where userId = ${id})`;
    return {
      name: 'FIND EVENT DETAILS FOR USER',
      type: 'SELECT',
      query: query,
    };
  }

  FindEventDetailsForMyCalendar(satrtDate: string, Interval: number) {
    let query = `select * from eventTb where eventStartDate >= '${satrtDate}'  AND eventStartDate <= DATE_ADD('${satrtDate}',INTERVAL ${Interval} DAY) `;

    // console.log('🚀 ~ EventsQueries ~ query:', query);
    return {
      name: 'FIND EVENT DETAILS FOR MY CALENDER',
      type: 'SELECT',
      query: query,
    };
  }

  FindRecommendedEvents(
    userLat: string,
    userLong: string,
    limit: number,
    offset: number,
  ) {
    let query = `SELECT * FROM eventTb AS e
                WHERE ST_Distance_Sphere(
                POINT(e.eventLat, e.eventLong), 
                POINT(${userLat}, ${userLong})
                 ) <= 50000 LIMIT ${limit} OFFSET ${offset};`;
    return {
      name: 'FIND Recommended Events DETAILS FOR USER',
      type: 'SELECT',
      query: query,
    };
  }

  FindRecommendedEventsCount(userLat: string, userLong: string) {
    let query = `SELECT COUNT(*) AS total FROM eventTb AS e
                WHERE ST_Distance_Sphere(
                POINT(e.eventLat, e.eventLong), 
                POINT(${userLat}, ${userLong})
                 ) <= 50000`;
    return {
      name: 'FIND Recommended Events DETAILS COUNT FOR USER',
      type: 'SELECT',
      query: query,
    };
  }
}

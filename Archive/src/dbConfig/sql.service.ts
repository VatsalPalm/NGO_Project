import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class SqlService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async run(queryObj: any = null, data: any = null) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let result: any;
    const rows = await queryRunner.query(queryObj.query, data);

    await queryRunner.release();

    if (queryObj.type == 'SELECT_ONE') {
      result = !_.isEmpty(rows) ? rows[0] : null;
    } else {
      result = rows;
    }

    return result;
  }

  async runWithTransaction(
    queryRunner: QueryRunner,
    query: any,
    parameters?: any,
  ) {
    try {
      const rows = await queryRunner.query(query.query, parameters);
      let result: any;
      if (query.type === 'SELECT_ONE') {
        result = rows.length ? rows[0] : null;
      } else {
        result = rows;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async startTransaction(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
  }
  async commitTransaction(queryRunner: QueryRunner) {
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }
  async rollBackTransaction(queryRunner: QueryRunner) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
}

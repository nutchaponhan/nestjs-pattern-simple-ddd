import { Inject, Logger } from '@nestjs/common';
import { DRIZZLE_ORM } from '@core/constants/db.constants';
import { DrizzleDb } from '@core/interfaces/drizzle.interfaces';
import { DrizzleRepoBase } from '../drizzle/drizzle.base';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PgTable } from 'drizzle-orm/pg-core';
import { EventEntity } from '@core/ddd/event-entity.base';
import { eq } from 'drizzle-orm';
import { Err, Ok, Result } from 'oxide.ts';
import { set } from 'lodash';
import { LOGGERS_SERVICE } from '../service/loggers/loggers.di-tokens';
import {
  EntityValidationError,
  UnableToSaveError,
} from '@core/error/entity-validate.error';

export abstract class RepoBase<
  E extends EventEntity<any>,
  T extends PgTable,
> extends DrizzleRepoBase {
  constructor(
    @Inject(DRIZZLE_ORM) drizzle: DrizzleDb,
    @Inject(LOGGERS_SERVICE) logger: Logger,
    protected evenEmitter: EventEmitter2,
  ) {
    super(drizzle, logger);
  }

  abstract getInstance(id: number): Promise<Result<E, Error>>;
  abstract get _table(): T;

  /**
   * save Entity to database
   *
   * HAVE ID - it will perform update
   *
   * NO ID - it will perform insert, then assign id to the object
   *
   * NOTE: This function modify the object directly
   *
   * @param entity - Entity object for the repo
   * @return Promise<Err<UnableToSaveError | EntityValidationError>>
   */
  async save(
    entity: E,
  ): Promise<Err<UnableToSaveError | EntityValidationError>> {
    const table = this._table;

    const err = entity.validate();
    if (err) {
      return err;
    }

    try {
      if (entity.id) {
        await this.db
          .update(table)
          .set(entity.toDbValues())
          .where(eq(table['id'], entity.id));
      } else {
        const [{ id }] = await this.db
          .insert(table)
          .values(entity.toDbValues())
          .returning({ id: table['id'] });

        set(entity, '_id', id);
      }

      await entity.publishEvents(this.logger, this.evenEmitter);
    } catch (e) {
      return Err(new UnableToSaveError(e.message));
    }

    return null;
  }

  protected async selectById(
    id: number,
  ): Promise<Result<T['$inferSelect'], Error>> {
    const table = this._table;

    const [data] = await this.db
      .select()
      .from(table)
      .where(eq(table['id'], id));

    if (!data) {
      return Err(new Error('data not found'));
    }

    return Ok(data);
  }
}

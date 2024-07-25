import {
  BaseEntity,
  Index,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { v4 } from 'uuid';

export abstract class MyCustomBaseEntity extends BaseEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({fieldName: 'created_at'})
  createdAt: Date = new Date();

  @Property({onUpdate: () => new Date(), fieldName: 'updated_at'})
  updatedAt: Date = new Date();

  @Property({nullable: true, fieldName: 'deleted_at', type: 'datetime'})
  deletedAt: Date | null = null;
}

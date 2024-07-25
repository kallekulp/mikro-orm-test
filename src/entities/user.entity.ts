import { Collection, Entity, ManyToOne, ManyToMany, Property, Ref, ref } from '@mikro-orm/core';

import { AggregateRoot } from './aggregate-root';
import { Role } from "./role";
import { UserRole } from "./user-role";

@Entity({ tableName: 'user'} )
export class UserEntity extends AggregateRoot {
  @Property()
  firstName!: string;

  @ManyToMany({
    entity: () => Role,
    pivotEntity: () => UserRole,
    owner: true
  })
  roles = new Collection<Role>(this)

  constructor(firstName: string) {
    super();
    this.firstName = firstName;
  }
}

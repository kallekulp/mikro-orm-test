import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'

import { AggregateRoot } from './aggregate-root'

import { Permission } from './permission'
import { RolePermission } from './role-permission'

@Entity({tableName: 'role'})
export class Role extends AggregateRoot {
  @Property({columnType: 'char(50)', nullable: false})
  name!: string

  @ManyToMany({
    entity: () => Permission,
    inversedBy: e => e.roles,
    pivotEntity: () => RolePermission,
    joinColumn: 'role_id',
    inverseJoinColumn: 'permission_id'
  })
  permissions = new Collection<Permission>(this)

  constructor(name: string) {
    super()

    this.name = name
  }
}

import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core'
import { AggregateRoot } from './aggregate-root'

import { Role } from './role'
import { RolePermission } from './role-permission'

@Entity({
  tableName: 'permission'
})
export class Permission extends AggregateRoot {
  @Property({
    type: 'varchar',
    length: 255
  })
  name!: string

  @Property({
    type: 'varchar',
    nullable: false
  })
  scope!: string

  @ManyToMany({
    eager: false,
    entity: () => Role,
    pivotEntity: () => RolePermission,
    joinColumn: 'role_id',
    inverseJoinColumn: 'permission_id',
    mappedBy: e => e.permissions
  })
  roles = new Collection<Role>(this)
}

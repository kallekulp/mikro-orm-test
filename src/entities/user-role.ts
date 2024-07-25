import { Cascade, Entity, ManyToOne, PrimaryKeyProp, Property, Ref, ref } from '@mikro-orm/core'

import { Role } from "./role";
import { UserEntity } from "./user.entity";

@Entity({tableName: 'user_role'})
export class UserRole {
  @ManyToOne(() => UserEntity, {primary: true, ref: true})
  user: Ref<UserEntity>

  @ManyToOne(() => Role, {primary: true, ref: true})
  role: Ref<Role>

  @Property({nullable: true, fieldName: 'deleted_at', type: 'datetime'})
  deletedAt?: Date;

  [PrimaryKeyProp]?: [ 'user', 'role' ]

  constructor(userId: string, roleId: string) {
    this.user = ref(UserEntity, userId)
    this.role = ref(Role, roleId)
  }
}

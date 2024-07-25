import { Entity, ManyToOne, Ref, ref } from '@mikro-orm/core'

import { MyCustomBaseEntity } from "./my-custom-base-entity";
import { Role } from "./role";
import { Permission } from "./permission";

@Entity({
	tableName: 'role_permission'
})
export class RolePermission extends MyCustomBaseEntity {
	@ManyToOne(() => Role, { ref: true, primary: true })
	role: Ref<Role>

	@ManyToOne(() => Permission, { ref: true, primary: true })
	permission: Ref<Permission>

	constructor(role: string, permission: string) {
		super()

		this.role = ref(Role, role)
		this.permission = ref(Permission, permission)
	}
}

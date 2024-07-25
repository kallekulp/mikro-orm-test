import { MikroORM } from '@mikro-orm/mysql';

let orm: MikroORM;

import { Role, UserEntity } from "./entities";

import mikroOrmConfig from "./mikro-orm.config";

beforeAll(async () => {
  orm = await MikroORM.init(mikroOrmConfig);

  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});

test('should delete user roles when deleting user', async () => {
  const rolesArray = [ 'admin' ];

  for (const role of rolesArray) {
    const r = new Role(role);
    await orm.em.persistAndFlush(r);
  }

  const roles = await orm.em.find(Role, {});
  const user = new UserEntity('Test User');

  for (const role of roles) {
    user.roles.add(role);
  }

  await orm.em.persistAndFlush(user);

  orm.em.remove(user)

  await orm.em.flush();
});

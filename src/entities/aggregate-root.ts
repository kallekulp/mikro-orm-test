import { OnLoad, Property } from '@mikro-orm/core';

import { MyCustomBaseEntity } from './my-custom-base-entity';

export abstract class AggregateRoot extends MyCustomBaseEntity {
  @Property({ persist: false })
  private _events: any[] = [];

  get events(): any[] {
    return this._events;
  }

  @OnLoad()
  private onLoad() {
    this._events = [];
  }

  protected registerEvent(domainEvent: any): void {
    this._events.push(domainEvent);
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);

    if (thisClass && domainEventClass) {
      //console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
    }
  }

  public clearEvents(): void {
    this._events.splice(0, this._events.length);
  }
}

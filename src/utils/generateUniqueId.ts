import { Entity, EntityType } from "../types/enums";

export function generateUniqueId(entity: Entity): string {
  if (entity.__typename === EntityType.DataSourceVariable) {
    return `${entity.__typename}-${entity.placeholderName}`;
  } else {
    return `${entity.__typename}-${entity.id.toString()}`;
  }
}
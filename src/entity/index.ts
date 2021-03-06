import { Transform } from "class-transformer";
import { ObjectID } from "mongodb";
import { ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

export const objectIdToHex = (value: any) => {
  const hex: string[] = [];

  for (let i = 0; i < 256; i++) {
    if (i <= 15) {
      hex[i] = "0" + i.toString(16);
    } else {
      hex[i] = i.toString(16);
    }
  }

  return Object.keys(value.id)
              .map((key) => value.id[key])
              .map((part) => hex[part])
              .join("");
};

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  @Transform(objectIdToHex, { toPlainOnly: true })
  public id: ObjectID = new ObjectID();
}

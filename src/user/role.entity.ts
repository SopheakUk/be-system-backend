import { EntityBase } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends EntityBase {
  @Column({ unique: true })
  name: string;

  @Column()
  displayName: string;

  @Column()
  description: string;
}

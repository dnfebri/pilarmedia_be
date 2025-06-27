import { Exclude, Expose } from 'class-transformer';
import {
  AuditTrail,
  DeletedTrail,
  EntityHelper,
} from 'src/shared/utils/entity-helper';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { make } from 'src/shared/utils/hash';

@Entity()
export class User extends EntityHelper {
  @Expose({ groups: ['me'] })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  avatar?: string;

  @Expose({ groups: ['admin', 'me'] })
  @Column()
  name: string;

  @Expose({ groups: ['admin', 'me'] })
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      this.password = make(this.password);
    }
  }

  @Expose({ groups: ['admin'] })
  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;

  @Expose({ groups: ['admin'] })
  @Column(() => DeletedTrail, { prefix: false })
  deleted_trail: DeletedTrail;
}

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tokenCache' })
export class TokenCache extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  loggedInOn: Date;

  @Column()
  expiry: string;

  @Column()
  token: string;

  @Column()
  userUuid: string;
}

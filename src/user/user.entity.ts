/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { PhoneEntity } from '../phone/phone.entity';
import { RentEntity } from '../rent/rent.entity';
import { ReviewEntity } from '../review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true})
    password: string;

    @OneToMany(() => PhoneEntity, phone => phone.user)
    favorites: PhoneEntity[];

    @OneToMany(() => ReviewEntity, review => review.user)
    reviews: ReviewEntity[];

    @OneToMany(() => RentEntity, rent => rent.user)
    rents: RentEntity[];

}

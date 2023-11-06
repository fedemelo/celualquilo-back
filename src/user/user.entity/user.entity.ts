/* eslint-disable prettier/prettier */
import { PhoneEntity } from 'src/phone/phone.entity';
import { RentEntity } from 'src/rent/rent.entity';
import { ReviewEntity } from 'src/review/review.entity/review.entity';
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
    password: string;

    @OneToMany(() => PhoneEntity, phone => phone.user)
    favorites: PhoneEntity[];

    @OneToMany(() => ReviewEntity, review => review.user)
    reviews: ReviewEntity[];

    @OneToMany(() => RentEntity, rent => rent.user)
    rents: RentEntity[];


    

}

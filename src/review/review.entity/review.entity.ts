/* eslint-disable prettier/prettier */
import { PhoneEntity } from 'src/phone/phone.entity';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReviewEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rating: number;

    @Column()
    text: string;

    @ManyToOne(() => PhoneEntity, phone => phone.reviews)
    phone: PhoneEntity;

    @ManyToOne(() => UserEntity, user => user.reviews)
    user: UserEntity;

    
}

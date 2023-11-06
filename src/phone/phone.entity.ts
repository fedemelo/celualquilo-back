/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BrandEntity } from '../brand/brand.entity';
import { RentEntity } from 'src/rent/rent.entity';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { ReviewEntity } from 'src/review/review.entity/review.entity';

@Entity()
export class PhoneEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    pricePerDay: string;

    @Column()
    stock: number;

    @Column()
    cameraSpecs: string;

    @Column()
    memorySpecs: string;

    @Column()
    screenSpecs: string;

    @Column()
    isLastGeneration: boolean;

    @Column()
    isOnSale: boolean;

    @Column()
    image: string;

    @OneToMany(() => RentEntity, rent => rent.phone)
    rents: RentEntity[];

    @OneToMany(() => ReviewEntity, review => review.phone) 
    reviews: ReviewEntity[];

    @ManyToOne(() => UserEntity, user => user.favorites)
    user: UserEntity;

    @OneToMany(() => BrandEntity, brand => brand.phones) 
    brand: BrandEntity;

}


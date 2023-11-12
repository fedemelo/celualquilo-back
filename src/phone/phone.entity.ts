/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BrandEntity } from '../brand/brand.entity';
import { RentEntity } from '../rent/rent.entity';
import { UserEntity } from '../user/user.entity';
import { ReviewEntity } from '../review/review.entity';

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

    @OneToOne(() => BrandEntity, brand => brand.phone, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    brand: BrandEntity;

}


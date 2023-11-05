/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BrandEntity } from '../brand/brand.entity';
import { RentEntity } from 'src/rent/rent.entity';

@Entity()
export class PhoneEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    pricePerDay: string;

    @Column()
    address: number;

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

    /*
    @OneToMany(() => ReviewEntity, review => review.phone) 
       reviews: ReviewEntity[];
    */

    /*
    @ManyToOne(() => UserEntity, user => user.phones)
       user: UserEntity;
    */

    @OneToOne(() => BrandEntity, brand => brand.phone)
    @JoinColumn()
    brand: BrandEntity;

}

function OneToMany(arg0: () => typeof RentEntity, arg1: (rent: any) => any): (target: PhoneEntity, propertyKey: "rents") => void {
    throw new Error('Function not implemented.');
}

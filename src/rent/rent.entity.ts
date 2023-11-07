import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhoneEntity } from "../phone/phone.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class RentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    isActive: boolean;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    paymentMethod: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    telephoneNumber: string;

    @ManyToOne(() => PhoneEntity, phone => phone.rents)
    phone: PhoneEntity;

    @ManyToOne(() => UserEntity, user => user.rents)
    user: UserEntity;
}
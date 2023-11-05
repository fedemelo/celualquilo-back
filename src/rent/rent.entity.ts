import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { UserEntity } from "src/user/user.entity";
import { PhoneEntity } from "src/phone/phone.entity";

@Entity()
export class RentEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    // @ManyToOne(() => UserEntity, user => user.rents, {
    //     onDelete: 'CASCADE'
    // })
    // user: UserEntity;
}
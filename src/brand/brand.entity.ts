
import { PhoneEntity } from "../phone/phone.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BrandEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToOne(() => PhoneEntity, phone => phone.brand)
    phone: PhoneEntity;
}

import { PhoneEntity } from "../phone/phone.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @ManyToOne(() => PhoneEntity, phone => phone.brand)
    phones: PhoneEntity[];
}
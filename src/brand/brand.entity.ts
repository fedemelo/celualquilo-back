import { PhoneEntity } from "src/phone/phone.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToOne(() => PhoneEntity, phone => phone.brand)
    phone: PhoneEntity;
}
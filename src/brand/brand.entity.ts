import { PhoneEntity } from "src/phone/phone.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
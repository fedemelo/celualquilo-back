/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

 /*
 @OneToMany(() => RentEntity, rent => rent.phone)
    rents: RentEntity[];
 */
 /*
 /*
 @OneToMany(() => ReviewEntity, review => review.phone) 
    reviews: ReviewEntity[];
 */
 /*
 @ManyToOne(() => UserEntity, user => user.phones)
    user: UserEntity;
 */
 /*
 @OneToOne(() => BrandEntity, brand => brand.phone)
 @JoinColumn()
 brand: BrandEntity;
*/

}   
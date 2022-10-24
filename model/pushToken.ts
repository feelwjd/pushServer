import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class PushToken {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    list_id!: number

    @Column()
    token!: string
    
}

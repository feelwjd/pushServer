import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { PushList } from "./pushList"

@Entity()
export class PushToken {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => PushList, (pushList) => pushList.id)
    list_id!: number

    @Column()
    token!: string
    
}

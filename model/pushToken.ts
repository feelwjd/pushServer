import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { PushList } from "./pushList"

@Entity()
export class PushToken {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    token!: string

    @ManyToOne(() => PushList, (pushList) => pushList.list)
    list!: PushList
    
}

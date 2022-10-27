import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm"
import { PushToken } from "./pushToken"

@Entity()
export class PushList {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    date!: string

    @Column()
    start_time!: string

    @OneToMany(()=> PushToken, (pushToken) => pushToken.list)
    list!: PushToken[]

}

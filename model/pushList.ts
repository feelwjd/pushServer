import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm"

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

}

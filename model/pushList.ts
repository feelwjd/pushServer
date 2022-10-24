import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class PushList {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    date!: number

    @Column()
    start_time!: string

}

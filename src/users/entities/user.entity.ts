import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    author: string

    @Column()
    secret: string

    @Column()
    email:string

    @Column()
    username: string

    @Column()
    password: string

}
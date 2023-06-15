import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";



@Entity( {name: "roles"})
export default class Roles{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    role: string

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
      })
      created_at: Date;


}
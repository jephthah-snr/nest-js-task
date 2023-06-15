import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";



@Entity({ name: "managers" })
export default class Managers {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  fullName: string;

  @Column()
  city: string;

  @Column()
  @Unique(["phoneNumber"])
  phoneNumber: string;

  @Column()
  roleId: string
}
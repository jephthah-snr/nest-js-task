import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from "typeorm";
  import { Books } from "./books.entity";

  
  @Entity({ name: "users" })
  export default class User {
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
    
    @Column({ select: false })
    password: string;

    @Column()
    address: string;

    @CreateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
    })
    created_at: Date;
  
    @UpdateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
      onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updated_at: Date;


    @OneToOne(() => Books)
    @JoinColumn()
    books: Books;
  }
  
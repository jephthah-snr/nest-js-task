import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import User from "./user.entity";




@Entity({ name: "books"})
export class Books{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    categoryId: string;

    @Column({default: true})
    is_availalbe: boolean

    @Column()
    currently_with: string

    @Column()
    last_returned_by: string

    @Column()
    returned_at: Date

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
}
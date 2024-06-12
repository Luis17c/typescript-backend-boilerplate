import { IUser } from "@/domain/models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', select: false })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    photo: string;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
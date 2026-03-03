import { EntityBase } from 'src/base/entity.base';
import { Company } from 'src/company/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User extends EntityBase {
    @Column({ nullable: true })
    photo: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    khmerName: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    passwordHash: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @ManyToOne(() => Role)
    @JoinColumn()
    role: Role;

    @ManyToOne(() => Company)
    @JoinColumn()
    company: Company;

    @Column({ nullable: true })
    signature: string;

    @Column({ default: false })
    isSignature: boolean;

    @Column('json')
    permission: string[];
}

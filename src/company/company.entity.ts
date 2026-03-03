import { EntityBase } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Company extends EntityBase {
    @Column({ nullable: true })
    companyNameKh?: string;
    @Column({ nullable: true })
    addressLine1Kh?: string;
    @Column({ nullable: true })
    addressLine2Kh?: string;

    @Column()
    companyNameEn: string;
    @Column({ nullable: true })
    addressLine1En?: string;
    @Column({ nullable: true })
    addressLine2En?: string;

    @Column({ nullable: true })
    companyNameCn?: string;
    @Column({ nullable: true })
    addressLine1Cn?: string;
    @Column({ nullable: true })
    addressLine2Cn?: string;

    @Column()
    companyShortName: string;
    @Column({ nullable: true })
    contactPhoneNumer?: string;
    @Column({ nullable: true })
    email?: string;
    @Column({ nullable: true })
    website?: string;

    @Column({ nullable: true })
    taxNo?: string;
    @Column()
    taxNoIssuedDate: Date;

    @Column({ nullable: true })
    commercialLicenseNo?: string;
    @Column()
    commercialLicenseNoIssuedDate: Date;

    @Column({ nullable: true })
    dynamicNAVCompanyCode?: string;
    @Column({ nullable: true })
    companyCode?: string;
}

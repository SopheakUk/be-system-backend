import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/company.entity';
import { Role } from 'src/user/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async onApplicationBootstrap() {
        await this.seedRole();
        await this.seedCompany();
    }

    async seedCompany() {
        const company = 'default';
        const exist = await this.companyRepository.find({
            take: 1,
        });
        if (exist.length === 0) {
            const defaultCompany = this.companyRepository.create({
                companyNameCn: company,
                companyNameEn: company,
                companyNameKh: company,
                companyShortName: company,
                taxNoIssuedDate: new Date(),
                commercialLicenseNoIssuedDate: new Date(),
            });
            await this.companyRepository.save(defaultCompany);
        }
    }

    async seedRole() {
        const role = 'admin';
        const exist = await this.roleRepository.findOne({
            where: { name: role },
        });
        if (!exist) {
            const adminRole = this.roleRepository.create({
                name: role,
                description: role,
                displayName: role,
            });
            await this.roleRepository.save(adminRole);
        }
    }
}

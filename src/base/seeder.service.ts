import {
    HttpException,
    Injectable,
    NotFoundException,
    OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/company.entity';
import { Role } from 'src/user/role.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from './password.generator';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async onApplicationBootstrap() {
        await this.seedRole();
        await this.seedCompany();
        await this.seedUser();
    }

    async seedUser() {
        const userName = 'admin';
        const exist = await this.userRepository.findOne({
            where: { userName: userName },
        });

        if (!exist) {
            const companyList = await this.companyRepository.find({
                take: 1,
            });

            const company = companyList[0];

            if (!company) {
                throw new NotFoundException('Company is not found');
            }

            const role = await this.roleRepository.findOne({
                where: { name: 'admin' },
            });

            if (!role) {
                throw new NotFoundException('Role is not found');
            }

            const passwordHash = await hashPassword(userName);

            const user = this.userRepository.create({
                userName: userName,
                khmerName: userName,
                name: userName,
                passwordHash: passwordHash,
                role: role,
                company: company,
            });
            await this.userRepository.save(user);
        }
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

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { SettingsEntity, ComissionsEntity } from '../entities';
import { SettingsService } from '../services';
import { SettingsRepository, ComissionsRepository } from '../repositories';


describe('Dashboard', () => {
    let settingsService: SettingsService;
    let sandbox: sinon.SinonSandbox;

    let settingsRepository: SettingsRepository;
    let comissionsRepository: ComissionsRepository;

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SettingsService,
                {
                    provide: getRepositoryToken(SettingsRepository),
                    useValue: sinon.createStubInstance(Repository),
                },
                {
                    provide: getRepositoryToken(ComissionsRepository),
                    useValue: sinon.createStubInstance(Repository),
                },
            ],
        }).compile();

        settingsService = module.get<SettingsService>(SettingsService);
        settingsRepository = module.get<SettingsRepository>(SettingsRepository);
        comissionsRepository = module.get<ComissionsRepository>(ComissionsRepository);
    });

    describe('Settings Repository', () => {
        it('should call findOne method with expected params', () => {
            const dataSpy = jest.spyOn(settingsRepository, 'findOne');
            let settingName: string = 'test';
            settingsRepository.findOne(settingName);
            expect(dataSpy).toHaveBeenCalledWith(settingName);
        });

        it('should call save method with expected params', () => {
            const dataSpy = jest.spyOn(settingsRepository, 'save');
            let setting: SettingsEntity = { name: 'test', value: 'testValue' };
            settingsRepository.save(setting);
            expect(dataSpy).toHaveBeenCalledWith(setting);
        });
    });

    describe('Comissions Repository', () => {
        it('should call findOne method with expected params', () => {
            const dataSpy = jest.spyOn(comissionsRepository, 'findOne');
            let id: number = 100;
            comissionsRepository.findOne(id);
            expect(dataSpy).toHaveBeenCalledWith(id);
        });

        it('should call save method with expected params', () => {
            const dataSpy = jest.spyOn(comissionsRepository, 'save');
            let comission = { user_id: '1111-11', commission_broker: 0.4, commission_mga: 0.18, excl_commission_broker: 0.6 };
            comissionsRepository.save(comission);
            expect(dataSpy).toHaveBeenCalledWith(comission);
        });
    });

    afterAll(async () => {
        sandbox.restore();
    });
});
import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../repositories';

@Injectable()
export class SettingsService {
    constructor(
        private readonly settingsRepository: SettingsRepository,
    ) { }

    /**
     * Save setting to DB as setting name - json object
     */
    async saveSetting<T>(settingName: string, settingValue: T) {
        let preparedValue = (typeof settingValue === 'object') ? JSON.stringify(settingValue) : settingValue.toString();
        return this.settingsRepository.save({ name: settingName, value: preparedValue });
    }

    /**
     * Get specific setting property from json
     * @param settingName name of the setting
     * @param property name of the property in json
     */
    async getSetting(settingName: string, property: string) {
        let settings = await this.settingsRepository.findOne(settingName);
        let parsedData = JSON.parse(settings.value);
        return parsedData[property];
    }

}
import { TaxesSettingsDto } from '../dto/settings';

export type Comissions = Pick<TaxesSettingsDto, 'commission_broker' & 'commission_mga'>;
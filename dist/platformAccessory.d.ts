import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { CieloHomebridgePlatform } from './platform';
import { CieloHVAC } from 'node-smartcielo-ws';
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export declare class CieloPlatformAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly hvac;
    private service;
    private temperatureDisplayUnits;
    constructor(platform: CieloHomebridgePlatform, accessory: PlatformAccessory, hvac: CieloHVAC);
    getCurrentHeatingCoolingState(): Promise<CharacteristicValue>;
    getTargetHeatingCoolingState(): Promise<CharacteristicValue>;
    getCurrentTemperature(): Promise<CharacteristicValue>;
    getTargetTemperature(): Promise<CharacteristicValue>;
    getTemperatureDisplayUnits(): Promise<CharacteristicValue>;
    setTargetHeatingCoolingState(state: CharacteristicValue): Promise<void>;
    setTargetTemperature(temperature: CharacteristicValue): Promise<void>;
    setTemperatureDisplayUnits(displayUnits: CharacteristicValue): Promise<void>;
    private getModeHelper;
    private convertCelsiusToFahrenheit;
    private convertFahrenheitToCelsius;
    private convertHeatingCoolingStateToMode;
    private convertModeToHeatingCoolingState;
}
//# sourceMappingURL=platformAccessory.d.ts.map
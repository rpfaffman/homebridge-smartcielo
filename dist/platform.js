"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CieloHomebridgePlatform = void 0;
const settings_1 = require("./settings");
const platformAccessory_1 = require("./platformAccessory");
const node_smartcielo_ws_1 = require("node-smartcielo-ws");
/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
class CieloHomebridgePlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        // this is used to track restored cached accessories
        this.accessories = [];
        // Initialize the API connection
        this.hvacAPI = new node_smartcielo_ws_1.CieloAPIConnection((commandedState) => {
            this.log.debug('Commanded State Change:', JSON.stringify(commandedState));
        }, (roomTemperature) => {
            this.log.info('Updated Room Temperature:', roomTemperature);
        }, (err) => {
            this.log.error('Communication Error:', err);
            this.log.error('Reconnecting in 30 seconds...');
            setTimeout(async () => {
                this.log.debug('Connecting to API...');
                await this.hvacAPI.establishConnection(this.config.username, this.config.password, this.config.ip, undefined);
                await this.hvacAPI.subscribeToHVACs(this.config.macAddresses);
                // run the method to discover / register your devices as accessories
                this.discoverDevices();
            }, 30000);
        });
        this.log.debug('Finished initializing platform');
        // When this event is fired it means Homebridge has restored all cached accessories from disk.
        // Dynamic Platform plugins should only register new accessories after this event was fired,
        // in order to ensure they weren't added to homebridge already. This event can also be used
        // to start discovery of new accessories.
        this.api.on('didFinishLaunching', async () => {
            this.log.debug('Connecting to API...');
            await this.hvacAPI.establishConnection(this.config.username, this.config.password, this.config.ip, undefined);
            await this.hvacAPI.subscribeToHVACs(this.config.macAddresses);
            log.debug('Executed didFinishLaunching callback');
            // run the method to discover / register your devices as accessories
            this.discoverDevices();
        });
    }
    /**
     * This function is invoked when homebridge restores cached accessories from disk at startup.
     * It should be used to setup event handlers for characteristics and update respective values.
     */
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.accessories.push(accessory);
    }
    /**
     * This is an example method showing how to register discovered accessories.
     * Accessories must only be registered once, previously created accessories
     * must not be registered again to prevent "duplicate UUID" errors.
     */
    discoverDevices() {
        // loop over the discovered devices and register each one if it has not already been registered
        for (const device of this.hvacAPI.hvacs) {
            // generate a unique id for the accessory this should be generated from
            // something globally unique, but constant, for example, the device serial
            // number or MAC address
            const uuid = this.api.hap.uuid.generate(device.getMacAddress());
            // see if an accessory with the same uuid has already been registered and restored from
            // the cached devices we stored in the `configureAccessory` method above
            const existingAccessory = this.accessories.find((accessory) => accessory.UUID === uuid);
            if (existingAccessory) {
                // the accessory already exists
                this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                // if you need to update the accessory.context then you should run `api.updatePlatformAccessories`. eg.:
                // existingAccessory.context.device = device.getMacAddress();
                // this.api.updatePlatformAccessories([existingAccessory]);
                // create the accessory handler for the restored accessory
                // this is imported from `platformAccessory.ts`
                new platformAccessory_1.CieloPlatformAccessory(this, existingAccessory, device);
            }
            else {
                // the accessory does not yet exist, so we need to create it
                this.log.info('Adding new accessory:', device.getDeviceName());
                // create a new accessory
                const accessory = new this.api.platformAccessory(device.getDeviceName(), uuid);
                // store a copy of the device object in the `accessory.context`
                // the `context` property can be used to store any data about the accessory you may need
                // accessory.context.device = device;
                // create the accessory handler for the newly create accessory
                // this is imported from `platformAccessory.ts`
                new platformAccessory_1.CieloPlatformAccessory(this, accessory, device);
                // link the accessory to your platform
                this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [
                    accessory,
                ]);
            }
        }
    }
}
exports.CieloHomebridgePlatform = CieloHomebridgePlatform;
//# sourceMappingURL=platform.js.map
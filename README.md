# Cielo Thermostat Homebridge Plugin

[![license](https://badgen.net/github/license/isaac-webb/homebridge-mrcool)](https://github.com/ryanfroese/homebridge-smartcielo/blob/master/LICENSE)
[![npm](https://badgen.net/npm/v/homebridge-mrcool)](https://www.npmjs.com/package/homebridge-smartcielo)
[![npm](https://badgen.net/npm/dt/homebridge-mrcool)](https://www.npmjs.com/package/homebridge-smartcielo)

This plugin allows HomeKit to control Cielo mini splits using the [`node-smartcielo-ws`](https://github.com/ryanfroese/node-cielo) package.

## Acknowledgements

Like [`node-mrcool`](https://github.com/isaac-webb/node-mrcool), the vast majority of this code is either copied straight from or largely
based on [Nicholas Robinson's](https://github.com/nicholasrobinson)
[`homebridge-smartcielo`](https://github.com/nicholasrobinson/homebridge-smartcielo). I then copied [isaac-webb's](https://github.com/isaac-webb) version and made the changes necessary to make this plugin work
with my rewritten version of his API package.

## Usage

To configure the package, use the Homebridge UI. You will need your username, password, and your public IP (I suspect this doesn't actually
have to be your public IP, but the API uses it as a session identifier). Then, add the MAC address of each MrCool unit you would like to
control.

## Contributing

This is my first fork of another package, and I'm still learning how to use GitHub to collaborate.

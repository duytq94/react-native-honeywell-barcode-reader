# React Native Honeywell Barcode Reader

This package works with Honeywell devices that have an integrated barcode scanner, like the Honeywell EDA50K (tested).

Actually, I custom from https://github.com/Volst/react-native-honeywell-scanner but fix can not remove event listener (even you close the reader). And if you don't remove, the event will fire twice, tripple... more and more times when you call `addListener` until you kill the app.

The bug at here is you can not remove event listener by call `DeviceEventEmitter.removeListener(eventName, handler)` since it doesn't have this method. Follow here: https://stackoverflow.com/questions/36886628/how-do-you-remove-a-listener-from-react-natives-eventemitter-instance

## Installation

```
npm i react-native-honeywell-barcode-reader
```

## Link automatically:

```
react-native link react-native-honeywell-barcode-reader
```

## Link manually (recommend):

1. In `app\build.gradle` add
```
compile project(':react-native-honeywell-barcode-reader')
```

2. In `settings.gradle` add

```
include ':react-native-honeywell-barcode-reader'
project(':react-native-honeywell-barcode-reader').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-honeywell-barcode-reader/android')
```

3. In `MainApplication.java`

Add this line to import package
```
import com.duytq94.HoneywellBarcodeReader.HoneywellBarcodeReaderPackage;
```
and add this line to getPackages()
```
new HoneywellBarcodeReaderPackage()
```

## Usage

First you'll want to check whether the device is a Honeywell scanner:

```js
import HoneywellBarcodeReader from 'react-native-honeywell-barcode-reader';

HoneywellBarcodeReader.isCompatible // true or false
```

The barcode reader needs to be "claimed" by your application; meanwhile no other application can use it. You can do that like this:

```js
HoneywellBarcodeReader.startReader().then((claimed) => {
    console.log(claimed ? 'Barcode reader is claimed' : 'Barcode reader is busy');
});
```

To get events from the barcode scanner:

```js
HoneywellBarcodeReader.onBarcodeReadSuccess(event => {
    console.log('Received data', event);
});

HoneywellBarcodeReader.onBarcodeReadFail(() => {
    console.log('Barcode read failed');
});
```

To free the claim and stop the reader, also freeing up resources:

```js
HoneywellBarcodeReader.stopReader().then(() => {
    console.log('Freedom!');
});
```

To stop receiving events:

```js
HoneywellBarcodeReader.offBarcodeReadSuccess();
HoneywellBarcodeReader.offBarcodeReadFail();
```

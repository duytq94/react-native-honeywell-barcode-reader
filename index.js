const ReactNative = require('react-native')
const { NativeModules, DeviceEventEmitter } = ReactNative
const HoneywellBarcodeReader = NativeModules.HoneywellBarcodeReader || {} // Hacky fallback for iOS

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of barcodeReadSuccess, barcodeReadFail
 * @param  {Function} handler Event handler
 */

var subscriptionBarcodeReadSuccess = null
var subscriptionBarcodeReadFail = null

HoneywellBarcodeReader.onBarcodeReadSuccess = (handler) => {
    subscriptionBarcodeReadSuccess = DeviceEventEmitter.addListener(HoneywellBarcodeReader.BARCODE_READ_SUCCESS, handler)
}

HoneywellBarcodeReader.onBarcodeReadFail = (handler) => {
    subscriptionBarcodeReadFail = DeviceEventEmitter.addListener(HoneywellBarcodeReader.BARCODE_READ_FAIL, handler)
}

/**
 * Stop listening for event
 * @param  {String} eventName Name of event one of barcodeReadSuccess, barcodeReadFail
 * @param  {Function} handler Event handler
 */
HoneywellBarcodeReader.offBarcodeReadSuccess = () => {
    subscriptionBarcodeReadSuccess.remove()
}
HoneywellBarcodeReader.offBarcodeReadFail = () => {
    subscriptionBarcodeReadFail.remove()
}

module.exports = HoneywellBarcodeReader

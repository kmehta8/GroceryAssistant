/* global cordova, regionDiv, rangeDiv */

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.rangeBeacon();
    },
    rangeBeacon: function () {

        var uuid = '00000000-0000-0000-0000-000000000007';
        var identifier = 'ibeacon';
        var major = 43690;
        var minor = 4369;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor, true);
        console.log(beaconRegion)
        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {
            console.log(pluginResult);
        };

        delegate.didEnterRegion = function (/*pluginResult*/) {
            regionDiv.innerText = 'Inside Region';
            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
                .fail(function (e) { console.error(e); })
                .done();
        };

        delegate.didExitRegion = function (/*pluginResult*/) {
            regionDiv.innerText = 'Outside Region';
            cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
                .fail(function (e) { console.error(e); })
                .done();
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            console.log(pluginResult);
            if (pluginResult.beacons.length > 0) {
                var proximity = pluginResult.beacons[0].proximity;
                rangeDiv.innerText = proximity.replace('Proximity', 'Proximity: ');
            } else {
                rangeDiv.innerText = '';
            }
        };

        cordova.plugins.locationManager.setDelegate(delegate);
        cordova.plugins.locationManager.requestWhenInUseAuthorization();

        cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(function (e) { console.log("failed"); })
            .done();

    }
};

app.initialize();
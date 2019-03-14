exports.handler = function(context, event, callback) {
	let client = context.getTwilioClient();

    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (typeof(context.STATS_SYNC_SERVICE_SID) === 'undefined') {
        response.body = 'Sync Service unavailable';
        callback(null, response);
    }

    client.sync.services(context.STATS_SYNC_SERVICE_SID)
        .syncMaps(context.STATS_SYNC_MAPS_SID)
        .syncMapItems
        .list()
        .then(syncMapItem => {

            let responsebody = {};
            for (let i in syncMapItem) {
                responsebody[syncMapItem[i].key] = syncMapItem[i].data;
            }
            response.body = responsebody;
            console.log(response.body);
            callback(null, response);
        })
        .catch(error => {
            console.log(error);
            callback(error);
        });
};

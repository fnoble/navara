import { Middleware } from 'redux'
import Client from '@signalk/client'

import { startConnecting, connectionEstablished } from './signalkSlice';
import { selectSignalKConnected } from './signalkSlice';
import { applySignalKDelta } from '../features/vessels/vesselsSlice';
 
const signalkMiddleware: Middleware = store => {
  let client: Client;
 
  return next => action => {
    const isConnectionEstablished = client && selectSignalKConnected(store.getState());
 
    if (startConnecting.match(action)) {

        console.log("Starting SignalK Connection");
        client = new Client({
            hostname: 'demo.signalk.org',
            port: 443,
            reconnect: true,
            autoConnect: false,
            notifications: false,
            // Either "self", "all", "none", or null (see below)
            // - null: no behaviour is set for the delta stream, default behaviour is used. Use this option when connecting to older devices that don't support the subscription modifiers per query request. See https://signalk.org/specification/1.4.0/doc/subscription_protocol.html.
            // - "self" provides a stream of all local data of own vessel
            // - "all" provides a stream of all data for all vessels
            // - "none" provides no data over the stream
            deltaStreamBehaviour: 'none',
            // Either "all" or null.
            // - null: provides no Meta data over the stream
            // - "all" include Meta data of all data for all vessels
            //sendMeta: 'all',
            // Sends an empty message to the websocket every 10 seconds when the client does not receive any more update from the server to detect if the socket is dead.
            wsKeepaliveInterval: 10,
            subscriptions: [
              {
                context: 'vessels.*',
                subscribe: [
                  {
                    path: 'navigation.*',
                    policy: 'instant',
                  },
                ],
              },
            ],
        })
 
      client.on('connect', () => {
        store.dispatch(connectionEstablished());
      })
 
      client.on('delta', (delta) => {
        store.dispatch(applySignalKDelta(delta));
      })

      client.connect();
    }
 
    next(action);
  }
}
 
export default signalkMiddleware;
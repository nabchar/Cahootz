# API Endpoints

## HTML API

### Root

- `GET /` - loads React app

## JSON API

### Users

- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id`
- `GET /api/users/:id`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Channels

* `GET /api/channels`
* `POST /api/channels`
* `GET /api/channels/:id`
* `PATCH /api/channels/:id`
* `DELETE /api/channels/:id`

* `POST /api/channels/:id/subscriptions` to 'api/channels#subscribe'
* `DELETE /api/channels/:id/subscriptions` to 'api/channels#unsubscribe'

* `GET /api/subscriptions` to 'api/channels#subscriptions' (get subscribed channels of current User);

### Messages

* `GET /api/channels/:id/messages`
* `POST /api/channels/:id/messages`

* `PATCH /api/messages/:id`
* `DELETE /api/messages/:id`

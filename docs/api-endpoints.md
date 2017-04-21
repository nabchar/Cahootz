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

### Subscriptions
* `GET /api/subscriptions/` => current user's subscribed channels
* `POST /api/subscriptions/:channelId`
* `DELETE /api/subscriptions/:channelId`


### Messages

* `GET /api/channels/:id/messages`
* `POST /api/channels/:id/messages`

* `PATCH /api/messages/:id`
* `DELETE /api/messages/:id`

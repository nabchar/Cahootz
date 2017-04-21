# DB Schema

## User

| column          | type     | database-level validations | model-level validations |
|-----------------|----------|----------------------------|-------------------------|
| username        | `string` |    `null-false`            |   `unique` `presence`   |
| password_digest | `string` |    `null-false`            |   `unique` `presence`   |
| session_token   | `string` |    `null-false`            |   `unique` `presence`   |
| last_channel_id    | `integer` |    `null-false`            |   `unique` `presence`   |

*User Model Associations:*
- **Has Many**
  - Subscriptions
  - Channels through Subscriptions
  - Messages


## Channel - (Note: Direct Message will be a subset of Channel based on the 'private' attribute)

| column      | type      | database-level validations | model-level validations |
|-------------|-----------|----------------------------|-------------------------|
| name        | `string`  |    `null-false`            |   `unique` `presence`   |
| purpose     | `string`  |                            |                         |
| description | `string`  |                            |                         |
| private     | `boolean` |    `default: false`        |                         |

*Channel Model Associations:*
- **Has Many**
  - Subscriptions
  - Members(users) through Subscriptions
  - Messages


## Subscription

| column     | type      | database-level validations | model-level validations |
|------------|-----------|----------------------------|-------------------------|
| user_id    | `integer` |    `null-false`            |      `presence`         |
| channel_id | `integer` |    `null-false`            |      `presence`         |

*Subscription Model Associations:*
- **Belongs To**
- User
- Channel


## Message

| column     | type      | model-level validations  |
|------------|-----------|--------------------------|
| content    | `string`  |                          |
| type       | `string`  | `presence`               |
| user_id    | `integer` | `presence`               |
| channel_id | `integer` | `presence`               |

*Message Model Associations:*
- **Belongs To**
  - User
  - Channel

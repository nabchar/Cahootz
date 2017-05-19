# README

Cahootz is collaborative live messaging platform inspired by Slack and was built end-to-end in 2 weeks.

[Live Site](http://www.cahootz.club/#/)

## Implementation

Cahootz's UI and single-page architecture were built with React.js and Ruby on Rails. Messaging data is stored in a Postgres database, while AWS hosts all user images.

In addition, the app also utilizes the following technologies:
- Redux
- BCrypt
- Pusher
- Figaro
- Paperclip
- jBuilder
- react-modal

## Features

The application is composed of the following main features:

### Authentication

Cahootz hand-rolls user authentication via BCrypt by hashing user passwords and saving only the encrypted user-data to the server. A cookie storing a hashed token keeps track of the user's current session.  Without a matching session token, the user is redirected to the login page for authentication.  

### Real-time Messaging

The app leverages the Pusher API in order to maintain a WebSocket, TCP-based protocol connection, which enables bi-directional communication between the server and the client.

#### Pub/Sub Design Pattern

In order to accomplish real-time messaging, this app implements the publish-subscribe design pattern.

When a client navigates to a particular channel, they are then `subscribed` via Pusher to a unique connection for that channel that immediately begins listening for three separate kinds of events. When a message is `_published`, `_updated`, or `_deleted`, the client will fetch the associated message.

```js
let channel = this.pusher.subscribe('channel_' + currentChannel.id);
channel.bind('message_published', (data) => {
  this.props.fetchMessage(data.id, currentChannel.id);
});
channel.bind('message_updated', (data) => {
  this.props.fetchMessage(data.id, currentChannel.id);
});
channel.bind('message_deleted', (data) => {
  this.props.fetchMessages(currentChannel.id);
});
```

On the backend, whenever a message is `created`, `updated`, or `destroyed`, the associated event is `published` on that channel via Pusher.

```ruby
if @message.save
  Pusher.trigger("channel_#{@message.channel_id}",'message_published', {id: @message.id})
end
```
...

```ruby
if @message.update(message_params)
  Pusher.trigger("channel_#{@message.channel_id}",'message_updated', {id: @message.id})
end
```

### Channels

The app's collaborative real-time messaging is organized in topically-themed channels. These channels are public and can be subscribed to by all users.

### Direct Messages

Cahootz also allows for 1-1 and multi-person private, direct messaging.

Direct Messages share much of the same functionality as Channels. They are both platforms for conversation with a variable number of members. However, DM's are not public and are not available for all users to subscribe to.

Instead, DM's were designed as 'private' channels, where only the creator and recipients of the direct message are subscribed.

Keeping DM's as a subset of Channels was a design decision that both helped to streamline the backend, as well as keep code DRY.

## Future Release
This is still very much an ongoing project; one that is also open to collaboration. The following are a list of features that I plan to implement going forward. If anyone is interested in contributing to any of these features, please feel free to contact me at nicholas.ab.char@gmail.com.

* [X] User Avatar Upload
* [X] Notifications
* [X] Teams/Groups
* [X] Message Formatting
* [X] Emoticon Reactions
* [X] GIF Support

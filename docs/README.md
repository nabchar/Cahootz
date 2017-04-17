# Cahoots

### Quick Links: ---- [Heroku][heroku] ---- [Trello][trello] ----

[heroku]: http://www.herokuapp.com
[trello]: https://trello.com/b/nG73Ztn9/aa-fullstack-project

## Minimum Viable Product - MVP

Cahoots is a web application inspired by Slack built using Ruby on Rails
and React/Redux. By the end of Week 9, this app will, at a minimum, satisfy the
following criteria with smooth, bug-free navigation, adequate seed data and
sufficient CSS styling:

* Hosting on Heroku
* New account creation, login, and guest/demo login
* Live chat
* Channels
* Direct Message
* Teams or multi-person DM
* Production README (replacing this README)

## Design Docs
* [DB schema][schema]
* [API endpoints][api-endpoints]
* [Sample State][sample-state]
* [React Components][components]
* [View Wireframes][wireframes]

[schema]: docs/schema.md
[api-endpoints]: docs/api-endpoints.md
[sample-state]: docs/sample-state.md
[components]: docs/component-hierarchy.md
[wireframes]: docs/wireframes

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days )

W8D2, W8D3

**Objective:** Functioning rails project with front-end Authentication

- Setup New Rails project
- Create `User` model
- Backend authentication (session/user)
- Create `StaticPages` controller and root view
- Setup frontend file structure, dependencies & packages
- Create `APIUtil` to facilitate API interaction
- Redux cycle for frontend authentication
- Make signup/signin components
- Style signup/signin components
- Seed users

### Phase 3: Messages Model, API, and components (2 days)

W8D4, W8D5

**Objective:** Messages can be created, read, edited and destroyed through the API.

### Phase 2: Channels (2 days)

W9D1, W9D2 (Peer Review)

**Objective:** Channels can be created, read, edited and destroyed through the API.

### Phase 4: Direct Messages (2 days)

W9D3, W9D4

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

### Phase 5: TBD (1 day)

W9D5

**Objective:** TBD

### Bonus Features (TBD)
* **Bonus**: Emoji / Reaction Support
* **Bonus**: Giphy Support
* **Bonus**: Message Styling
* **Bonus**: Notifications
* **Bonus**: Search Messages

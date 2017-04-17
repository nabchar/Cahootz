## Sample State


```

  currentUser: {
    id: 1,
    username: 'nabchar'
  },

  errors: [],

  channels: {
    1: {
      name: 'general',
      purpose: null,
      description: 'General stuff',
      members: [ {
                    id: 1
                    username: nabchar  
                  }, ...
                ],
      private: false,
      created: "April 16, 2017"
    },

    2: {
      name: 'dm-13578623',
      private: true
    }
    ...
  },

  users: {
    1: {
      id: 2,
      username: 'mbones',
    },

    2: {
      id: 3,
      username: 'rariav',
    }
  },

  messages: {
    1: {
      id: 58,
      user_id: 1,
      channel_id: 1,
      content: 'Well, generally speaking...'
    },

    2: {
      id: 59,
      user_id: 2,
      channel_id: 1,
      content: 'You would!'
    }
  }

```

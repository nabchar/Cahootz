# React Component Heirarchy

## ApplicationContainer

**SplashContainer**

**SessionFormContainer**
- Header
- SessionForm

**MainHeader**
  - Channel Info Container
    - Channel Name
    - Channel Member Count
    - Channel Description
  - Utility Container
    - Gear Dropdown (Channel Settings)
    - Channel Sidebar (Toggle)
    - Search
      - Search Icon
      - Search Input

**MessagesIndexContainer**
- MessageIndex
  - MessageIndexItem
    - Username
    - Timestamp
    - Message
    - Avatar
- MessageFormContainer
  - MessageForm

**UserNavContainer**
  - User Information
  - ChannelIndexContainer
    - ChannelIndex
  - DMIndexContainer
    - DMIndex

**ChannelDetailContainer**
  - Channel Name
  - Channel Details
    - Channel Purpose
    - Channel Description
  - Members


**ChannelFormContainer**
  - ChannelForm

**DMFormContainer**
  - DMForm

**BrowseChannelContainer**
  - BrowseChannel



|    Path                                 |      Component           |
|-----------------------------------------|--------------------------|
| "/splash"                               | "Splash"                 |
| "/sign-up"                              | "SessionFormContainer"   |
| "/sign-in"                              | "SessionFormContainer"   |
| "/main"                                 | "SessionFormContainer"   |

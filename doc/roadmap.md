# Features
## App name
* The app's name is `Sekre` meaning __secure__ in _Norwegian_.
## Client-side storage
- [x] [Dexie](https://dexie.org/docs/Tutorial/React).
### Persist data (Own table)
- x] Store `main key`.
- [x] Table containing IDs of secrets that use the `main key`.
- [X] Secrets table.
  
## Frontend
### Design
1. [Bottom navigation bar](https://callstack.github.io/react-native-paper/bottom-navigation.html).
   * For Navigation between major pages.
2. Main content.
3. Top bar
   1. For going back.
   2. Page title.
   3. Major buttons.
   
### Secret List (Major)
#### Top bar
- [x] Show list of `secret`s.
- [ ] Tapping an item navigates to the `secret` editor.
- [x] Each item has quick action buttons:
  - [ ] Show button 
    - [ ] Reveals the `secret`.
    - [ ] UI
  - [ ] Copy button 
    - [ ] Copies the `secret` to the clipboard using [@react-native-clipboard/clipboard](https://www.npmjs.com/package/@react-native-clipboard/clipboard).
    - [x] UI
  -  _Implimentation note_: Authentication is still required after tapping these unless the secret uses the `main key`.
- [ ] Filter secrets
  - [ ] matches name
  - [ ] searchbar
### Creation Form (Major)
#### Text fields:
- [x] Secret's label.
- [x] The `secret` itself.
- [x] The `key` for the `secret`.

#### Buttons:
- [x] Use main password.
- [ ] Generate `key`.
- [x] Clear inputs.
- [ ] Visibility toggles for `key` and `secret`.
- [x] Submit button
    - [x] UI.
    - [x] Logic.

#### Submission
- [x] Validation.
  - [x] Disable button unless valid
- [x] Encrypt `secret` using [Crypto JS' AES-256](https://cryptojs.gitbook.io/docs/).
- [x] Insert `secret` to the local DB.

### Secret Editor
#### Content
_buttons displayed from right to left._
- [ ] Delete
  - [ ] UI
  - [ ] Logic
  - [ ] Confirmation prompt
- [ ] Edit (optional)
- [ ] Show
  - [x] UI
  - [x] Logic
- [ ] Copy
  - [ ] UI
  - [ ] Logic
- [x] Go back

### Auth Page
- [x] Title shows intent.
- [x] Accepts children props.
  - [x] Before `key field`.
  - [x] After `key field`. 
- [ ] Show `key field`.
- [ ] Button to toggle `key` visibility.
- [x] Major buttons
  - [x] Go back
  - [x] Submit

## Settings (Major)
- [ ] About the app - try SUQUI.
- [ ] About the devs - try SUQUI.
- [ ] Export data.
- [ ] Import data.
## Splash screen
- [x] On first time visit, setup `main key` reuse `Auth`.
- [ ] LOGO - try SUQUI.
- [ ] Guided tutorial (optional).
# File-uploader

Basic apllication to upload files to an express-server

## Requirements

### API requirements

#### GET Home route

Home route which returns entrys with `parentId == 'Null'`

#### GET Children route

Chrildren route which searches for all the childrens of a certain parent

Look for entry with `parentId = <Id of parent>`

#### POST Entry

__Input__: `{name, parentId (optional), type (optional)}`
__Output__: JSON object with created entry

### Frontend requirements

#### Home contents

- Iterate through array of `GET Home route` and display it
- Displayed object must be clickable
- When `FOLDER` double-clicked, user must be forwarded to children of `FOLDER`

#### Navigation

- Show children of `FOLDER` when clicking it (use `GET Children route`)
- Show File when clicking on a `FILE`

Hype Machine User Favorites
===========================

Get all of your favorited songs from [Hype Machine](http://hypem.com)


## Install

`$ npm install hypem-favs`

## Usage

```js
var HypemFavs = require('hypem-favs');
var favs = HypemFavs(username);

// Get all of your favorites from a designated page
var pageNumber = 1;
fav.get(pageNumber, function(err, data) {
  if (err) {
    // handle Error
  }

  // handle response data
});

//Get all of you favorites
fav.getAll(function(err, data) {
  if (err) {
    // handle Error
  }

  // handle response data
});
```

## API

### favs.get([page], callback)

- page: Optional Page Number, default is 1
- callback: Function, callback signature _function(err, data)_
  - err: Error
  - data: Object
    - statusCode: Number
    - username: String
    - songs: Array
      - mediaid: String
      - artist: String
      - title: String
      - dateposted: Date
      - siteid: Number
      - sitename: String
      - posturl: URL
      - postid: Number
      - loved_count: Number
      - posted_count: Number
      - thumb_url: UR:
      - thumb_url_medium: URL
      - thumb_url_large: URL
      - thumb_url_artist: URL
      - time: Number, Song length in seconds
      - description: String
      - dateloved: Date
      - user_dateloved: Date
      - itunes_link: URL


### favs.getAll([page], callback)

See [favs.get([page], callback)](#favsgetpage-callback) for details


by Andy B

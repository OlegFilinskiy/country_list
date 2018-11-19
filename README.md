# Country list
plugin for create list of country

## install

```shell
npm install @koterion/country_list
```

## use

Download the [latest release](https://github.com/koterion/country_list/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/@koterion/country_list)

Include css
```html
<link rel="stylesheet" href="path/to/countryList.css">
```
or sass
```sass
@import "@koterion/country_list/src/sass/countryList.sass"
```

#### options

option | type | default | desc |
:--- | :---: | :---: | :--- |
[countryAll](#countryall) | array | `[]` | List of country you wanna use |
[delete](#delete) | boolean | `false` | If `true` delete country using `countryAll` (don't use with option list)
flagInInput | boolean | `false` | If `true` add flags to current selector
flagInSelect | boolean | `false` | If `true`  add flags to dropdown
[geo](#geo) | object | | Use for checked country by ip |
inputCountryName | string | `country` | Name for `input` with country name (auto create `type=hidden`)
inputPhoneName | string | `phone` | Name for `input` with phone number (auto create)
list | boolean | `false` | If `true` create list of country using `countryAll` (don't use with option delete)
search | boolean | `false` | If `true` create input with name from `inputCountryName`, live search in country list
select | boolean | `false` | If `true` create list like select
                 
### countryAll

Use with `delete` or `list`

### delete

Don't use with `list`

### geo
For define country by ip we use service [Sypexgeo](https://api.sypexgeo.net/)

You can rewrite method, it option `geo` by default it's object with this parameters: 
```js
  url: 'https://api.sypexgeo.net/',
  getIso: function (response) {
    return response.country.iso
  }
```
`url` - api for service, `getIso` - return country iso

Also you can use data attribute `data-current` with current country in ISO format. Example:
```html
<div class="select" data-current="us"></div>
```
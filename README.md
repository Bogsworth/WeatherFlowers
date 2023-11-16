
# Weather_Flowers

Weather_Flowers is a class for creating an array of weather events

## Installation

This section should probably be added.

## Usage

```
// Finds the average hazard level over given number of days
node Weather_Flowers.js average

// generates a list of spring, summer, autumn, or winter weather
// season string is required
// -d to add days, -s to add starting coordinates
node Weather_Flowers.js generate spring
...
node Weather_Flowers.js generate winter
```

## Coordinate Diagram

![Coordinate Graph](./CoordinateExample.png "Sorry it's 45 degrees off, paint doesn't allow for rotating under 90 degrees anymore...")

## Weather Flowers Rules

![Weather Hexes](https://preview.redd.it/q9om7rf3vzb71.jpg?width=2480&format=pjpg&auto=webp&s=d62de17b624f1487bfe24ee512980b1250d13229)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## Credits

This is based on the weather generator created by reddit user [/u/KorbohneD](https://www.reddit.com/user/KorbohneD)

The original thread is linked [here](https://www.reddit.com/r/osr/comments/omtd4g/4_season_weather_table_hex_easy_and_logical/)

### Empty Constructors

Constructors below are used for the `Season` class

```javascript
const _HEX_MAP = new Map([
    // Center
    ['0,0', new WeatherHex('', false)],

    // 1st Ring
    ['0,1', new WeatherHex('', false)],
    ['1,1', new WeatherHex('', false)],
    ['1,0', new WeatherHex('', false)],
    ['0,-1', new WeatherHex('', false)],
    ['-1,-1', new WeatherHex('', false)],
    ['-1,0', new WeatherHex('', false)],

    // 2nd Ring
    ['0,2', new WeatherHex('', false)],
    ['1,2', new WeatherHex('', false)],
    ['2,2', new WeatherHex('', false)],
    ['2,1', new WeatherHex('', false)],
    ['2,0', new WeatherHex('', false)],
    ['1,-1', new WeatherHex('', false)],
    ['0,-2', new WeatherHex('', false)],
    ['-1,-2', new WeatherHex('', false)],
    ['-2,-2', new WeatherHex('', false)],
    ['-2,-1', new WeatherHex('', false)],
    ['-2,0', new WeatherHex('', false)],
    ['-1,1', new WeatherHex('', false)]
]);
const _EXCEPTIONS = new Map([
    ['', ['']],
    ['', ['']],
    ['', ['']],
    ['', ['']],
    ['', ['']],
    ['', ['']],
    ['', ['']],
    ['', ['']]
])
const _START_LOCATIONS = new Map([
    [2, ''],
    [3, ''],
    [4, ''],
    [5, ''],
    [6, ''],
    [7, ''],
    [8, ''],
    [9, ''],
    [10, ''],
    [11, ''],
    [12, '']
]);
```
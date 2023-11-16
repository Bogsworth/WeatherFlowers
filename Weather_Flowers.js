#!/usr/bin/env node

//TODONE: Make into a CLI program using Commander
/***************************
 * 
 * Class Declarations
 * 
 ***************************/
//#region 
class WeatherHex {
    constructor( weather, hazard_level = 0 ) {
        this.weather = weather;
        // hazard level can be 0, 1, or 2
        this.hazard_level = hazard_level;
    }
}

class Season {
    constructor( hex_map, exceptions, start_locations, name) {
        this.name = name,
        this.hex_map = hex_map,
        this.exceptions = exceptions,
        this.start_locations = start_locations
        this.max_units_from_center = 2;
    };

    generateForecast( days, start_location = this.start_locations.get( rollTwoDice() )) {
        const MAX = this.max_units_from_center;
        const CHECK_ARRAY = stringToArray( start_location )
        let error_msg = `That is an illegal set of coordinates. ` +
            `Next time please choose one between -2,-2 and 2,2\n`; 
            
        if (
            CHECK_ARRAY[0] < ( 0 - MAX ) ||
            CHECK_ARRAY[1] < ( 0 - MAX ) ||
            CHECK_ARRAY[0] >  MAX ||
            CHECK_ARRAY[1] >  MAX
        ) {
            start_location = this.start_locations.get( rollTwoDice() );
            error_msg += `Your new coordinates are ${start_location}`;
            console.log( error_msg );
        }
        
        const RESULTS = runForSomeDays(
            this,
            start_location,
            days
        );
        return RESULTS;
    }
}

class WeatherFlower {
    constructor() {
        // SPRING
        const SPRING_HEX_MAP = new Map([
            // Center
            ['0,0', new WeatherHex('Clear & Nippy', 0)],

            // 1st Ring
            ['0,1', new WeatherHex('Sleet', 0)],
            ['1,1', new WeatherHex('Hail', 1)],
            ['1,0', new WeatherHex('Cold Wafts of Mist', 0)],
            ['0,-1', new WeatherHex('Sunny & Clear', 0)],
            ['-1,-1', new WeatherHex('Cloudy & Warm', 0)],
            ['-1,0', new WeatherHex('Nippy & Humid', 0)],

            // 2nd Ring
            ['0,2', new WeatherHex('Heavy Rainfal', 1)],
            ['1,2', new WeatherHex('Snowy Rain', 1)],
            ['2,2', new WeatherHex('Windy & Snowy', 0)],
            ['2,1', new WeatherHex('Heavy Snowfalll', 1)],
            ['2,0', new WeatherHex('Light Snowfalll', 1)],
            ['1,-1', new WeatherHex('Cold & Dry', 0)],
            ['0,-2', new WeatherHex('Pleasantly Warm', 0)],
            ['-1,-2', new WeatherHex('Strong Polen Drift', 1)],
            ['-2,-2', new WeatherHex('Hot & Dry', 1)],
            ['-2,-1', new WeatherHex('Warm & Humid', 0)],
            ['-2,0', new WeatherHex('Warm Drizzle', 0)],
            ['-1,1', new WeatherHex('Short Showers', 0)],
        ]);
        const SPRING_EXCEPTIONS = new Map([
            ['0,2', ['NORTH']],
            ['2,2', ['NE']],
            ['2,1', ['NE']],
            ['-1,-1', ['SE']],
            ['0,-2', ['SOUTH']],
            ['-1,-2', ['SOUTH', 'SW']],
            ['-2,-2', ['SW']],
            ['-2,-1', ['NW']],

        ])
        const SPRING_START_LOCATIONS = new Map([
            [2, '2,2'],
            [3, '-1,1'],
            [4, '2,1'],
            [5, '0,0'],
            [6, '1,0'],
            [7, '2,0'],
            [8, '1,-1'],
            [9, '0,-1'],
            [10, '-1,-1'],
            [11, '-2,-1'],
            [12, '-1,0']
        ]);

        // SUMMER
        const SUMMER_HEX_MAP = new Map([
            // Center
            ['0,0', new WeatherHex('Pleasantly Warm', 0)],

            // 1st Ring
            ['0,1', new WeatherHex('Cloudy & Humid', 0)],
            ['1,1', new WeatherHex('Cloudy & Windy', 0)],
            ['1,0', new WeatherHex('Warm Breeze', 0)],
            ['0,-1', new WeatherHex('Hot & Dry', 1)],
            ['-1,-1', new WeatherHex('Warm & Cloudy', 0)],
            ['-1,0', new WeatherHex('Short Warm Showers', 0)],

            // 2nd Ring
            ['0,2', new WeatherHex('Torrential Rain', 2)],
            ['1,2', new WeatherHex('Warm Storm', 2)],
            ['2,2', new WeatherHex('Fierce Wind', 1)],
            ['2,1', new WeatherHex('Partly Cloudy & Nippy', 0)],
            ['2,0', new WeatherHex('Clear & Nippy', 0)],
            ['1,-1', new WeatherHex('Sunny & Clear', 0)],
            ['0,-2', new WeatherHex('Dry Heat Surges', 2)],
            ['-1,-2', new WeatherHex('Hot & Windy', 1)],
            ['-2,-2', new WeatherHex('Hot & Muggy', 1)],
            ['-2,-1', new WeatherHex('Warm Drizzle', 0)],
            ['-2,0', new WeatherHex('Warm Rain', 0)],
            ['-1,1', new WeatherHex('Downpour', 1)]
        ]);
        const SUMMER_EXCEPTIONS = new Map([
            ['0,2', ['NORTH']],
            ['1,2', ['NORTH']],
            ['2,2', ['NE']],
            ['1,-1', ['SOUTH']],
            ['0,-2', ['SOUTH']],
            ['-1,-2', ['SOUTH']],
            ['-2,-2', ['SW']],
            ['-1,1', ['NORTH']]
        ])
        const SUMMER_START_LOCATIONS = new Map([
            [2, '-1,0'],
            [3, '1,1'],
            [4, '2,1'],
            [5, '0,-1'],
            [6, '1,0'],
            [7, '1,-1'],
            [8, '2,0'],
            [9, '-1,-1'],
            [10, '0,-2'],
            [11, '-1,-2'],
            [12, '-2,-1']
        ]);
        
        // AUTUMN
        const AUTUMN_HEX_MAP = new Map([
            // Center
            ['0,0', new WeatherHex('Humid & Cloudy', 0)],

            // 1st Ring
            ['0,1', new WeatherHex('Sunny & Clear', 0)],
            ['1,1', new WeatherHex('Cold Wafts of Mist', 0)],
            ['1,0', new WeatherHex('Thick Fog Soup', 1)],
            ['0,-1', new WeatherHex('Rain & Fog', 1)],
            ['-1,-1', new WeatherHex('Rain & Gusts', 1)],
            ['-1,0', new WeatherHex('Sunny & Cloudy', 0)],

            // 2nd Ring
            ['0,2', new WeatherHex('Goose Summer', 0)],
            ['1,2', new WeatherHex('Sporadic Gusts', 1)],
            ['2,2', new WeatherHex('Cold Winds', 0)],
            ['2,1', new WeatherHex('Frosty & Cloudy', 0)],
            ['2,0', new WeatherHex('Cloudy & Nippy', 0)],
            ['1,-1', new WeatherHex('Windy & Clear', 0)],
            ['0,-2', new WeatherHex('Short, Light Showers', 1)],
            ['-1,-2', new WeatherHex('Heavy Downpour', 1)],
            ['-2,-2', new WeatherHex('Rainy Windstorm', 2)],
            ['-2,-1', new WeatherHex('Drizzle', 0)],
            ['-2,0', new WeatherHex('Sunny & Nippy', 0)],
            ['-1,1', new WeatherHex('Pleasantly Warm', 0)]
        ]);
        const AUTUMN_EXCEPTIONS = new Map([
            ['0,2', ['NW']],
            ['2,2', ['SE']],
            ['2,1', ['SE']],
            ['-1,-2', ['SOUTH']],
            ['-2,-2', ['SOUTH']],
            ['-2,0', ['NORTH']],
            ['-2,-1', ['NW', 'NORTH']]
        ]);
        const AUTUMN_START_LOCATIONS = new Map([
            [2, '-1,-2'],
            [3, '1,1'],
            [4, '1,0'],
            [5, '0,-5'],
            [6, '2,1'],
            [7, '2,0'],
            [8, '1,-1'],
            [9, '0,-2'],
            [10, '0,1'],
            [11, '-1,1'],
            [12, '0,2']
        ]);

        // WINTER
        const WINTER_HEX_MAP = new Map([
            // Center
            ['0,0', new WeatherHex('Cold & Humid', 0)],

            // 1st Ring
            ['0,1', new WeatherHex('Cold Fog Wafts', 0)],
            ['1,1', new WeatherHex('Cold Rain Showers', 1)],
            ['1,0', new WeatherHex('Cold & Cloudy', 0)],
            ['0,-1', new WeatherHex('Wet Snowfall', 1)],
            ['-1,-1', new WeatherHex('Snowy Rain', 1)],
            ['-1,0', new WeatherHex('Clear & Windy', 0)],

            // 2nd Ring
            ['0,2', new WeatherHex('Sunny & Nippy', 0)],
            ['1,2', new WeatherHex('Light Drizzle', 0)],
            ['2,2', new WeatherHex('Heavy Rain', 1)],
            ['2,1', new WeatherHex('Cold Winds', 0)],
            ['2,0', new WeatherHex('Icy & Cloudy', 0)],
            ['1,-1', new WeatherHex('Sleet', 0)],
            ['0,-2', new WeatherHex('Light Snowfall', 1)],
            ['-1,-2', new WeatherHex('Windy & Snowy', 1)],
            ['-2,-2', new WeatherHex('Blizzard', 2)],
            ['-2,-1', new WeatherHex('Hail', 1)],
            ['-2,0', new WeatherHex('Cold & Clear', 0)],
            ['-1,1', new WeatherHex('Cloudy & Nippy', 0)]
        ]);
        const WINTER_EXCEPTIONS = new Map([
            ['0,2', ['NORTH']],
            ['2,2', ['NE']],
            ['0,-2', ['SOUTH']],
            ['-1,-2', ['SOUTH']],
            ['-2,-2', ['SW']],
            ['-1,1', ['NORTH']]
        ])
        const WINTER_START_LOCATIONS = new Map([
            [2, '-2,-2'],
            [3, '-2,-1'],
            [4, '0,-2'],
            [5, '0,-1'],
            [6, '0,2'],
            [7, '-1,1'],
            [8, '-2,0'],
            [9, '-1,0'],
            [10, '0,1'],
            [11, '1,1'],
            [12, '2,1']
        ]);

        this.SPRING = new Season( SPRING_HEX_MAP, SPRING_EXCEPTIONS, SPRING_START_LOCATIONS, 'spring' );
        this.SUMMER = new Season( SUMMER_HEX_MAP, SUMMER_EXCEPTIONS, SUMMER_START_LOCATIONS, 'summer' );
        this.AUTUMN = new Season( AUTUMN_HEX_MAP, AUTUMN_EXCEPTIONS, AUTUMN_START_LOCATIONS, 'autumn' );
        this.WINTER = new Season( WINTER_HEX_MAP, WINTER_EXCEPTIONS, WINTER_START_LOCATIONS, 'winter' );
    }

    averageHazardOverDays( days ) {
        const SPRING_RESULTS = this.SPRING.generateForecast( days );
        const SUMMER_RESULTS = this.SUMMER.generateForecast( days );
        const AUTUMN_RESULTS = this.AUTUMN.generateForecast( days );
        const WINTER_RESULTS = this.WINTER.generateForecast( days );
   
        let sum = {
            spring: 0,
            summer: 0,
            autumn: 0,
            winter: 0
        }

        // TODO: This could probably go in one loop
        WINTER_RESULTS.results.forEach( day => {
            sum.winter += day.hazard_level;
        })
        SPRING_RESULTS.results.forEach( day => {
            sum.spring += day.hazard_level;
        })
        SUMMER_RESULTS.results.forEach( day => {
            sum.summer += day.hazard_level;
        })
        AUTUMN_RESULTS.results.forEach( day => {
            sum.autumn += day.hazard_level;
        })

        const AVERAGES = {
            spring: sum.spring/days,
            summer: sum.summer/days,
            autumn: sum.autumn/days,
            winter: sum.winter/days
        }

        return AVERAGES;
    }
}
//#endregion

/***************************
 * 
 * "ORCESTRATOR" FUNCTIONS
 * 
 ***************************/
//#region 

function runForSomeDays( season, start_coords, days ) {
    let i = 0
    let current_coords = start_coords
    let message = ''
    let result_array = [];

    while ( i < days ) {
        const CURRENT_DAY = i + 1;
        const ROLL = rollTwoDice();
        const CURRENT_WEATHER = season.hex_map.get( current_coords );
        const MESSAGE_ARRAY = [
            '',
            ' Inconvenient, but not dangerous.',
            ' Extreme weather warning! Highly dangerous!'
        ]

        // TODO: add a try loop here, sometimes get the following error
        // "TypeError: Cannot read properties of undefined (reading 'weather')"
        message += `\nDay ${CURRENT_DAY}, ${CURRENT_WEATHER.weather}.`;
        message += MESSAGE_ARRAY[ CURRENT_WEATHER.hazard_level ];

        // Push today's weather
        result_array.push( CURRENT_WEATHER );
        // Move to next location on Hexmap
        current_coords = moveHexes(ROLL, current_coords, season);
        i++;
    }

    return {
        printout: message + '\n',
        results: result_array
    };
}

function moveHexes(roll, coordinate_string, season) {
    // Direction per roll
    const DIR_PER_ROLL = new Map([
        [ 11, 'NORTH' ],
        [ 8, 'NE' ],
        [ 7, 'SE' ],
        [ 5, 'SOUTH' ],
        [ 6, 'SOUTH' ],
        [ 3, 'SW' ],
        [ 4, 'SW' ],
        [ 2, 'NW' ],
        [ 12, 'NW' ],
        [ 9, 'NO CHANGE' ],
        [ 10, 'NO CHANGE' ]
    ]);
    const HEX_MAP = season.hex_map;
    const EXCEPTIONS = season.exceptions;
    const DIRECTION = DIR_PER_ROLL.get( roll );

    let current_coordinates = stringToArray( coordinate_string );

    moveCoordinates( current_coordinates, DIRECTION, EXCEPTIONS );
    if ( ! onHexmapCheck( current_coordinates, HEX_MAP )) {
        wrapCoordsAroundMap( current_coordinates, DIRECTION, season );
    }

    return arrayToString( current_coordinates );
}

function moveCoordinates( coordinates, direction, exceptions ) {
    // COORD. STRING = Coordinate String
    const COORD_STRING = arrayToString( coordinates );

    if ( exceptions.has( COORD_STRING )) {
        if ( exceptions.get( COORD_STRING ).includes( direction )) {
            // Don't move if there's an exception to wrapping around the hex map
            return;
        }
    }

    // Move on hexmap appropriate direction
    if ( direction == 'NORTH' )  {
        coordinates[1]++;
    }
    else if ( direction == 'NE' ) {
        coordinates[0]++;
        coordinates[1]++;
    }
    else if ( direction == 'SE' ) {
        coordinates[0]++;
    }
    else if ( direction == 'SOUTH' ) {
        coordinates[1]--;
    }
    else if ( direction == 'SW' ) {
        coordinates[0]--;
        coordinates[1]--;
    }
    else if ( direction == 'NW' ) {
        coordinates[0]--;
    }
    else if (direction == 'NO CHANGE') {
        // Nothing happens
    }
    else {
        console.log('Some failure in moveCoordinates()');
    }
}

// Wrap Coordinates Around Map
function wrapCoordsAroundMap( coordinates, direction, season ) {
    const HEX_MAP = season.hex_map;
    const EXCEPTIONS = season.exceptions;
    
    // Else, we loop aruond the edge of the map
    // For NE and SW, inverse numbers, switch x & y
    // For N and S, invert y, check if it exists, if not, keep moving N or S respectively
    // For NW and SE, same idea as N and S except x instead of y
    // This only works if the map is symmetrical in every direction
    if ([ 'NORTH', 'SOUTH' ].includes( direction )) {
        coordinates[1] = -coordinates[1];
        while ( ! onHexmapCheck (coordinates, HEX_MAP )) {
            moveCoordinates( coordinates, direction, EXCEPTIONS );
        }
    }
    else if ([ 'SE', 'NW' ].includes( direction )) {
        coordinates[0] = -coordinates[0];
        while ( ! onHexmapCheck (coordinates, HEX_MAP )) {
            moveCoordinates( coordinates, direction, EXCEPTIONS );
        }
    }
    else if ([ 'SW', 'NE' ].includes( direction )) {
        coordinates[0] = -coordinates[0];
        coordinates[1] = -coordinates[1];

        let temp_x = coordinates[0];
        let temp_y = coordinates[1];

        coordinates[1] = temp_x;
        coordinates[0] = temp_y;
        while ( ! onHexmapCheck (coordinates, HEX_MAP )) {
            moveCoordinates( coordinates, direction, EXCEPTIONS );
        }
    }
    else {
        console.log('Theres some problem with the wrapCoordsAroundMap()')
    }
    return;
}

function generateForecastForSeason( options, season ) {
    const WEATHER_BOARD = new WeatherFlower();
    const DAYS_SIMULATING = options.days;
    const STARTING_COORDS = options.starting_location;

    if ( STARTING_COORDS == false ) {
        if ( season == 'spring' ) {
            return WEATHER_BOARD.SPRING.generateForecast( DAYS_SIMULATING );
        }
        else if ( season == 'summer' ) {
            return WEATHER_BOARD.SUMMER.generateForecast( DAYS_SIMULATING );
        }
        else if ( season == 'autumn' ) {
            return WEATHER_BOARD.AUTUMN.generateForecast( DAYS_SIMULATING );
        }
        else { //if ( season == 'winter' )
            return WEATHER_BOARD.WINTER.generateForecast( DAYS_SIMULATING );
        }
    }

    if ( season == 'spring' ) {
        return WEATHER_BOARD.SPRING.generateForecast( DAYS_SIMULATING, STARTING_COORDS );
    }
    else if ( season == 'summer' ) {
        return WEATHER_BOARD.SUMMER.generateForecast( DAYS_SIMULATING, STARTING_COORDS );
    }
    else if ( season == 'autumn' ) {
        return WEATHER_BOARD.AUTUMN.generateForecast( DAYS_SIMULATING, STARTING_COORDS );
    }
    else { //if ( season == 'winter' )
        return WEATHER_BOARD.WINTER.generateForecast( DAYS_SIMULATING, STARTING_COORDS );
    }
}
//#endregion

/***************************
 * 
 * Helper FUNCTIONS
 * 
 ***************************/
//#region 
function rollTwoDice() {
    let rolls = []; 
    
    rolls[0] = Math.floor(Math.random() * 6) + 1;
    rolls[1] = Math.floor(Math.random() * 6) + 1;

    return rolls[0] + rolls[1];
}

function arrayToString( array ) {
    let str = array[0].toString() + ',' + array[1].toString();
    return str;
}

function stringToArray( string ) {
    let str_array = string.split(',');
    let num_array = []

    str_array.forEach( num => {
        num_array.push( Number( num ));
    })
    
    return num_array;
}

function onHexmapCheck( coords, HEX_MAP ) {
    return HEX_MAP.has(arrayToString(coords));
}
//#endregion

/***************************
 * 
 * CLI Setup
 * 
 ***************************/
//#region 
const { program } = require('commander');

program
    .name( 'Weather-Flowers' )
    .description( 'Generate weather patterns for your RPGs' )
    .version( '0.1.0' );  

program.command( 'average' )
    .description('output average hazard level for given days')
    .option( '-d, --days <int>', 'output average hazard level over given days, default 5000', 5000 )
    .action( options => {
        const WEATHER_BOARD = new WeatherFlower();
        const DAYS_SIMULATING = options.days;

        console.log( `Averaging over ${DAYS_SIMULATING} days gives the following:` );
        console.log( WEATHER_BOARD.averageHazardOverDays( DAYS_SIMULATING ));
    });

program.command( 'generate' )
    .description( 'output a list of weather for given days' )
    .argument('<string>', 'season to generate weather for, allowed arguments are below\nspring, summer, autumn, or winter')
    .option( '-d, --days <int>', 'output weather patterns for number of days', 20 )
    .option( '-s, --starting_location <string>', 'output spring weather patterns starting at point on the hex map. Must be between \'-2,-2\' and \'2,2\'', false)
    .action(( season, options ) => {
        const SEASON_STR = season;
        // TODO: generate list of allowed season from season.name s within Season
        const ALLOWED_SEASONS = [
            'spring',
            'summer',
            'autumn',
            'winter'
        ];

        if ( ! ALLOWED_SEASONS.includes( SEASON_STR.toLowerCase() )) {
            console.log('That is not an acceptable season. Please use one of the options printed below.');
            console.log( ALLOWED_SEASONS );
            return;
        }

        const RESULTS = generateForecastForSeason( options, SEASON_STR );

        console.log( RESULTS.printout );
    })

program.parse();
//#endregion
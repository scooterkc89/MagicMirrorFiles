/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let today = new Date();
today.setHours(0,0,0,0);
const referenceDate = new Date('2026-01-05T00:00:00');
const dayOfWeekName = daysOfWeek[today.getDay()];
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const month = today.toLocaleString('default', {month: 'long'});
const msInDay = 24 * 60 * 60 * 1000;
const diffInTime = today.getTime() - referenceDate.getTime();
const diffInDays = Math.floor(diffInTime / msInDay);
const weeksPassed = Math.floor(diffInDays / 7);
const isRecyclingWeek = dayOfWeekName == 'Monday' && (weeksPassed % 2 === 0);


let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   // this variable is provided as a consistent location
			   // it is currently only used by 3rd party modules. no MagicMirror code uses this value
			   // as we have no usage, we  have no constraints on what this field holds
			   // see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial",
	zoom: 2.0,

	modules: [
		{
			module: "alert",
			classes: "fixed_page"
		},
		{
			module: "updatenotification",
			position: "top_bar",
			classes: "fixed_page"
		},
		{
			module: "MMM-pages",
			config: {
			    timings: {
				default: 3000,
				0: 65000,
				1: 35000,
				2: 50000
				
			    },
			    modules: [
				["page0"],           // class name for page 0
				["page1"],
				["page2"]          // class name for page 1
			    ],
			    fixed: ["fixed_page"]
			}
    		},
		{
			module: "clock",
			position: "top_left",
			classes: "page0"
		},
		{
			module: "calendar",
			header: "Family Schedule",
			position: "top_left",
			classes: "page0",
			config: {
				maximumEntries: 15,
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics"
					},
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/qkh7gfhcn2kjk2de3gjkbpjkts%40group.calendar.google.com/public/basic.ics"
					}
				]
			}
		}, 
		{
			module: "weather",
			position: "top_right",
			header: "Weather in Blue Springs",
			classes: "page0",
			config: {
				weatherProvider: "openmeteo",
				type: "current",
				lat: 39.0165,
				lon: -94.28161,
				unit: "imperial",
				showSun: false,
				appendLocationNameToHeader: false
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			classes: "page0",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",
				lat: 39.0170,
				lon: -94.2816,
				unit: "imperial",
				appendLocationNameToHeader: false
			}
		},
		{
  			module: "MMM-nest",
  			position: "top_right",
			classes: "page0 ",
  			config: {
    				issueToken: "https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response_type=token%20id_token&login_hint=AJDLj6LQu-SMCQLMJfOUep6S7tCeVnigKg04qmqkADFwRFIPCYXg-ZNAVph7fU8IUu6EAJqq1RtX2-J-V_6dNiUvcRqzSoTzfQ&client_id=733249279899-44tchle2kaa9afr5v9ov7jbuojfr9lrq.apps.googleusercontent.com&origin=https%3A%2F%2Fhome.nest.com&scope=openid%20profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fnest-account&ss_domain=https%3A%2F%2Fhome.nest.com&include_granted_scopes=true&auto=0&fedcm_enabled=true",
    				cookies: "NID=528=S4XUw0XF-Y6xqdpdajydN2LwfOsn1y4D3SoWFC-0B7uQQOiuVxeTlTtigyaJ4oZcdjp4M4Juvqtt14JlscAsO1ydZCcda-QZy5R2YphEq4JKwUlVq2uzJ7PZgCcRWhFD8d5nu-hj0is4YM07508q9C0W4lZIzl7VlmnRHP_98nBikRcPgV7fGyfJInVpfHhW1kokIZfDcR7AlQh_KWfzVSyNF4RBVfATGe74rMx1IBi4RIlhFfwO7xVPs6r33PdcD29sxOhT0NndJKFBFfayQF60Aejn8OWPvXNQqL6M1Ud73W0biyGPm8bCVHnwqpb-sntdTKKmsJQpb-p-RMkKFnmeZsXq1YH8SQ-LJOUFiPCFJ5L3KrCgTTbrAJchojpUmEWVNcmpUnzQjvMY83G_A0MdLyQVa4zE7Qzz_rEu2-Y0fJYrNqhrPSC_d1G7TFZePEYRMahtclBHOffDx-yP9fmxHJrWh12qasBD8IuwvAPGph0QEL8rpCIs4CUIoFZNwmQnZFdPvY_zl3MoWqNx3rEiyBU17piJVaXrnz_wRcMoxdiHn2nCvTiuhkT6wQbM8KmECVyuAbFwIYGOw9kq5-Sf_s7-7wKZONz0PjE6w4CdRaX8vJW5A87VEVpGIfny9DYG1T3d_p1D9z8e_2oeIz_w1sI8bmsEvLEfLQ; __Secure-3PSID=g.a0005wi_233MjPoAX1u5avhNp7N9BQs5YFpZwu_4a6XJxZQj0tlGBOsBwJmznYQqTBgeOR_LVwACgYKAfoSARUSFQHGX2MiZgRGd231Y4bkB8OCHa062xoVAUF8yKo4_AQN9tMiBHx4DBavrBBi0076; __Secure-3PAPISID=tBESPnvSFfmc2qtz/A-lk0_thqkQ-FVhra; __Host-3PLSID=s.youtube:g.a0005wi_26C3FVh8bJFUbFXE0w17cvg3e9bIs4OxTsXWVCNtLAH-mYC5V7nhBwJWr0cHcPXgywACgYKAYESARUSFQHGX2MiFiFZd4dbhbjpVcetaKO_dRoVAUF8yKqjWwREdS1SDn33fWt91Ckm0076; __Secure-3PSIDCC=AKEyXzWVvicaRUVhCAxdTDd2n5ad4EAQlGxW1XpMFFYMphuNHwhSD8GUQQ73GrJazZzDnSqq",
    				temperatureUnit: "F",
  			}
		},
		{
		  	module: "MMM-json",
		  	position: "bottom_center",
		  	header: "Lunch for Today",
			classes: "page0",
			config: {
				refreshInterval: 21600,
		    		url: "https://webapis.schoolcafe.com/api/CalendarView/GetDailyMenuitemsByGrade?SchoolId=0b734c92-d673-4e71-97ce-2533fa2f8be0&ServingDate=" + todayString + "&ServingLine=Regular&MealType=Lunch&Grade=04&PersonId=null",
				values: [
		      			{
						query: "$..MenuItemDescription"
		      			},
					{
						query: "$.ENTREES[1].MenuItemDescription"
		      			},
					{
						query: "$.ENTREES[2].MenuItemDescription"
		      			},
					{
						query: "$.ENTREES[3].MenuItemDescription"
		      			}
			    	],
				styleRules: [
				      	{
						match: (value) => value == null,
						style: "display:none"
				      	}
    				]  		
			}
		},
		{
		  	module: "MMM-json",
		  	position: "bottom_center",
		  	header: "Lunch for Tomorrow",
			classes: "page0",
			config: {
				refreshInterval: 21600,
		    		url: "https://webapis.schoolcafe.com/api/CalendarView/GetDailyMenuitemsByGrade?SchoolId=0b734c92-d673-4e71-97ce-2533fa2f8be0&ServingDate=" + tomorrowString + "&ServingLine=Regular&MealType=Lunch&Grade=04&PersonId=null",
				values: [
		      			{
						query: "$..MenuItemDescription"
		      			},
					{
						query: "$.ENTREES[1].MenuItemDescription"
		      			},
					{
						query: "$.ENTREES[2].MenuItemDescription"
		      			},
					{
						query: "$.ENTREES[3].MenuItemDescription"
		      			}
			    	],
				styleRules: [
				      	{
						match: (value) => value == null,
						style: "display:none"
				      	}
    				]  		
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_center",
		  	header: "Today's Tasks",
			classes: "json-numbered-list tasks page0",
			config: {
				refreshInterval: 21600,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/chores.json",
				jq: "thru(a => a." + dayOfWeekName + ")"
			}
		},
		{
      			module: "helloworld",
      			position: "top_center", // This can be any of the regions.
			classes: "page0 medium light bright",
			disabled: !isRecyclingDay,
      			config: {
 
        			text: "<i class='fa-solid fa-recycle fa-spin'></i> Today is a Recycling Day"
      			}
    		},
		
		{
    			module: 'MMM-WiFiPassword', 
    			position: "bottom_left",
			classes: "page0 ",
      			config: {
        			network: "Casey", 
        			password: "godfirst",
				layoutVertical: false,
				showAuthType: false,
				header: "Join WiFi"
      			}
		},
		{
            		module: "MMM-DailyPokemon",
            		position: "lower_third",
			classes: "page1",
		    	config: {
				minPoke: 1,
				maxPoke: 1025,
				grayscale: true,
				showType: true,
				language: "en",
				genera: true,
				gbaMode: true,
				nameSize: 32,
				stats: true,
				flavorText: true
		    	}
        	},
		{
    			module: 'MMM-PokemonGOEvents',
    			position: 'top_right',
    			header: "Pokemon GO Events",
			classes: "page1",
    			config: {
        			category: "current",
        			theme: "default",
        			updateInterval: 500000,
        			maxEvents: 4,
        			truncateTitle: 0,
        			exactTimestamp: false,
        			eventWhitelist: [],
        			eventBlacklist: ["ticketed-event", "pokemon-spotlight-hour", "raid-day", "raid-battles", "raid-hour", "raid-weekend", "go-battle-league"],
        			specificEventBlacklist: [],
        			eventIcon: "fa-solid fa-ticket"
    			}
		},
		{
    			module: 'MMM-PokemonGOEvents',
    			position: 'top_right',
    			header: "Upcoming Events",
			classes: "page1",
    			config: {
        			category: "upcoming",
        			theme: "default",
        			updateInterval: 500000,
        			maxEvents: 3,
        			truncateTitle: 0,
        			exactTimestamp: false,
        			eventWhitelist: [],
        			eventBlacklist: ["ticketed-event", "pokemon-spotlight-hour", "raid-day", "raid-battles", "raid-hour", "raid-weekend", "go-battle-league"],
        			specificEventBlacklist: [],
        			eventIcon: "fa-solid fa-ticket"
    			}
		},
		
		{
      			module: "helloworld", 
      			position: "top_left", // This can be any of the regions.
			classes: "page1 large light bright",
      			config: {
 
        			text: "Our Goals"
      			}
    		},
		{
		  	module: "MMM-json",
		  	position: "top_left",
		  	header: "This Week",
			classes: "tasks json-numbered-list page1",
			config: {
				refreshInterval: 216000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/goals.json",
				jq: "thru(a => a.this_week)"
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_left",
		  	header: "This Month",
			classes: "tasks json-numbered-list page1",
			config: {
				refreshInterval: 216000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/goals.json",
				jq: "thru(a => a.this_month)"
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_left",
		  	header: "Big Goals",
			classes: "tasks json-numbered-list page1",
			config: {
				refreshInterval: 216000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/goals.json",
				jq: "thru(a => a.big_goals)"
			}
		},
{
      			module: "helloworld",
      			position: "top_bar", // This can be any of the regions.
			classes: "page2 xlarge light bright",
      			config: {
 
        			text: "Monthly Character Spotlight: " + month
      			}
    		},
		{
		  	module: "MMM-json", 
		  	position: "top_bar", 
			classes: "character-spotlight-virtue page2", 
			config: {
				refreshInterval: 2160000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a." + month + ")",
				values: [
		      			{
						query: ["$.virtue", "$.icon"]
		      			},
			    	],
			}
		},
		{
		  	module: "MMM-json", 
		  	position: "top_bar", 
			classes: "character-spotlight-virtue-def page2", 
			config: {
				refreshInterval: 2160000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a." + month + ")",
				values: [
					{
						query: "$.definition"
		      			}
			    	],
			}
		},
		{
		  	module: "MMM-json", 
		  	position: "top_left", 
			classes: "character-spotlight-examples json-numbered-list page2", 
			header: "Examples",
			config: {
				refreshInterval: 2160000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a." + month + ".examples)"
				
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_left", 
			classes: "character-spotlight-quotes json-numbered-list page2", 
			config: {
				refreshInterval: 2160000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a." + month + ".quotes)",
				values: [
		      			{
						query: ["$[0].quote", "$[0].author"],
						prefix:['"',"-"],
						suffix:['"',""]
		      			},
					{
						query: ["$[1].quote", "$[1].author"],
						prefix:['"',"-"],
						suffix:['"',""]
		      			},
					{
						query: ["$[2].quote", "$[2].author"],
						prefix:['"',"-"],
						suffix:['"',""]
		      			},
			    	],
				
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_right", 
			classes: "character-spotlight-examples json-numbered-list page2", 
			header: "Thoughtful Questions",
			config: {
				refreshInterval: 2160000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a." + month + ".questions)"
				
			}
		},
		{
		  	module: "MMM-json",
		  	position: "bottom_bar",
			classes: "character-spotlight-challenge json-numbered-list page2", 
			config: {
				refreshInterval: 2160000,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a." + month + ")",
				values: [
		      			{
						query: "$.challenge",
						prefix: "MONTHLY CHALLENGE: "
		      			}
				]
			}
		},
 
		
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }

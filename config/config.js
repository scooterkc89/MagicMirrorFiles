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
const today = new Date();
const dayOfWeekName = daysOfWeek[today.getDay()];
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowString = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();
const todayString = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

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
				default: 2000,
				2: 200000
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
    				cookies: "NID=528=cZsYI7O9p5MMYS9J_S0i-aNke-OyW93ZErEvaUEXpFi1n1ZxCIQby0M1RQJ3Rf3ECQFRzQyjZRI_utJBK8gg5tDDz0vH0-jDIqmlKst51I3qvlDMWNOCmoqRi0yh3druPnc8qn9AseOdIM-Zw7tAbkQ0KuMdex-5A6N9egdKInzCCo8f-JzrV-xPhXbCOaKYqKDE7m4SqMNRjr7rahnnk9jKsMCUOWd6IE23D1WuZo6ILajI6oDJ88VKA5E_o3xke0yHwaNQHDUvniwsWb3v1ojfOsweQt9QjWfXvF2PiNZyndpvooKhkCd-DfofnO8POzstwRqGgYHQKasR5aLnMa58l89YK6CdCi-mFBYyOAx7A43yhcvl_ADQ2xvxERFdNcTg2zN-4w8FkmqYrDpqupdM2UG4l7Ao4S8Za6wWKONFFuQfBigy1i0Z66A9re4cT2Oj0EME2ZYFikp3Ltteu7dZeLk8jJ0Zcy8IY4rQC5WtmT7zR0IHz1FOzGPw9opXNgX8SM1MSEgGxMufDiy5YTFb5QR10FV3AqjazicZXM9Lm8ewAWBQy3ivoXiVY26XFq5FyBR_1fDZxm7NRYrMrVYODHF0YJdPZ0_MjdyZCh65jptI0gXJCAILWUSDzS5ueyhlqBKH0TmPQNe2YsecuBjoegCcSx3ocYJrlg; __Secure-3PSID=g.a0005gi_23KKiOs-xHlbNmbQacnw3YT9cuQuVkLw5tEi59LrKg_x5HBlhXVshh2rXC7AhX0y7AACgYKAfcSARUSFQHGX2Mi8nIvVSAim1frGq-4ftsd7BoVAUF8yKpVQKBO3Whe6MaD1N3XzRg-0076; __Secure-3PAPISID=d0XW7GjTDzCjehOF/As-x49dil_HucoXrx; __Host-3PLSID=s.youtube:g.a0005gi_2-3hC9okGCSXDkBWCVvfx4gTgAfhPjVO7Ii0bkvNUfi8Lo8LB_TtiZr5z5-k657TqwACgYKAScSARUSFQHGX2MiqENMa_Fj7KZ9RHzBGl8OnxoVAUF8yKoBDMeqpL6uklj_qR6Aq4Uz0076; __Secure-3PSIDCC=AKEyXzWL0V-Hr_0kgRSRWv59EkZLAhp2rS_Hb_G5bszQopKDS6LhI8fswXhrCiHmttig98zd",
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
			classes: "familyTasks page0",
			config: {
				refreshInterval: 21600,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/chores.json",
				jq: "thru(a => a." + dayOfWeekName + ")"
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
            		position: "middle_center",
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
			classes: "familyTasks page1",
			config: {
				refreshInterval: 21600,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/goals.json",
				jq: "thru(a => a.this_week)"
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_left",
		  	header: "This Month",
			classes: "familyTasks page1",
			config: {
				refreshInterval: 21600,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/goals.json",
				jq: "thru(a => a.this_month)"
			}
		},
		{
		  	module: "MMM-json",
		  	position: "top_left",
		  	header: "Big Goals",
			classes: "familyTasks page1",
			config: {
				refreshInterval: 21600,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/goals.json",
				jq: "thru(a => a.big_goals)"
			}
		},
{
      			module: "helloworld",
      			position: "top_center", // This can be any of the regions.
			classes: "page2 large light bright",
      			config: {
 
        			text: "Monthly Character Spotlight"
      			}
    		},
		{
		  	module: "MMM-json",
		  	position: "top_center",
			classes: "character-spotlight-virtue page2",
			config: {
				refreshInterval: 21600,
		    		url: "https://raw.githubusercontent.com/scooterkc89/MagicMirrorFiles/refs/heads/main/character.json",
				jq: "thru(a => a.January)",
				values: [
		      			{
						query: "$.virtue"
		      			},
					{
						query: "$.definition"
		      			}
			    	],
			}
		},
 
		
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }

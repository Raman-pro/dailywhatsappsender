require('dotenv').config();

const cron = require('node-cron');
let days = {monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4, saturday: 5, sunday: 6};
const puppeteer = require('puppeteer');
// const keepAlive=require('./server')

// schoolMeetingIds
const schoolMeetingIds = {
    english: 'english class,{}' +
        'ID – 475 335 1210{}' +
        'PASSCODE - 201118',
    hindi: ' Hindi class,{}' +
        'ID – 5411466503{}' +
        'PASSCODE – 123246',
    punjabi: ' Punjabi class,{}' +
        'ID – 4564550231{}' +
        'PASSCODE – PUNJABI',
    maths: ' Maths class,{}' +
        'ID – 858 343 9128{}' +
        'PASSCODE – maths',
    physics: ' Physics class,{}' +
        'ID – 9263618790{}' +
        'PASSCODE - physics123',
    chemistry: ' Chemistry class,{}' +
        'ID – 4847420575{}' +
        'PASSCODE – rs2910',
    biology: ' biology class,{}' +
        'ID – 7920963109{}' +
        'PASSCODE - SCIENCE',
    history: ' history class,{}' +
        'ID – 3103129173{}' +
        'PASSCODE – 202122',
    economics: ' economics class,{}' +
        'ID – 868 020 0459{}' +
        'PASSCODE – 987211',
    dp: ' Democratic politics class,{}' +
        'ID – 368 955 5106{}' +
        'PASSCODE - 101010',
    geography: ' geography class,{}' +
        'ID – 251 895 4130{}' +
        'PASSCODE – 2020',
    computer: ' computer class,{}' +
        'ID – 893 009 5114{}' +
        'PASSCODE – 54321',
    games: ' games class,{}' +
        'JYOTI SHARMA id:{}' +
        'ID – 994 594 4304{}' +
        'PASSCODE – 12345{}' +
        'JASPAL SINGH id:{}' +
        'ID – 3352244903{}' +
        'PASSCODE – 123123{}' +
        'ARUN KUMAR id:{}' +
        'ID – 806 741 6412{}' +
        'PASSCODE – 12345',
    fun: 'good night bro',
    prayer: 'prayer class{}' +
        'ID – 475 335 1210{}' +
        'PASSCODE - 201118'

};

// timetable
const timetable = [
    {
        day: 'monday',
        periods: {
            810: {
                period: 'maths'
            },
            900: {
                period: 'economics',
            },
            1010: {
                period: 'computer'
            },
            1012: {
                period: 'games'
            },
            1100: {
                period: 'history'
            },
            1150: {
                period: 'dp'
            },
        }
    },
    {
        day: 'tuesday',
        periods: {
            810: {
                period: 'physics'
            },
            900: {
                period: 'geography',
            },
            1010: {
                period: 'computer'
            },
            1011: {
                period: 'games'
            },
            1100: {
                period: 'maths'
            },
            1150: {
                period: 'biology'
            },
        }
    },
    {
        day: 'wednesday',
        periods: {
            // 809:{
            //     period:'fun'
            // },
            810: {
                period: 'maths'
            },
            900: {
                period: 'english',
            },
            1010: {
                period: 'geography'
            },
            1100: {
                period: 'punjabi'
            },
            1150: {
                period: 'history'
            },
        }
    },
    {
        day: 'thursday',
        periods: {
            810: {
                period: 'maths'
            },
            900: {
                period: 'english',
            },
            1010: {
                period: 'chemistry'
            },
            1100: {
                period: 'hindi'
            },
            1101: {
                period: 'games'
            },
            1150: {
                period: 'physics'
            },
        }
    },
    {
        day: 'friday',
        periods: {
            810: {
                period: 'maths',
            },
            900: {
                period: 'hindi'
            },
            901: {
                period: 'games'
            },
            1010: {
                period: 'punjabi'
            },
            1100: {
                period: 'chemistry'
            },
            1150: {
                period: 'dp'
            },
        }
    },
    {
        day: 'saturday',
        periods: {
            810: {
                period: 'economics'
            },
            900: {
                period: 'biology',
            },
            1010: {
                period: 'hindi'
            },
            1011: {
                period: 'games'
            },
            1100: {
                period: 'punjabi'
            },
            1150: {
                period: 'english'
            },
        }
    },
]

scrape("https://web.whatsapp.com");





//
//
// All below are function
//
// ;-)
//
//







// the main sender function
async function scrape(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("span[title='Raman']");
    const target = await page.$("span[title='Raman']");
    await target.click();
    const inp = await page.$('#main > footer > div.vR1LG._3wXwX.copyable-area > div._2A8P4 > div > div._2_1wd.copyable-text.selectable-text');
    await inp.click();

    timetable.forEach((tt, index) => {
        let day = tt.day;
        let listOfTimeInInt = Object.keys(tt.periods);
        let todayDate = convertTZ(Date(), "Asia/Kolkata");
        listOfTimeInInt.forEach(timeInInt => {
            cron.schedule(convertTimeOfIntToTimeOfString(timeInInt, day), async () => {
                console.log(tt.periods[timeInInt].period);
                let stringIdPassList;
                try {
                    // for typing yours
                    await inp.type("yours,")
                    // for next line
                    await page.keyboard.down('Shift');
                    await page.keyboard.press("Enter");
                    await page.keyboard.up('Shift');

                    // for id pass
                    stringIdPassList = schoolMeetingIds[tt.periods[timeInInt].period].split('{}')
                    console.log(stringIdPassList)
                    for (let message of stringIdPassList) {
                        await inp.type(message)
                        await page.keyboard.down('Shift');
                        await page.keyboard.press("Enter");
                        await page.keyboard.up('Shift');
                    }

                    let message = `your ${schoolMeetingIds[tt.periods[timeInInt].period]} at ${getTimeString()} thanks, Raman`;
                    await inp.type(`at ${getTimeString()}`);
                    await page.keyboard.down('Shift');
                    await page.keyboard.press("Enter");
                    await page.keyboard.up('Shift');

                    await inp.type(`thanks, Raman`);
                    await page.keyboard.down('Shift');
                    await page.keyboard.press("Enter");
                    await page.keyboard.up('Shift');

                    // sends message
                    await page.keyboard.press("Enter");

                } catch (e) {
                    console.log(e)
                }
            }, {"timezone": "Asia/Kolkata"})
        })
    })
}

// this function at what time the message should be sent

function convertTimeOfIntToTimeOfString(number, day) {
    let numberS = number.toString();
    if (numberS.length === 3) {
        return `10 ${numberS[1]}${numberS[2]} ${numberS[0]} * * ${day}`
    } else {
        return `10 ${numberS[2]}${numberS[3]} ${numberS[0]}${numberS[1]} * * ${day}`
    }
}

// it makes my time forward to 20 minutes

function getTimeString(time) {

    let date = new Date();
    // console.log(date)
    let dateMillis = date.getTime();

//JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
    var timePeriod = "00:20:00"; //I assume this is 20 minutes, so the format is HH:MM:SS

    var parts = timePeriod.split(/:/);
    var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
        (parseInt(parts[1], 10) * 60 * 1000) +
        (parseInt(parts[2], 10) * 1000);

    var newDate = new Date();
    newDate.setTime(dateMillis + timePeriodMillis);
    return `${convertTZ(newDate, "Asia/Kolkata").getHours()}:${convertTZ(newDate, "Asia/Kolkata").getMinutes()}`; //eg: Fri Apr 26 2013 09:07:50 GMT-0700 (MST)
}

// getTimeString(950)
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}

// don't touch

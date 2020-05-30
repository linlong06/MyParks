var mongoose = require("mongoose");
var Park = require("./models/park");
var Comment = require("./models/comment");

var seedParks = [
    {
        name: "Yellowstone National Park", 
        image: "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/01/08ET/top-10-wonders-west-yellowstone-national-park.jpg.rend.hgtvcom.616.462.suffix/1491581132559.jpeg",
        description: "Yellowstone National Park is a nearly 3,500-sq.-mile wilderness recreation area atop a volcanic hot spot. Mostly in Wyoming, the park spreads into parts of Montana and Idaho too. Yellowstone features dramatic canyons, alpine rivers, lush forests, hot springs and gushing geysers, including its most famous, Old Faithful. It's also home to hundreds of animal species, including bears, wolves, bison, elk and antelope.",
        website: "https://www.nps.gov/yell/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    },
    {
        name: "Yosemite National Park", 
        image: "https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU3ODc4NjAwMjkxNzIyNTY5/yosemite-3.jpg",
        description: "Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome. In Yosemite Village are shops, restaurants, lodging, the Yosemite Museum and the Ansel Adams Gallery, with prints of the photographer’s renowned black-and-white landscapes of the area.",
        website: "https://www.nps.gov/yose/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    },
    {
        name: "Grand Canyon National Park", 
        image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg",
        description: "Grand Canyon National Park, in Arizona, is home to much of the immense Grand Canyon, with its layered bands of red rock revealing millions of years of geological history. Viewpoints include Mather Point, Yavapai Observation Station and architect Mary Colter’s Lookout Studio and her Desert View Watchtower. Lipan Point, with wide views of the canyon and Colorado River, is a popular, especially at sunrise and sunset.",
        website: "https://www.nps.gov/grca/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    }, 
    {
        name: "Grand Teton National Park", 
        image: "https://www.nationalgeographic.com/content/dam/expeditions/destinations/north-america/land/Yellowstone-and-Grand-Teton-National-Park/yellowstone-grand-teton-np.adapt.470.1.jpg",
        description: "Grand Teton National Park is in the northwest of the U.S state of Wyoming. It encompasses the Teton mountain range, the 4,000-meter Grand Teton peak, and the valley known as Jackson Hole. It’s a popular destination in summer for mountaineering, hiking, backcountry camping and fishing, linked to nearby Yellowstone National Park by the John D. Rockefeller, Jr. Memorial Parkway.",
        website: "https://www.nps.gov/grte/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    },
    {
        name: "Glacier National Park", 
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=1067&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F01%2Fglacier-national-park-GLACIERSIGNS0120.jpg",
        description: "Glacier National Park is a 1,583-sq.-mi. wilderness area in Montana's Rocky Mountains, with glacier-carved peaks and valleys running to the Canadian border. It's crossed by the mountainous Going-to-the-Sun Road. Among more than 700 miles of hiking trails, it has a route to photogenic Hidden Lake. Other activities include backpacking, cycling and camping. Diverse wildlife ranges from mountain goats to grizzly bears.",
        website: "https://www.nps.gov/glac/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    },
    {
        name: "Bryce Canyon National Park", 
        image: "https://media.deseretdigital.com/file/fdd8867843?type=jpeg&quality=55&c=15&a=4379240d",
        description: "Bryce Canyon National Park, a sprawling reserve in southern Utah, is known for crimson-colored hoodoos, which are spire-shaped rock formations. The park’s main road leads past the expansive Bryce Amphitheater, a hoodoo-filled depression lying below the Rim Trail hiking path. It has overlooks at Sunrise Point, Sunset Point, Inspiration Point and Bryce Point. Prime viewing times are around sunup and sundown.",
        website: "https://www.nps.gov/brca/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    },
    {
        name: "Zion National Park", 
        image: "https://www.outsideonline.com/sites/default/files/styles/full-page/public/2019/12/11/zion-national-park_h.jpg?itok=ijAR7GYT",
        description: "Zion National Park is a southwest Utah nature preserve distinguished by Zion Canyon’s steep red cliffs. Zion Canyon Scenic Drive cuts through its main section, leading to forest trails along the Virgin River. The river flows to the Emerald Pools, which have waterfalls and a hanging garden. Also along the river, partly through deep chasms, is Zion Narrows wading hike.",
        website: "https://www.nps.gov/zion/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    },
    {
        name: "Death Valley National Park", 
        image: "https://www.nationalparks.org/sites/default/files/death-valley-istock.jpg",
        description: "Death Valley National Park straddles eastern California and Nevada. It’s known for Titus Canyon, with a ghost town and colorful rocks, and Badwater Basin’s salt flats, North America's lowest point. Above, Telescope Peak Trail weaves past pine trees. North of the spiky salt mounds known as the Devil’s Golf Course, rattlesnakes live in Mesquite Flat Sand Dunes.",
        website: "https://www.nps.gov/deva/index.htm",
        author: {
            id : "588c2e092403d111454fff71",
            username: "admin"
        }
    }        
    ];

var seedComment = {
    text: "This is a fantastic national park!",
    author: {
        id : "588c2e092403d111454fff71",
        username: "admin"        
    }
};

function seedDB() {
    Park.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all parks!");
            Comment.deleteMany({}, function(err){
               if (err) {
                   console.log(err);
               } 
                 seedParks.forEach(function(seed){
                    Park.create(seed, function(err, park){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Created a new park");
                            Comment.create(seedComment, function(err, comment){
                                if (err) {
                                    console.log(err);
                                } else {
                                    park.comments.push(comment);
                                    park.save();
                                }
                            });
                        }
                    });
                });              
            });
        }
    });
}

module.exports = seedDB;
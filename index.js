// 		if (url.pathname.startsWith('/video')) {
//
const axios = require("axios");

const express = require("express");
const cheerio = require("cheerio");
const app = express();
const port = 3000; // Change this to the desired port

const domains = "https://xhwide4.com/";

app.get("/", async (req, response) => {
  console.log(req.query.debugMode);
  fetchDatas(
    response,
    "https://bdix.meheraj.me/?https://xhwide4.com",
    req.query.debugMode
  );
});
app.get("/search/:searchid", async (req, response) => {
  let totalid;
  if (req.query.page) {
    totalid = req.params.searchid + "?page=" + req.query.page;
  } else {
    totalid = req.params.searchid;
  }
  fsearchdatas(
    response,
    "https://bdix.meheraj.me/?https://xhwide4.com/search/" + totalid,
    req.query.page ? req.query.page : 1
  );
});

//Debug Mode
app.get("/video/d/*", async (req, response) => {
  console.log("https://xhwide4.com/videos/" + req.params[0]);
  let res = await axios.get("https://xhwide4.com/videos/" + req.params[0]);
  let data = await res.data;

  const $ = cheerio.load(data);
  let v = await $("#initials-script").contents().first().text();
  let datas = v.replace("window.initials=", '{"aa":').replace("}};", "}}}");
  let datasTwo = await JSON.parse(datas);
  response.json(datasTwo);
});

app.get("/video/*", async (req, response) => {
  console.log("https://xhwide4.com/videos/" + req.params[0]);
  let res = await axios.get("https://xhwide4.com/videos/" + req.params[0]);
  let data = await res.data;

  const $ = cheerio.load(data);
  let v = await $("#initials-script").contents().first().text();
  let datas = v.replace("window.initials=", '{"aa":').replace("}};", "}}}");
  let datasTwo = await JSON.parse(datas);
  let d = `<div class="yt-card" id="yt1">
			<div class="thumb">
		     <div class="ccontainer">
        <video controls  playsinline poster="${
          datasTwo.aa.videoEntity.thumbs["1"]
        }" id="player">
        <source type="video/mp4" src="${
          datasTwo.aa.xplayerSettings.sources.standard["h264"][0].url
        }">
          <!-- Caption files -->
  <track
      kind="captions"
      label="English"
      srclang="en"
      src="https://code-reserve.web.app/captions/BangladeshWinsU19WorldCupforFirstTime_en.vtt"
       default/>
  <track
      kind="captions"
      label="Bangla"
      srclang="bn"
      src="https://code-reserve.web.app/captions/BangladeshWinsU19WorldCupforFirstTime_bn.vtt"
  />
      </video>
    </div>
			</div>
			<div class="details">
				<div class="channel">
					<a href="" ">
						<img src="${datasTwo.aa.videoSponsor?.channelLogoUrl ?? ""}" />
					</a>
				</div>
				<div class="info">
					<div class="title"><a href="" ">${datasTwo.aa.videoEntity?.title ?? ""}</a>
					</div>
					<div class="channel-name">${
            datasTwo.aa.videoSponsor?.title ?? ""
          }<a href="" "></a></div>
					<div class="views">
		        <span id="views">${datasTwo.aa.videoModel?.views ?? ""}</span> ·
		        <span>${datasTwo.aa.videoEntity?.dateAgo ?? ""}</span>
		        </div>
				</div>
			</div>
		</div>`;
  let oneeight = "1080p";
  let videoPlayer = `
  			${Homecss("Title")}
    <meta charset="UTF-8">
    <meta name="referrer" content="origin" />
    <title>M3U8 Player upto 4K</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://code-reserve.web.app/2.0.1/player.css">
      <script src="https://code-reserve.web.app/2.0.1/hls.js" defer></script>
    <script src="https://code-reserve.web.app/2.0.1/player.js" defer></script>
    <style>
    
    #yt1{
      width:100%!important;
    }
    
    .yt-card{
      width: 150px;
    }
    #c1{
       grid-template-columns: repeat(2, 1fr); /* Create 4 equal columns */
       gap: 20px;
    }
    </style>
  </head>
  <body>
   ${retHeader()}

    <div class="container" id="c1">
     ${d}
     <div class="container">
      ${returnVdoList(
        datasTwo.aa.relatedVideosComponent.videoTabInitialData.videoListProps
          .videoThumbProps
      )}</div>
    </div>
    <script>    document.addEventListener("DOMContentLoaded", () => {
        const video = document.querySelector("video");
        const source = video.getElementsByTagName("source")[0].src;
        const defaultOptions = {};
        let hls;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(source);
          hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            const availableQualities = hls.levels.map((l) => l.height);
            defaultOptions.quality = {
              default: availableQualities[0],
              options: availableQualities,
              forced: true,
              onChange: (e) => updateQuality(e),
            };
            initializePlyr(video, defaultOptions, hls);
          });
          hls.attachMedia(video);
          window.hls = hls;
        } else {
          initializePlyr(video, defaultOptions);
        }
        function initializePlyr(video, options, hls) {
          const player = new Plyr(video, options);
          player.on("languagechange", () => {
            setTimeout(() => {
              if (hls) {
                hls.subtitleTrack = player.currentTrack;
              }
            }, 50);
          });
        }
        function updateQuality(newQuality) {
          window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log("Found quality match with " + newQuality);
              window.hls.currentLevel = levelIndex;
            }
          });
        }
      });</script>
  </body>
  </html>`;
  response.send(videoPlayer);
});
app.get("/u/:userID", async (req, response) => {
  let pid = req.query.page ?? 1;
  let res = await axios.get(
    "https://xhwide4.com/creators/" + req.params.userID + "/newest/" + pid
  );
  let data = await res.data;

  const $ = cheerio.load(data);
  let v = await $("#initials-script").contents().first().text();
  let datas = v.replace("window.initials=", '{"aa":').replace("}};", "}}}");
  let datasTwo = await JSON.parse(datas);

  let homePage = `
  ${Homecss("DVO")}
  </head>
<body>

${retHeader("")}

<span class="main_title">Geo</span>

<div class="container">
		`;
  let homepagetwo;
  homePage += returnVdoList(
    datasTwo.aa.trendingVideoSectionComponent.videoListProps.videoThumbProps
  );

  let lastItem = `</div>
  <style>
   .dd{
      justify-items: center; /* Center grid items horizontally */
  align-items: center;   /* Center grid items vertically */ 
      width:100%;
 display: grid;
  grid-template-columns: repeat(2, 1fr); /* Create 4 equal columns */
  gap: 20px; /* Adjust the gap between grid items */
    }</style>
   <div class="dd"> <a class="button" href="/search/${
     req.params.userID
   }/?page=${parseInt(pid) == 1 ? 1 : parseInt(pid) - 1}">Previous</a>
    <a class="button" href="/u/${req.params.userID}/?page=${
    parseInt(pid) + 1
  }">Next</a></div>
  </body></html>`;

  response.send(homePage + homepagetwo + lastItem);
});
app.get("*", (req, response) => {
  let h = `
  ${Homecss("404 - Error")}

  </head>
  </body>
  ${retHeader("404-Sorry")}
  <span class="main_title">Sorry Something went wrong...</span>
  </body>
  </html>
`;

  response.send(h);
});
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

////
async function fetchDatas(response, urls, debugMode) {
  let res = await axios.get(urls);
  let data = await res.data;

  const $ = cheerio.load(data);
  let v = await $("#initials-script").contents().first().text();

  let datas = v.replace("window.initials=", '{"aa":').replace("}};", "}}}");
  let datasTwo = await JSON.parse(datas);
  if (debugMode == "true" || debugMode == true) {
    console.log(debugMode);
    response.json(datasTwo);
  }
  let homePage = `
  ${Homecss("DVO")}
  </head>
<body>

${retHeader("")}

<span class="main_title">Geo</span>

<div class="container">
		`;
  let homepagetwo;
  homePage += returnVdoList(
    datasTwo.aa.indexPageComponent.videoLists.geo.videoThumbProps
  );
  homepagetwo = `</div></div> <span class="main_title">Trending</span><div class="container"> `;
  homepagetwo += returnVdoList(
    datasTwo.aa.indexPageComponent.videoLists.trending.videoThumbProps
  );
  homepagetwo += `</div><span class="main_title">Newest</span> <div class="container">`;
  homepagetwo += returnVdoList(
    datasTwo.aa.indexPageComponent.videoLists.newest.videoThumbProps
  );
  let lastItem = `</div></body></html>`;
  response.send(homePage + homepagetwo + lastItem);
}
async function fsearchdatas(response, urls, page) {
  let res = await axios.get(urls);
  let data = await res.data;

  const $ = cheerio.load(data);
  let v = await $("#initials-script").contents().first().text();

  let datas = v.replace("window.initials=", '{"aa":').replace("}};", "}}}");
  let datasTwo = await JSON.parse(datas);

  //response.json(datasTwo);

  let homePage = `
    ${Homecss(datasTwo.aa.entity.queryOrig)}
    	</head>
      <body>
      ${retHeader(datasTwo.aa.entity.queryOrig)}
      <span class="main_title">Searched : ${
        datasTwo.aa.entity.queryOrig
      }</span><div class="container">
  	`;

  let homepagetwo;

  homePage += returnVdoList(datasTwo.aa.searchResult.videoThumbProps);
  let lastItem = `</div>
  <style>
   .dd{
      justify-items: center; /* Center grid items horizontally */
  align-items: center;   /* Center grid items vertically */ 
      width:100%;
 display: grid;
  grid-template-columns: repeat(2, 1fr); /* Create 4 equal columns */
  gap: 20px; /* Adjust the gap between grid items */
    }</style>
   <div class="dd"> <a class="button" href="/search/${
     datasTwo.aa.entity.queryOrig
   }?page=${parseInt(page) == 1 ? 1 : parseInt(page) - 1}">Previous</a>
    <a class="button" href="/search/${datasTwo.aa.entity.queryOrig}?page=${
    parseInt(page) + 1
  }">Next</a></div>
  </body></html>`;
  response.send(homePage + lastItem);
  //response.json(datasTwo.aa.indexPageComponent.videoLists);
}

//Loop For Video
function returnVdoList(dx) {
  let d = dx;
  let homePage = "";
  for (var j = 0; j < d.length; j++) {
    let l = d[j].landing?.logo ?? " ";
    let n = d[j].landing?.name ?? " ";
    let urlss = d[j].landing?.link?.split("/")[4];
    homePage += `<div class="yt-card">
			<div class="thumb">
		    <a href="/video/${d[j].pageURL.split("/videos/")[1]}" ">
				<img src="${d[j].thumbURL}"
		         /> </a>
			</div>
			<div class="details">
				<div class="channel">
					<a href="" ">
						<img src="${l}" />
					</a>
				</div>
				<div class="info">
					<div class="title"><a href="/video/${d[j].pageURL.split("/videos/")[1]}" ">${
      d[j].title
    }</a>
					</div>
					<div class="channel-name"><a href="/u/${urlss}">${n}</a></div>
					<div class="views">
		        <span id="views">${d[j].views}</span> ·
		        <span>8 month ago</span>
		        </div>
				</div>
			</div>
		</div>
    `;
  }

  return homePage;
}

//Html With Css

function Homecss(title) {
  let v = `
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
		<style>
    *{
      padding:0;
      margin: 0;
    }
    body{
       background-color: rgb(5, 5, 17);
       color:white;
    }
    .container{
      justify-items: center; /* Center grid items horizontally */
  align-items: center;   /* Center grid items vertically */ 

      width:100%;
 display: grid;
  grid-template-columns: repeat(4, 1fr); /* Create 4 equal columns */
  gap: 20px; /* Adjust the gap between grid items */
    }
    .main_title{
      font-size: 30px;         /* Base font size */
  font-weight: 700;        /* Slightly bolder than regular text */
color: rgb(86, 199, 233);  line-height: 1.4;        /* Comfortable line spacing */
  margin-bottom: 30px;     /* Adds space below the title */
  margin: 15px 10%;
    }
    .title{
    display: -webkit-box;
  display: -moz-box; /* Firefox */
  display: box;      /* Older browsers */
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  line-clamp: 2;  
  -webkit-box-orient: vertical;  
  -moz-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-y: hidden !important; 

    }
		.yt-card {
		  width: 300px;
		  font-family: sans-serif;
		   border-radius: 25px;
         box-shadow: 0px 1px 7px rgba(255, 255, 255, 0.5); /* White shadow properties */

		}
		.yt-card .thumb{
		  height: 56%;
		  overflow: hidden;
		  margin-bottom: 10px;
		}
		.yt-card .thumb img {
		  width: 100%;
          filter: blur(0)!important;
		  cursor: pointer;
      border-radius: 25px;
		}
		.yt-card .details {
		  display: flex;
		  gap: 10px;
		}
		.yt-card .channel {
		  flex: 1;
		}
		.yt-card .channel img {
		  width: 100%;
		  border-radius: 15px;
		}
		.yt-card .info {
		  flex: 6;
		  font-size: 12px;

		}
		.yt-card .title a {
		  font-size: 18px;
		  text-decoration: none;
		}
		.yt-card .title {
		  margin-bottom: 5px;
		max-height: 50px;
		  overflow: auto;

		}
.hover-video {         
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%;   
  display: none;         /* Initially hide the video */
  z-index: 1;            
}

		.yt-card a {
		  color: white;
		  text-decoration: none;
		}

    .header {  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Subtle header shadow */

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

}

.search-box {
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.htitle {
  margin: 0; /* Remove default margin */
  font-size: 20px;
  font-weight: bold;
}
.header { /* Existing styles */ }

.search-box { 
  display: flex;
  align-items: center;
}

.search-box input { /* Existing styles */ }

.search-box button,.button {
  background-color: #007bff; /* Example blue background */
  color: white;
  border: none;          /* Remove default border */
  padding: 6px 12px;     /* Add some padding */
  border-radius: 5px;    /* Rounded corners */
  cursor: pointer;       /* Indicate clickable */
  font-size: 16px;
}
		</style>
`;

  return v;
}

function retHeader(title) {
  return `<header class="header">
  <h1 class="title"><a href="/">Deshi Video</a></h1>
  <div class="search-box">

<input value = "${title ?? ""}" type="text" id="searchInput">
<button class="button">Search</button>
  </div>
  <script>
  
   document.querySelector(".button").onclick = () => {
  let val = document.querySelector("#searchInput").value;
  window.location = "search/" + val; 
};
  </script>
</header>
`;
}

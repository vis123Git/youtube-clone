const api_key = "AIzaSyCr-h_-fEfz9CIzv0kJ6W8rQayPDchRekU";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const content =  document.getElementById("content")
const container = document.getElementsByClassName("container")[0]


const contents = document.getElementById("contents");
const searchVideo =  document.getElementById("searchVideo")

const fetchVideos = async () => {
  try {
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchVideo.value}&key=${api_key}`;

    const headers = {
      Accept: "application/json",
    };

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
      compress: true,
    });

    const data = await response.json();
    console.log("data===", data.items);
    if (data && data?.items && data?.items?.length) {
      contents.innerHTML = ""
      displayData(data.items);
    }
  } catch (error) {
    console.log("error===>", error);
  }
};

fetchVideos();

const displayData = async (data) => {
  for (const item of data) {
    const channelDetails = await fetchChannelLogo(item.snippet.channelId)
    const fetchVideoDetails =  await fetchVideoStats(item.id.videoId,"statistics")
    // console.log("channelDetails===",channelDetails.items[0].snippet);
    console.log("fetchVideoDetails===",fetchVideoDetails);
    
    // CREATE CONENT DIV FOR INDIVIDIUAL VIEDO
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    content.addEventListener("click", (e)=>{
      container.innerHTML = ""
      const videoPlayer = document.createElement("div");
      videoPlayer.setAttribute("id", "video-Player");
      container.appendChild(videoPlayer);


      let videoId = `${item.id.videoId}`;
      if (YT) {
        new YT.Player("video-Player", {
          height: "500",
          width: "1000",
          videoId,
          events: {
            onReady: onPlayerReady,
          },
        });
      }
    });



    //CREATE THUMBNAIL BOX
    const thumbnail = document.createElement("div");
    thumbnail.setAttribute("id", "thumbnail");

    // ADD IMAGE TAG TO THUMBNAIL BOX AND SET ID AND DYNAMIC IMAGE URL
    const thumbnailImage = document.createElement("img");
    thumbnailImage.setAttribute("id", "thumbnailImage");
    thumbnailImage.src = item.snippet.thumbnails.high.url;
    thumbnail.appendChild(thumbnailImage);

    //CREATE VIDEO DETAILS BOX
    const details = document.createElement("div");
    details.classList.add("details");

    // CREATE CHANNEL LOGO DIV AND ADD IMAGE ELEMENT AND SET DYNAMIC VALUE OF CHANNERL LOGO
    const channelLogo = document.createElement("div");
    channelLogo.classList.add("channel-logo");
    const channelLogoImage = document.createElement("img");
    channelLogoImage.setAttribute("class", "channelLogoImage");
    channelLogoImage.src = channelDetails.items[0].snippet.thumbnails.high.url;
    channelLogo.appendChild(channelLogoImage);
    details.appendChild(channelLogo);

    // CREATE OTHER VIDEO DETAILS INFO DIVS
    const videoInfo = document.createElement("div");
    videoInfo.classList.add("video-info");

    //CREATE VIDEO TITLE DIV AND P TAG
    const videoTitle = document.createElement("div");
    videoTitle.setAttribute("id", "video-title");
    const videoTitlePara = document.createElement("p");
    videoTitlePara.innerText = item.snippet.title;
    videoTitle.appendChild(videoTitlePara);

    // CREATE CHANNEL NAME DIV AND PARA
    const channelName = document.createElement("div");
    channelName.setAttribute("id", "channel-name");
    const channelNamePara = document.createElement("p");
    channelNamePara.innerText = item.snippet.channelTitle;
    channelName.appendChild(channelNamePara);

    // CREATE ANTOHER DIV FOR DISPLAY TIME AND VIEWS OF VIDEO
    const timeAndViews = document.createElement("div");
    timeAndViews.setAttribute("class", "time-views");
    const viewsCount = document.createElement("span");
    viewsCount.setAttribute("id", "viewsCount");
    viewsCount.innerText = formatViews(fetchVideoDetails?.items[0]?.statistics?.viewCount);
    const uploadTime = document.createElement("span");
    uploadTime.setAttribute("id", "uploadTime");
    uploadTime.innerText = formatTimeDifference(item.snippet.publishedAt)
    timeAndViews.appendChild(viewsCount);
    timeAndViews.appendChild(uploadTime);

    videoInfo.appendChild(videoTitle);
    videoInfo.appendChild(channelName);
    videoInfo.appendChild(timeAndViews);
    details.appendChild(channelLogo);
    details.appendChild(videoInfo);
    content.appendChild(thumbnail);
    content.appendChild(details);
    contents.appendChild(content);
  }
};


const fetchChannelLogo = async (channelId) =>{
  try {
    const response = await fetch(
      BASE_URL +
        "/channels" +
        `?key=${api_key}` +
        "&part=snippet" +
        `&id=${channelId}`
    );
    const data = await response.json();
    return data
  } catch (err) {
    console.log(err);
  }
}

const fetchVideoStats = async (videoId, typeOfDetails) =>{
  try {
    const response = await fetch(
      BASE_URL +
        "/videos" +
        `?key=${api_key}` +
        `&part=${typeOfDetails}` +
        `&id=${videoId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error===", error);
  }
}


const formatViews = (viewCount) =>{
  if (viewCount >= 1000000) {
      // If views are in millions, display in M format
      return `${Math.floor(viewCount / 1000000)}M views . `;
  } else if (viewCount >= 1000) {
      // If views are in thousands, display in K format
      return `${Math.floor(viewCount / 1000)}K views . `;
  } else {
      // Display views as is if less than 1000
      return `${viewCount ? viewCount : 0 } views . `;
  }
}


const formatTimeDifference =  (publishedTime) =>{
  const currentTime = new Date();
  const publishedDate = new Date(publishedTime);
  const timeDifferenceInSeconds = Math.floor((currentTime - publishedDate) / 1000);

  if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
  } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < 604800) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < 2592000) {
      const weeks = Math.floor(timeDifferenceInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}



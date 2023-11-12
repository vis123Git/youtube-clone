
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
      compress: true, // To enable compression
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
    // CREATE CONENT DIV FOR INDIVIDIUAL VIEDO
    const content = document.createElement("div");
    content.setAttribute("id", "content");

    //CREATE THUMBNAIL BOX
    const thumbnail = document.createElement("div");
    thumbnail.setAttribute("id", "thumbnail");

    // ADD IMAGE TAG TO THUMBNAIL BOX AND SET ID AND DYNAMIC IMAGE URL
    const thumbnailImage = document.createElement("img");
    thumbnailImage.setAttribute("id", "thumbnailImage");
    thumbnailImage.src = item.snippet.thumbnails.default.url;
    thumbnail.appendChild(thumbnailImage);

    //CREATE VIDEO DETAILS BOX
    const details = document.createElement("div");
    details.classList.add("details");

    // CREATE CHANNEL LOGO DIV AND ADD IMAGE ELEMENT AND SET DYNAMIC VALUE OF CHANNERL LOGO
    const channelLogo = document.createElement("div");
    channelLogo.classList.add("channel-logo");
    const channelLogoImage = document.createElement("img");
    channelLogoImage.setAttribute("class", "channelLogoImage");
    channelLogoImage.src = item.snippet.thumbnails.default.url;
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
    viewsCount.innerText = `${5} views  . `;
    const uploadTime = document.createElement("span");
    uploadTime.setAttribute("id", "uploadTime");
    uploadTime.innerText = `${5} years ago`;
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


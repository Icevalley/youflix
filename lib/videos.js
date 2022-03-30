import videoData from '../data/videos.json'

export const getCommonVideos = async (url) => {

    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const BASE_URL = 'youtube.googleapis.com/youtube/v3'
        
        const response = await fetch(
            `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
            );

        const data = await response.json();

        if (data?.error) {
            console.error('youtube API error', data.error);
            return [];
        }

        return data?.items.map((item) => {
            const id = item.id?.vidioId || item.id;
            const snippet = item.snippet;
            return {
                title: snippet?.title,
                imgUrl: snippet.thumbnails.high.url,
                id,
                description: snippet.description,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics ? item.statistics : {viewCount: 0 },
            }
        });
    } catch (error) {
        console.error('Something went wrong', error);
        return [];
    }
}

export const getPopularVideos = async () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`

    // videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc

    return getCommonVideos(URL)


}

export const getYoutubeVideoById = async (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

    return getCommonVideos(URL)
}

export const getVideos = (query) => {
    const URL = `search?part=snippet&maxResults=25&q=${query}`;

    

    return getCommonVideos(URL)

}
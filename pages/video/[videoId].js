import { useRouter } from 'next/router'
import Modal from 'react-modal'
import styles from '../../styles/video.module.css'
import { getYoutubeVideoById } from '../../lib/videos'

import clsx from 'classnames'

Modal.setAppElement('#__next');

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
    // data to fetch from api
    // const video = {
    //     title: 'Hi there',
    //     publishTime: '1001-01-01',
    //     description: 'ipsum lipsum dprus bprsum blahblahblah blahblahb lahblahb',
    //     channelTitle: 'Paramount pictures',
    //     viewCount: 10203020,
    // };

    console.log(context)
    const videoId = context.params.videoId;
    const videoArray = await getYoutubeVideoById(videoId);

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const listOfVideos = ['CaimKeDcudo', 'JipAeCFLgeg', '4aYVLpY5FYU', 'cvFt2Xcuois']

    // Get the paths we want to pre-render based on posts
    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}

const Video = ({ video }) => {
    const router = useRouter();



    const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 }} = video;

    return <div className={styles.container}>
        <Modal
            isOpen={true}
            contentLabel="Example Modal"
            onRequestClose={() => router.back()}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <iframe
                id="ytplayer"
                className={styles.videoPlayer}
                type="text/html"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=1&rel=0`}
                frameborder="0"></iframe>

            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>
                    <div className={styles.col1}>
                        <p className={styles.publishTime}>Published: {publishTime}</p>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                    </div>
                    <div className={styles.col2}>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{channelTitle}</span>
                        </p>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count: </span>
                            <span className={styles.channelTitle}>{viewCount}</span>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
}

export default Video
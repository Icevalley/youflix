import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner'
import NavBar from '../components/nav/navbar'
import Card from '../components/card/card'
import SectionCards from '../components/card/section-cards'
import { getVideos, getPopularVideos } from '../lib/videos'


export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailer');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();
  // Pass data to the page via props
  return { props: { disneyVideos, productivityVideos, travelVideos, popularVideos } }
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos
}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Youflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar username="bjornis@bjornis.com" />
        <Banner className={styles.bannerContainer}
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl='../static/clifford.jpg' />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='small' />
          <SectionCards title='Travel' videos={travelVideos} size='small' />
          <SectionCards title='Productivity' videos={productivityVideos} size='small' />
          <SectionCards title='Popular' videos={popularVideos} size='small' />
        </div>
      </div>
    </div>
  )
}

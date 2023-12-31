import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsLetterRegistration from "../components/input/newsletter-registration";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Welcome to NextJS Events</title>
        <meta
          name="description"
          content="lots of events that allow you to evolve"
        />
      </Head>
      <NewsLetterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;

import { getFeaturedEvents } from "../api/events";
import EventList from "../components/events/EventList/EventList";

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}

export default HomePage;

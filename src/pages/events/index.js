import { useRouter } from "next/router";

import EventList from "../../components/events/EventList/EventList";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import { getAllEvents } from "../../api/events";

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  const searchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={searchHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 60 };
}

export default AllEventsPage;

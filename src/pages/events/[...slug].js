import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/EventList/EventList";
import ResultsTitle from "../../components/events/ResultsTitle/ResultsTitle";
import Button from "../../components/ui/ButtonComponent/ButtonComponent";
import ErrorAlert from "../../components/ui/ErrorAlert/ErrorAlert";

import { useAllEvents } from "../api/events";

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;
  const { data, isLoading, error } = useAllEvents();

  useEffect(() => {
    if (data) {
      const events = Object.keys(data).map((key) => data[key]);
      setLoadedEvents(events);
    }
  }, [data]);

  const year = +filterData[0]; //convert string to number by adding "+"
  const month = +filterData[1];

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All Events for ${month}, ${year}`} />
    </Head>
  );

  if (isLoading) {
    return (
      <>
        {pageHeadData}
        <h1 className="center">Loading...</h1>
      </>
    );
  }

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const year = +filterData[0]; //convert string to number by adding "+"
//   const month = +filterData[1];

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: { destination: "/error" },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({ year, month });

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year,
//         month,
//       },
//     },
//   };
// }

export default FilteredEventsPage;

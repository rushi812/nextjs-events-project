import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const useAllEvents = () => {
  const { data, error } = useSWR(
    "https://nextjs-course-15368-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  return { data, isLoading: !error && !data, error };
};

export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-15368-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = [];

  for (let key in data) {
    events.push(data[key]);
  }
  return events;
};

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

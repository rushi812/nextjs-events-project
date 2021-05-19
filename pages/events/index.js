import { getAllEvents } from '../../dummy-data'
import { useRouter } from 'next/router'

import EventList from '../../components/events/EventList/EventList'
import EventsSearch from '../../components/events/EventsSearch/EventsSearch'

const AllEventsPage = () => {
  const router = useRouter()
  const events = getAllEvents()

  const searchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <EventsSearch onSearch={searchHandler} />
      <EventList items={events} />
    </>
  )
}

export default AllEventsPage

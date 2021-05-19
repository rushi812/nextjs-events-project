import { useRouter } from 'next/router'

import EventList from '../../components/events/EventList/EventList'
import ResultsTitle from '../../components/events/ResultsTitle/ResultsTitle'
import Button from '../../components/ui/Button/Button'
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert'

import { getFilteredEvents } from '../../dummy-data'

const FilteredEventsPage = () => {
  const router = useRouter()

  const filterData = router.query.slug

  if (!filterData) {
    return <p className='center'>Loading...</p>
  }

  const year = +filterData[0] //convert string to number by adding "+"
  const month = +filterData[1]

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = getFilteredEvents({ year, month })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(year, month - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage

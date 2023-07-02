import React from "react";
import EventItem from "../EventItem/EventItem";

import classes from "./EventList.module.css";

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem event={event} />
      ))}
    </ul>
  );
};

export default EventList;

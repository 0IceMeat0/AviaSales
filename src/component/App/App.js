import React, { useEffect, useRef } from "react";
import "./app.scss";
import "./basesettings.scss";
import logo from "./logo.svg";
import HeaderFilters from "../headerfilters/headerfilters";
import AsideFilters from "../asidefilters/asidefilters";
import AviaList from "../avialist/avialist";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { chooseAddId, chooseTickets, chooseLoad, internetOn, internetOff } from "../reducer";

function App() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.toolkit);
  const firstTime = useRef(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function addId() {
    try {
      const response = await fetch(
        "https://aviasales-test-api.kata.academy/search",
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const id = data.searchId;

      dispatch(chooseAddId(id));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    addId();
  }, []);

  const isUniqueTicket = (newTicket, existingTickets) => {
    return !existingTickets.some(
      (item) =>
        item.origin === newTicket.origin &&
        item.destination === newTicket.destination &&
        item.date === newTicket.date,
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchTickets() {
    if (id !== 0) {
      try {
        const response = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { tickets, stop } = await response.json();

        if (firstTime.current) {
          dispatch(chooseTickets(tickets));
          firstTime.current = false;
        } else {
          const newTickets = tickets.filter((newTicket) =>
            isUniqueTicket(newTicket, tickets),
          );
          dispatch(chooseTickets(newTickets));
        }

        if (!stop) {
          fetchTickets();
        } else {
          dispatch(chooseLoad());
        }
      } catch (error) {
        if (error.name !== "TypeError") fetchTickets();
      }
    }
  }

  useEffect(() => {
    fetchTickets();
  }, [id]);


  useEffect(() => {
    window.onoffline = () => {
      dispatch(internetOff());
    };
    window.ononline = () => {
      dispatch(internetOn());
    };
  });


  return (
    <div className="app">
      <img className="app-logo" src={logo} alt="" />
      <div className="app-elements">
        <AsideFilters />
        <HeaderFilters />
        <AviaList />
      </div>
    </div>
  );
}

export default App;

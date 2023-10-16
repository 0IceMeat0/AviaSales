import React from "react";
import "./avialist.scss";
import AviaItem from "../aviaitem/aviaitem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { chooseMoreTickets } from "../reducer";
import Loader from "../footer/spinner";

function AviaList() {
  const dispatch = useDispatch();
  const { ticketsList, tickCount, all, without, one, two, three, load } =
    useSelector((state) => state.toolkit);
  let id = 1;

  const filteredTickets = ticketsList.filter((item) => {
    const segments = item.segments;
    const stopsCountOne =
      segments[0].stops.length === 1 && segments[1].stops.length === 1;
    const stopsCountWithout =
      segments[0].stops.length === 0 && segments[1].stops.length === 0;
    const stopsCountTwo =
      segments[0].stops.length === 2 && segments[1].stops.length === 2;
    const stopsCountThree =
      segments[0].stops.length === 3 && segments[1].stops.length === 3;

    return (
      all ||
      (one && stopsCountOne) ||
      (two && stopsCountTwo) ||
      (three && stopsCountThree) ||
      (without && stopsCountWithout)
    );
  });

  if (filteredTickets.length === 0) {
    return <div>Нет билетов, удовлетворяющих выбранным фильтрам</div>;
  }

  const elements = filteredTickets.slice(0, tickCount).map((item) => {
    const itemId = ++id;
    return (
      <li key={itemId} className="avialist-item">
        <AviaItem todos={item} />
      </li>
    );
  });

  return (
    <div>
      {load ? <Loader /> : null}
      {filteredTickets.length === 0 ? (
        <div>Нет билетов, удовлетворяющих выбранным фильтрам</div>
      ) : (
        <ul className="avialist">{elements}</ul>
      )}
      {tickCount < filteredTickets.length && (
        <button
          className="avialist-button"
          onClick={() => dispatch(chooseMoreTickets())}
        >
          Загрузить больше
        </button>
      )}
    </div>
  );
}

export default AviaList;

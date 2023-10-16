import React from "react";
import "./aviaitem.scss";

function AviaItem({ todos }) {
  const stopsValidation = (n) => {
    if (n === 1) return "пересадка";
    else if (n === 2 || n === 3 || n === 4) return "пересадки";
    else return "пересадок";
  };

  const dateValidation = (date, duration) => {
    const h =
      new Date(date).getHours() < 10
        ? "0" + new Date(date).getHours()
        : new Date(date).getHours();
    const m =
      new Date(date).getMinutes() < 10
        ? "0" + new Date(date).getMinutes()
        : new Date(date).getMinutes();
    const time1 = [h, m].join(":");
    const date2 = new Date(new Date(date).getTime() + duration * 60000);
    const h2 =
      new Date(date2).getHours() < 10
        ? "0" + new Date(date2).getHours()
        : new Date(date2).getHours();
    const m2 =
      new Date(date2).getMinutes() < 10
        ? "0" + new Date(date2).getMinutes()
        : new Date(date2).getMinutes();
    const time2 = [h2, m2].join(":");
    return [time1, time2];
  };

  return (
    <div className="item">
      <div className="item-header">
        <div className="item__price">{todos.price} Р</div>
        <img
          src={"//pics.avs.io/99/36/" + todos.carrier + ".png"}
          className="item__logo"
          alt="img"
        />
      </div>
      <div className="item-info">
        <div className="gray">
          {todos.segments[0].origin} - {todos.segments[0].destination}
        </div>
        <div className="gray">В пути</div>
        <div className="gray">
          {todos.segments[0].stops.length}{" "}
          {stopsValidation(todos.segments[0].stops.length)}
        </div>
        <div>
          {dateValidation(
            todos.segments[0].date,
            todos.segments[0].duration,
          ).join("-")}
        </div>
        <div>
          {Math.floor(todos.segments[0].duration / 60)}ч{" "}
          {Math.floor(
            todos.segments[0].duration -
              Math.floor(todos.segments[0].duration / 60) * 60,
          )}
          м
        </div>
        <div>{todos.segments[0].stops.join(" ")}</div>
      </div>

      <div className="item-info">
        <div className="gray">
          {todos.segments[1].origin} - {todos.segments[1].destination}
        </div>
        <div className="gray">В пути</div>
        <div className="gray">
          {todos.segments[1].stops.length}{" "}
          {stopsValidation(todos.segments[1].stops.length)}
        </div>
        <div>
          {dateValidation(
            todos.segments[1].date,
            todos.segments[1].duration,
          ).join("-")}
        </div>
        <div>
          {Math.floor(todos.segments[1].duration / 60)}ч{" "}
          {Math.floor(
            todos.segments[1].duration -
              Math.floor(todos.segments[1].duration / 60) * 60,
          )}
          м
        </div>
        <div>{todos.segments[1].stops.join(" ")}</div>
      </div>
    </div>
  );
}

export default AviaItem;

import React from "react";
import "./asidefilters.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
  chooseAll,
  chooseWithout,
  chooseOne,
  chooseTwo,
  chooseThree,
} from "../reducer";

function AsideFilters() {
  const dispatch = useDispatch();
  const { all, without, one, two, three } = useSelector(
    (state) => state.toolkit,
  );
  return (
    <div className="asidefilters">
      <h4 className="asidefilters-title">КОЛИЧЕСТВО ПЕРЕСАДОК</h4>
      <div
        className="asidefilters-button"
        onClick={() => dispatch(chooseAll())}
      >
        <input
          className="asidefilters-checkbox"
          type="checkbox"
          checked={all}
        />
        <span>Все</span>
      </div>
      <div
        className="asidefilters-button"
        onClick={() => dispatch(chooseWithout())}
      >
        <input
          className="asidefilters-checkbox"
          type="checkbox"
          checked={without}
        />
        <span>Без пересадок</span>
      </div>
      <div
        className="asidefilters-button"
        onClick={() => dispatch(chooseOne())}
      >
        <input
          className="asidefilters-checkbox"
          type="checkbox"
          checked={one}
        />
        <span>1 пересадка</span>
      </div>
      <div
        className="asidefilters-button"
        onClick={() => dispatch(chooseTwo())}
      >
        <input
          className="asidefilters-checkbox"
          type="checkbox"
          checked={two}
        />
        <span>2 пересадки</span>
      </div>
      <div
        className="asidefilters-button"
        onClick={() => dispatch(chooseThree())}
      >
        <input
          className="asidefilters-checkbox"
          type="checkbox"
          checked={three}
        />
        <span>3 пересадки</span>
      </div>
    </div>
  );
}
export default AsideFilters;

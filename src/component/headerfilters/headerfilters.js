import React from "react";
import "./headerfilters.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { chooseFastcost, chooseMincost } from "../reducer";
function HeaderFilters() {
  const dispatch = useDispatch();
  const { mincost, fastcost } = useSelector((state) => state.toolkit);

  return (
    <header className="headerfilters">
      <button
        className={
          mincost ? "active headerfilters-button" : "headerfilters-button"
        }
        onClick={() => dispatch(chooseMincost())}
      >
        Самый дешевый
      </button>
      <button
        className={
          fastcost ? "active headerfilters-button" : "headerfilters-button"
        }
        onClick={() => dispatch(chooseFastcost())}
      >
        Самый быстрый
      </button>
    </header>
  );
}
export default HeaderFilters;

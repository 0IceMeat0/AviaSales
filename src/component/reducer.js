import { createAction, createReducer } from "@reduxjs/toolkit";

const defaultState = {
  id: 0,
  ticketsList: [],
  load: true,
  internet: true,
  all: true,
  without: true,
  one: true,
  two: true,
  three: true,
  mincost: false,
  fastcost: false,
  tickCount: 5,
};
export const chooseAll = createAction("toggle_all");
export const chooseWithout = createAction("toggle_without");
export const chooseOne = createAction("toggle_one");
export const chooseTwo = createAction("toggle_two");
export const chooseThree = createAction("toggle_three");

export const chooseMincost = createAction("toggle_Mincost");
export const chooseFastcost = createAction("toggle_chooseFastcost");

export const chooseTickets = createAction("add_tickets");
export const chooseAddId = createAction("ADD_ID");
export const chooseLoad = createAction("IS_LOAD");

export const chooseMoreTickets = createAction("more_tickets");

export const internetOff = createAction("internet_off");
export const internetOn = createAction("internet_on");


const reducer = createReducer(defaultState, {
  [chooseAll]: function (state) {
    if (!state.all) {
      state.all = true;
      state.without = true;
      state.one = true;
      state.two = true;
      state.three = true;
    } else {
      state.all = false;
      state.without = false;
      state.one = false;
      state.two = false;
      state.three = false;
    }
  },
  [chooseWithout]: function (state) {
    if (state.without) {
      state.all = false;
      state.without = false;
    } else if (state.one && state.two && state.three) {
      state.all = true;
      state.without = true;
    } else {
      state.without = true;
    }
  },
  [chooseOne]: function (state) {
    if (state.one) {
      state.all = false;
      state.one = false;
    } else if (state.without && state.two && state.three) {
      state.all = true;
      state.one = true;
    } else {
      state.one = true;
    }
  },
  [chooseTwo]: function (state) {
    if (state.two) {
      state.all = false;
      state.two = false;
    } else if (state.without && state.one && state.three) {
      state.all = true;
      state.two = true;
    } else {
      state.two = true;
    }
  },
  [chooseThree]: function (state) {
    if (state.three) {
      state.all = false;
      state.three = false;
    } else if (state.without && state.one && state.two) {
      state.all = true;
      state.three = true;
    } else {
      state.three = true;
    }
  },
  [chooseMincost]: function (state) {
    state.ticketsList = state.ticketsList.sort((a, b) => a.price - b.price);
    state.mincost = true;
    state.fastcost = false;
    state.mediumcost = false;
  },
  [chooseFastcost]: function (state) {
    state.ticketsList = state.ticketsList.sort((a, b) =>
      a.segments[0].duration + a.segments[1].duration >
      b.segments[0].duration + b.segments[1].duration
        ? 1
        : -1,
    );
    state.mincost = false;
    state.fastcost = true;
    state.mediumcost = false;
  },

  [chooseAddId]: function (state, action) {
    state.id = action.payload;
  },
  [chooseTickets]: function (state, action) {
    state.ticketsList.push(...action.payload);
  },
  [chooseMoreTickets]: function (state) {
    return { ...state, tickCount: state.tickCount + 5 };
  },
  [chooseLoad]: function (state) {
    state.load = false;
  },
  [internetOff]: function(state){
    state.internet = false;
  },
  [internetOn]: function(state){
    state.internet = true;
  }
});
export default reducer;

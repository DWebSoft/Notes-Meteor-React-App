import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import { AppRouter, history, onAuthChange } from "./../imports/routes/AppRouter";
import  "../imports/startup/simple-schema-configurtaion";

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(AppRouter, document.getElementById('app'));  
});
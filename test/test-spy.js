import jsdom from "jsdom";
const doc = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.document = doc;
global.window = doc.defaultView;
import { test } from "ava";
import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { Foo } from "./foo";

test.beforeEach(t => {
  t.context = mount(<Foo/>);
})

test("trivial: wrapper can find div and button", t => {
   const component = t.context;
   t.is(component.childAt(0).type(), "button");
});

// @TODO figure out best selector for these 3 setup test cases
// test("trivial: wrapper can find class of button", t => {
//   const component = t.context;
//    let button = component.find("button").hasClass("test-button");
//    t.true(button);
// });

// test("trivial: component state.clicked is false", t => {
//    const c = t.context;
//    console.log(c.find("Foo").props())
//    t.false(c.state("clicked"));
// });

// test("trivial: component state.clicked updated to true when button is clicked", t => {
//   //  c.childAt(0).simulate("click");
//   //  console.log(t.context.childAt(0))
//   //  t.is(c.state().clicked, true);
// });

// @TODO test methods on target class
// @TODO test methods passed via props

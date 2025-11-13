import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>[Home Page]</h1>
      <nav>
        <Link to="about">About</Link>
        <Link to="events">Events</Link>
        <Link to="products">Products</Link>
        <Link to="contact">Customer Support</Link>
      </nav>
    </div>
  );
}

export function About() {
  return (
    <div>
      <h1>[About Company]</h1>
      <Outlet />
    </div>
  );
}

export function Events() {
  return (
    <div>
      <h1>[Events]</h1>
    </div>
  );
}

export function Products() {
  return (
    <div>
      <h1>[Products]</h1>
    </div>
  );
}

export function Contact() {
  return (
    <div>
      <h1>[Customer Support]</h1>
    </div>
  );
}

export function Whoops404() {
  let location = useLocation();
  console.log(location);
  return (
    <div>
      <h1>Resource not found at {location.pathname}</h1>
    </div>
  );
}

export function Services() {
  return (
    <div>
      <h2>Our Services</h2>
    </div>
  );
}

export function History() {
  return (
    <div>
      <h2>Our History</h2>
    </div>
  );
}

export function Location() {
  return (
    <div>
      <h2>Location</h2>
    </div>
  );
}

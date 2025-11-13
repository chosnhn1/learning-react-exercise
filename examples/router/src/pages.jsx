import React from "react";
import { Link } from "react-router-dom";

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

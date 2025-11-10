import React, { useEffect, useMemo, useCallback } from "react";

function WordCount({ children = "" }) {
  useAnyKeyToRender();

  // instead of:
  // const words = children.split(" ");

  // useMemo
  // "only recompute this when children changes:"
  const words = useMemo(() => children.split(" "), [children]);

  useEffect(() => {
    console.log("fresh render");
  }, [words]);

  // const fn = () => {
  //   console.log("hello");
  //   console.log("world");
  // };

  // Javascript will think fn between renders are different one, so will keep re-render
  // useEffect(() => {
  //   console.log("fresh render");
  //   fn();
  // }, [fn]);

  const fn = useCallback(() => {
    console.log("hello");
    console.log("world");
  }, []);

  useEffect(() => {
    console.log("fresh render");
    fn();
  }, [fn]);

  return (
  <>
    <p>{children}</p>
    <p>
      <strong>{words.length} - words</strong>
    </p>
  </>
  );
}

function App() {
  return <WordCount>You are not going to believe this but...</WordCount>;
}
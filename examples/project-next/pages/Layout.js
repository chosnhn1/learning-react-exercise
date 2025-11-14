import Header from "./Header";

export function Layout(props) {
  return (
    <div>
      <Header />
      { props.children }
    </div>
  );
}
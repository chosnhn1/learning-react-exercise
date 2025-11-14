import Link from "next/link";

const linkStyle = {
  marginRight: 15,
  color: "salmon"
};

export default function Header() {
  return (
    <div>
      <Link style={linkStyle} href="/">
        Home
      </Link>      
      <Link style={linkStyle} href="/pets">
        Pets
      </Link>      
    </div>
  );
}
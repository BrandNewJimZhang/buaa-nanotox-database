import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
      <Link href="./">
        <li>Home</li>
      </Link>
      <Link href="./query">
        <li>Query and download</li>
      </Link>
      <Link href="./calc">
        <li>Calculator</li>
      </Link>
      <Link href="./panther-data">
        <li>Panther Data</li>
      </Link>
      </ul>
    </div>
  );
}
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-12 lg:mx-52">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/orders">Order</Link>
              </li>
              <li>
                <Link href="/categories">Category</Link>
              </li>
              <li>
                <Link href="/products">Product</Link>
              </li>
              <li>
                <Link href="/users">User</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Cashed</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/orders">Order</Link>
            </li>
            <li>
              <Link href="/dashboard/categories">Category</Link>
            </li>
            <li>
              <Link href="/dashboard/products">Product</Link>
            </li>
            <li>
              <Link href="/dashboard/users">User</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-error">Logout</a>
        </div>
      </div>
      <div className="py-12 lg:mx-32">{children}</div>
    </div>
  );
}

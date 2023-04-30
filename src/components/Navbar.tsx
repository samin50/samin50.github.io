import React from "react";
import styles from "../style";

function Navbar() {
  return (
    <nav className="w-full flex justify-end pt-3">
      <ul className="flex">
        <li className={styles.navBarTitles}>
          Home
        </li>
        <li className={styles.navBarTitles}>
          Portfolio
        </li>
        <li className={styles.navBarTitles}>
          Contact
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

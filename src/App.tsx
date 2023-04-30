import { Navbar, NavbarBite } from "./components";
import React, { useEffect } from 'react';
import 'flowbite';

function App() {
  {/** Dark mode toggle **/} 
  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (!themeToggleDarkIcon || !themeToggleLightIcon) return;

    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

    if (!themeToggleBtn) return;

    const handleClick = () => {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    };

    themeToggleBtn.addEventListener('click', handleClick);

    return () => {
        themeToggleBtn.removeEventListener('click', handleClick);
    };
}, []);
  return (
    <div className="min-h-screen w-full grid grid-rows-[auto,1fr]">
    <NavbarBite />
    <div style={{ height: '3000px', backgroundColor: 'lightblue' }}>
      1 <br />
      2 <br />
      3 <br />
      4 <br />
      5 <br />
      6 <br />
      7 <br />
    </div>
  </div>
  );
}


export default App;

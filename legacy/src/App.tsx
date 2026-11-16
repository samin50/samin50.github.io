import { Navbar, Sidebar, Hero, ProPortfolio, PersPortfolio, Contact } from "./components";
import React, { useEffect, useState } from 'react';
import 'flowbite';
import Footer from "./components/Footer";

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
    };}, []);

    {/** Switching between pages **/}
    const [pageNumber, setPageNumber] = useState(0);
    useEffect(() => {
      }, [pageNumber]);
  return (
    <div className="dark:bg-primarydark bg-primary text-textlight dark:text-textdark transition-colors 1000 ease-in-out h-full">
        <Navbar pageNumber={pageNumber} setPageNumber={setPageNumber} />
        <div className="flex border-b-2 border-secondary dark:border-secondarydark h-full">
            <Sidebar pageNumber={pageNumber} setPageNumber={setPageNumber} />
            {pageNumber === 0 ? <Hero /> : null}
            {pageNumber === 1 ? <ProPortfolio /> : null}
            {pageNumber === 2 ? <PersPortfolio /> : null}
            {pageNumber === 3 ? <Contact /> : null}
        </div>
        <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import { CSSProperties } from 'react';
import styles from '../../style';

export interface ProjectProps {
  title: string;
  content:  React.ReactNode;
  badges: string[]
}

const summaryNoArrow: CSSProperties = {
  listStyle: 'none',
  outline: 'none',
};

export const ProjectDesc: React.FC<ProjectProps> = ({ title, content, badges }) => {
  return (
    <div className='bg-primary dark:bg-primarydark'>
        <details className="p-4 mb-5 w-full z-10 bg-black dark:bg-opacity-[0.22] bg-opacity-[0.03]">
            <summary style={summaryNoArrow} className="flex-col items-end justify-center font-semibold  border-secondary dark:border-secondarydark border-b-2 hover:cursor-pointer hover:border-tertiary dark:hover:border-tertiarydark transition-colors duration-250">
                <div className='flex justify-between border-secondary dark:border-secondarydark border-b-[1px] pb-2'>
                    <div className='flex items-center'>
                        <svg className="h-5 pt-1 mr-2 dark:fill-textdark fill-textlight rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M256 120.77 306.43 64 768 512 306.43 960 256 903.23 659.07 512z"/></svg>
                        {title}
                    </div>
                    <div className="flex flex-wrap">
                      {/* Dynamically create badges */}
                    {
                        badges.map((badge, index) => (
                        <span className={styles.badge}>{badge}</span>
                    ))}
                    </div>
                </div>
            </summary>
            <div className="p-3 dark:backdrop-brightness-[1.6] backdrop-brightness-[1.0]">
                {content}
            </div>
        </details>
    </div>
  );
};

import React from 'react';
import { CSSProperties } from 'react';

export interface CollapsibleProps {
  title: string;
  content:  React.ReactNode;
}

const summaryNoArrow: CSSProperties = {
  listStyle: 'none',
  outline: 'none',
};

export const Collapsible: React.FC<CollapsibleProps> = ({ title, content }) => {
  return (
    <details className="p-[1.5] pt-5 w-full">
      <summary style={summaryNoArrow}
        className="font-semibold border-secondary dark:border-secondarydark border-2 rounded-md p-2 flex justify-start items-center hover:cursor-pointer hover:border-tertiary dark:hover:border-tertiarydark transition-colors duration-250">
        <svg className="h-5 pr-1 dark:fill-secondarydark fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M256 120.77 306.43 64 768 512 306.43 960 256 903.23 659.07 512z"/></svg>
        {title}
      </summary>
      <div className="p-3 bg-primary dark:bg-primarydark brightness-90 shadow-md">
        {content}
      </div>
    </details>
  );
};
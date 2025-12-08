import React from 'react'
import cn from 'classnames'
import SpotlightCard from './SpotlightCard'

export function BentoGrid({ className, children }) {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    )
}

export function BentoItem({
    className,
    title,
    description,
    header,
    icon,
    cols = 1,
    rows = 1,
    children
}) {
    return (
        <SpotlightCard
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                // Handle responsive column spanning
                cols === 2 ? "md:col-span-2" : "md:col-span-1",
                cols === 3 ? "md:col-span-3" : "",
                rows === 2 ? "md:row-span-2" : "",
                className
            )}
        >
            {header}
            {children ? children : (
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    {icon}
                    <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                        {description}
                    </div>
                </div>
            )}
        </SpotlightCard>
    )
}

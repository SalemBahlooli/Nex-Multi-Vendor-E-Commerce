"use client";
import React, { useState, useEffect } from 'react';


import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-bage";
import { getParticipantCount } from "@/actions/Participant";
import { getCategoryTitle } from "@/lib/category-service";
import { Categorytitle } from './category-title';







interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  hostIdentity: string;
  participants:number;
  categorytitle?:string,

  
};

export const UserItem = ({
  username,
  imageUrl,
  isLive,
  hostIdentity,
  participants,
  categorytitle,
  
}: UserItemProps) => {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;
  const isActive = pathname === href;

  function formatNumber(num : number) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}
  
 
  

//  const count = getParticipantCount(hostIdentity);
    // const category = getCategoryTitle(categoryid);
    

 

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justfy-start",
        isActive && "bg-accent",
      )}
    >
      <Link href={href}>
        <div className={cn(
          "flex items-center w-full gap-x-4",
          collapsed && "justify-center",
        )}>
          <UserAvatar
            imageUrl={imageUrl}
            username={username}
            isLive={isLive}
            
            
          />
          {!collapsed && (
            <>  
            <div className=" flex-row">
                    <p className="truncate">
                    {username}       
                    </p>
                       <p style={{ width: '100px' }} className=" text-muted-foreground text-xs text-ellipsis whitespace-nowrap   overflow-hidden">
                        {categorytitle}
                        
                     </p>
                    
                   
                    {/* <Categorytitle title={category}/> */}
                  

            </div>
                  
            <div className="text-right w-full flex justify-end items-center">
                  {isLive && <div className="pulsing-circle mr-2"></div>}
                {/* { count && ( */}

                  <p className="text-muted-foreground ">
                    {/* {count} */}
                      {/* {formatNumber(count)} */}
                       {/* {formatNumber()} */}
                  </p>
                {/* )} */}

                  


            </div>
            </>
            
            
          )}
          {/* {!collapsed && isLive && (
            <LiveBadge className="ml-auto" />
            
          )} */}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};



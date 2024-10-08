"use client";


import { Follow, Stream , User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { getParticipantCount } from '@/actions/Participant';




interface FollowingProps {
  data: (Follow & { 
    following: User & {
      stream: { isLive: boolean;
        category?: {title: string;} | null; 
       } | null;
    },
  })[];
}



export const Following = ({
  data,
}: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Following
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            hostIdentity={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
            categorytitle={follow.following.stream?.category?.title}
            participants={0}
            
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
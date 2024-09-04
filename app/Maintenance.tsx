// pages/maintenance.js
import React from 'react';
import Image from "next/image";


const MaintenancePage = () => (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
                    <div className="flex items-center hover:opacity-35 transition">
       
       <Image
         src="/tatra.png"
         alt="Tatra تترا"
         height="350"
         width="350"
       />

   </div>
    <h1 className="text-5xl">503</h1>
    <p>
                 We are currently under maintenance
    </p>
    <p>We apologize for the inconvenience. Please check back later.</p>
    
      
  </div>
);

export default MaintenancePage;
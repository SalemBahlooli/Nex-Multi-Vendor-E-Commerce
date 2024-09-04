"use client";

interface CategorytitleProps {
    title: string;
   
    
  };
  
  export const Categorytitle = ({
    title,
  
  }: CategorytitleProps) => {
  
     
    
  
    return (
      <div >
         <p className=" text-muted-foreground text-xs">
            {title} 
        </p>
  
  
      </div>
    );
  };
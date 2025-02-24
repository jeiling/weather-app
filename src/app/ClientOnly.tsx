'use client'
import {useState, useEffect} from "react";
export default function ClientOnly({children}:{children: React.ReactNode}){
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);
  if(!isHydrated) return null;
  return <>{children}</>;
    
}
"use client";

import { useEffect, useRef } from "react";

type HeroImageSequenceProps = {
  framePath: string;
  frameCount: number;
  progress: number;
  extension?: string;
  filePrefix?: string;
  padding?: number;
};

export function HeroImageSequence({framePath,frameCount,progress,extension="webp",filePrefix="frame-",padding=3}:HeroImageSequenceProps){
  const wrapRef=useRef<HTMLDivElement>(null);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const framesRef=useRef<(HTMLImageElement|undefined)[]>([]);
  const frameRef=useRef(0);
  const drawRef=useRef<()=>void>(()=>{});
  const loadFrameRef=useRef<(index:number)=>void>(()=>{});

  useEffect(()=>{
    const wrap=wrapRef.current;
    const canvas=canvasRef.current;
    if(!wrap||!canvas)return;
    const context=canvas.getContext("2d",{alpha:false});
    if(!context)return;
    let cancelled=false;
    let raf=0;
    let preloadTimer=0;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const pathFor=(index:number)=>`${framePath}/${filePrefix}${String(index+1).padStart(padding,"0")}.${extension}`;
    const draw=()=>{
      raf=0;
      const rect=wrap.getBoundingClientRect();
      const width=Math.max(1,rect.width);
      const height=Math.max(1,rect.height);
      const ratio=window.devicePixelRatio||1;
      const pixelWidth=Math.round(width*ratio);
      const pixelHeight=Math.round(height*ratio);
      if(canvas.width!==pixelWidth||canvas.height!==pixelHeight){canvas.width=pixelWidth;canvas.height=pixelHeight;canvas.style.width=`${width}px`;canvas.style.height=`${height}px`}
      context.setTransform(ratio,0,0,ratio,0,0);
      let index=reduced.matches?0:frameRef.current;
      let image=framesRef.current[index];
      if(!image?.complete||!image.naturalWidth){
        for(let offset=1;offset<frameCount;offset++){
          const before=framesRef.current[index-offset];
          const after=framesRef.current[index+offset];
          if(before?.complete&&before.naturalWidth){image=before;index-=offset;break}
          if(after?.complete&&after.naturalWidth){image=after;index+=offset;break}
        }
      }
      if(!image?.naturalWidth)return;
      const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);
      const drawWidth=image.naturalWidth*scale;
      const drawHeight=image.naturalHeight*scale;
      const overflowX=Math.max(0,drawWidth-width);
      const drawX=width/height<.72?-overflowX*.56:(width-drawWidth)/2;
      context.fillStyle="#090c0a";
      context.fillRect(0,0,width,height);
      context.drawImage(image,drawX,(height-drawHeight)/2,drawWidth,drawHeight);
      canvas.dataset.frame=String(index+1);
      wrap.classList.add("is-ready");
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(draw)};
    drawRef.current=schedule;
    framesRef.current=Array.from({length:frameCount});
    const loadFrame=(index:number)=>{
      if(cancelled||index<0||index>=frameCount||framesRef.current[index])return;
      const image=new window.Image();
      image.decoding="async";
      image.onload=()=>{if(!cancelled&&(index===0||Math.abs(index-frameRef.current)<3))schedule()};
      image.src=pathFor(index);
      framesRef.current[index]=image;
    };
    loadFrameRef.current=loadFrame;
    loadFrame(0);
    if(!reduced.matches){
      for(let index=1;index<Math.min(48,frameCount);index++)loadFrame(index);
      let nextFrame=48;
      const preloadBatch=()=>{
        if(cancelled)return;
        const end=Math.min(nextFrame+8,frameCount);
        for(;nextFrame<end;nextFrame++)loadFrame(nextFrame);
        if(nextFrame<frameCount)preloadTimer=window.setTimeout(preloadBatch,90);
      };
      preloadTimer=window.setTimeout(preloadBatch,350);
    }
    const resize=new ResizeObserver(schedule);
    resize.observe(wrap);
    const onReducedChange=()=>schedule();
    reduced.addEventListener("change",onReducedChange);
    schedule();
    return()=>{cancelled=true;resize.disconnect();reduced.removeEventListener("change",onReducedChange);if(raf)cancelAnimationFrame(raf);if(preloadTimer)clearTimeout(preloadTimer);framesRef.current.forEach(image=>{if(image)image.onload=null});framesRef.current=[]};
  },[framePath,frameCount,extension,filePrefix,padding]);

  useEffect(()=>{
    frameRef.current=Math.max(0,Math.min(frameCount-1,Math.round((progress/100)*(frameCount-1))));
    for(let offset=-2;offset<=2;offset++)loadFrameRef.current(frameRef.current+offset);
    drawRef.current();
  },[progress,frameCount]);

  return <div ref={wrapRef} className="hero-image-sequence" style={{backgroundImage:`url(${framePath}/${filePrefix}${String(1).padStart(padding,"0")}.${extension})`}} aria-hidden="true"><canvas ref={canvasRef}/></div>;
}

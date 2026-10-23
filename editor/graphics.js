// Original explanatory illustrations; not construction drawings or documentary photographs.
export const GRAPHICS=['none','house-exterior','house-reveal','wall-assembly','question','houses','skeleton','source','share'];
const C={ink:'#172A3A',muted:'#687873',accent:'#E87932',wood:'#C99765',paper:'#F5F1E8',rule:'#D9D9CF',brick:'#A35B46'};
const ease=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
function text(c,s,x,y,size=34,color=C.ink,weight=600){c.fillStyle=color;c.font=`${weight} ${size}px "Times New Roman", Times, serif`;c.textAlign='left';c.textBaseline='top';c.fillText(s,x,y);}
function rect(c,x,y,w,h,color,r=0){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function poly(c,points,fill,stroke=C.ink,width=2){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function line(c,x,y,x2,y2,color=C.ink,width=3){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
function header(c,kicker){text(c,'AMERICAN STORIES',96,64,24,C.muted,700);rect(c,96,111,72,5,C.accent);text(c,kicker,96,158,27,C.muted,700);}
function footer(c,s='SIMPLIFIED ILLUSTRATION · NOT A CONSTRUCTION DRAWING'){line(c,96,1004,1824,1004,C.rule,2);text(c,s,96,1025,20,C.muted,400);}
function tag(c,s,x,y,w=190){rect(c,x,y,w,44,C.ink,4);text(c,s,x+14,y+10,22,'#FFFFFF',600);}
function house(c,x,y,scale=1,frame=false,reveal=0){
 c.save();c.translate(x,y);c.scale(scale,scale);
 c.save();c.globalAlpha=.07;poly(c,[[0,650],[850,650],[1080,520],[200,520]],C.ink,null);c.restore();
 poly(c,[[30,610],[815,610],[980,515],[195,515]],'#DDDCD3');
 poly(c,[[30,150],[810,150],[810,610],[30,610]],C.paper);
 poly(c,[[810,150],[975,55],[975,515],[810,610]],frame?'#EEE9DD':'#B67D62');
 rect(c,39,152,760,18,C.wood);rect(c,39,586,760,22,C.wood);
 for(let sx=45;sx<=795;sx+=93){rect(c,sx,170,17,416,C.wood);rect(c,sx+2,170,3,416,'#E6C59E');}
 rect(c,39,365,760,20,C.wood);line(c,62,577,772,180,C.wood,12);
 if(!frame){c.save();c.globalAlpha=1-reveal;rect(c,30,150,780,460,C.brick);c.save();c.beginPath();c.rect(30,150,780,460);c.clip();
  for(let by=150,j=0;by<610;by+=25,j++){line(c,30,by,810,by,'#CA9880',2);for(let bx=30-(j%2)*45;bx<810;bx+=90)line(c,bx,by,bx,by+25,'#CA9880',2);}c.restore();
  for(const wx of [100,355,610]){rect(c,wx,220,136,145,'#F9F7EE');rect(c,wx+10,230,116,125,C.ink);line(c,wx+68,232,wx+68,354,'#F9F7EE',7);line(c,wx+12,291,wx+124,291,'#F9F7EE',7);}
  rect(c,360,430,128,180,'#F9F7EE');rect(c,370,440,108,170,C.ink);rect(c,454,523,6,6,C.accent,3);
  for(const wx of [105,615]){rect(c,wx,440,130,112,'#F9F7EE');rect(c,wx+10,450,110,92,C.ink);line(c,wx+65,450,wx+65,541,'#F9F7EE',6);}c.restore();}
 poly(c,[[0,150],[425,-70],[845,150]],frame?'#ECE8DC':C.ink,C.ink,3);
 if(frame){line(c,20,148,425,-50,C.wood,18);line(c,425,-50,822,148,C.wood,18);line(c,425,-50,425,150,C.wood,14);line(c,210,48,210,150,C.wood,12);line(c,630,48,630,150,C.wood,12);line(c,25,150,820,150,C.wood,18);}
 poly(c,[[425,-70],[590,-165],[1000,55],[845,150]],frame?'#D9D1BE':'#304654');c.restore();
}
function assembly(c,t){
 header(c,'WHAT YOU SEE ≠ WHAT HOLDS IT UP');text(c,'Two jobs.',96,252,92,C.ink,700);text(c,'One wall.',96,360,92,C.ink,700);text(c,'An exterior finish',100,548,34,C.muted,400);text(c,'and a structural frame.',100,598,34,C.muted,400);
 const spread=70*ease(t/1.2),x=840,y=280,w=420,h=470;
 rect(c,x+220+spread,y,400,h,'#E4C69D',4);for(let i=0;i<5;i++)rect(c,x+236+spread+i*86,y+12,18,h-24,C.wood);rect(c,x+220+spread,y,400,20,C.wood);rect(c,x+220+spread,y+h-20,400,20,C.wood);
 c.save();c.globalAlpha=.75;poly(c,[[x+80,y+15],[x+460,y+15],[x+460,y+h+15],[x+80,y+h+15]],'#E7E0CB',C.muted);c.restore();
 rect(c,x-spread,y+45,w,h,C.brick);c.save();c.beginPath();c.rect(x-spread,y+45,w,h);c.clip();for(let j=0;j<13;j++){line(c,x-spread,y+45+j*38,x-spread+w,y+45+j*38,'#CF9D88',3);for(let k=0;k<5;k++)line(c,x-spread+k*100+(j%2?50:0),y+45+j*38,x-spread+k*100+(j%2?50:0),y+83+j*38,'#CF9D88',3);}c.restore();
 tag(c,'BRICK VENEER',x-spread,y+h+88,227);tag(c,'WOOD FRAME',x+250+spread,y-76,213);text(c,'LAYERS SEPARATED FOR EXPLANATION',820,893,23,C.muted,500);footer(c);
}
function share(c,t){
 header(c,'WHY WOOD IS SO COMMON');const value=Math.round(94*ease(t/.75));text(c,value+'%',96,270,260,C.ink,700);text(c,'wood-framed',110,586,61,C.ink,700);text(c,'New single-family homes',110,705,40,C.muted,400);text(c,'completed in 2024',110,760,40,C.muted,400);
 const x=1035,y=260;for(let i=0;i<100;i++)rect(c,x+(i%10)*67,y+Math.floor(i/10)*57,52,42,i<value?C.accent:'#DDDCD3',5);text(c,'Each tile = one percentage point',1035,870,25,C.muted,400);footer(c,'SOURCE: NAHB ANALYSIS OF 2024 U.S. CENSUS BUREAU DATA · NOT ALL EXISTING HOMES');
}
export function drawGraphic(c,type,t){
 if(!type||type==='none')return;c.save();
 if(type==='wall-assembly')assembly(c,t);
 else if(type==='share')share(c,t);
 else if(type==='question'){header(c,'LOOK PAST THE SURFACE');text(c,'That changes',96,330,125,C.ink,700);text(c,'the question.',96,480,125,C.ink,700);rect(c,100,685,420*ease(t/.6),12,C.accent);footer(c);}
 else if(type==='source'){header(c,'A NATIONAL SNAPSHOT');text(c,'How common',96,280,106,C.ink,700);text(c,'is wood framing?',96,408,106,C.ink,700);rect(c,1100,270,640,570,'#FFFFFF',12);text(c,'2024',1150,325,130,C.ink,700);text(c,'SINGLE-FAMILY',1154,513,35,C.ink,700);text(c,'HOME COMPLETIONS',1154,568,35,C.ink,700);line(c,1154,654,1684,654,C.rule,2);text(c,'NAHB analysis',1154,696,32,C.muted,500);text(c,'U.S. Census Bureau data',1154,742,28,C.muted,400);footer(c,'SOURCE: NAHB / EYE ON HOUSING · PUBLISHED AUGUST 27, 2025');}
 else if(type==='houses'){header(c,'THE FINISH IS ONLY THE SURFACE');text(c,'Behind the finish.',96,265,99,C.ink,700);house(c,130,520,.43);house(c,720,520,.43,false,.6*ease(t/2));house(c,1310,520,.43,true);footer(c);}
 else {const reveal=type==='house-reveal'?ease(t/2):0,frame=type==='skeleton';header(c,type==='house-exterior'?'THE HOUSE HIDING IN PLAIN SIGHT':frame?'THE STRUCTURE UNDERNEATH':'LOOK BEHIND THE BRICK');
 if(type==='house-exterior'){text(c,'Brick outside.',96,290,86,C.ink,700);text(c,'Wood inside?',96,393,86,C.ink,700);text(c,'The structure may surprise you.',100,575,32,C.muted,400);}
 else if(frame){text(c,'The skeleton',96,298,86,C.ink,700);text(c,'underneath.',96,401,86,C.ink,700);text(c,'A frame is an interconnected system.',100,582,30,C.muted,400);}
 else {text(c,'Look past',96,290,86,C.ink,700);text(c,'the brick.',96,393,86,C.ink,700);text(c,'Exterior layer → structural frame',100,575,30,C.muted,400);}
 house(c,860,385,.88,frame,reveal);if(type==='house-reveal'&&t>1){c.globalAlpha= ease((t-1)/.6);tag(c,'WOOD FRAME',1130,915,215);c.globalAlpha=1;}footer(c);}
 c.restore();
}

// Original explanatory artwork for episode 001. Geometry is illustrative, never a building plan.
export const EPISODE_GRAPHICS=['history-joinery','standard-parts','history-line','platform-stack','supply-chain','cost-factors','wall-section','veneer-support','heat-bridge','continuous-insulation','advanced-frame','design-check','load-path','connection-detail','whole-system','moisture','fire-exposure','context','three-reasons','regional-choice','project-cost','end-card'];
const C={ink:'#172A3A',muted:'#687873',orange:'#E87932',wood:'#C99765',paper:'#F5F1E8',rule:'#D9D9CF',blue:'#BCD2D7',green:'#D2DEBD'};
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
function box(c,x,y,w,h,col,r=5){c.fillStyle=col;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function txt(c,s,x,y,size=30,col=C.ink,bold=false){c.font=`${bold?700:400} ${size}px "Times New Roman", Times, serif`;c.fillStyle=col;c.textAlign='left';c.textBaseline='top';c.fillText(s,x,y);}
function line(c,x,y,xx,yy,col=C.ink,w=4){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke();}
function arrow(c,x,y,xx,yy,col=C.orange,w=6){line(c,x,y,xx,yy,col,w);const a=Math.atan2(yy-y,xx-x);line(c,xx,yy,xx-17*Math.cos(a-.5),yy-17*Math.sin(a-.5),col,w);line(c,xx,yy,xx-17*Math.cos(a+.5),yy-17*Math.sin(a+.5),col,w);}
function ring(c,x,y,r,col=C.orange,w=5){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();}
function badge(c,s,x,y,w=220){box(c,x,y,w,48,C.ink);txt(c,s,x+15,y+11,24,'#FFFFFF',true);}
function studs(c,x,y,w,h,n=6,insulation=false){box(c,x,y,w,h,insulation?C.green:'#E9E3D7');for(let i=0;i<n;i++)box(c,x+i*(w-20)/(n-1),y,20,h,C.wood,0);box(c,x,y,w,20,C.wood,0);box(c,x,y+h-20,w,20,C.wood,0);}
function home(c,x=1000,y=350,w=650,h=430){box(c,x,y,w,h,'#E9E3D7',0);c.fillStyle=C.ink;c.beginPath();c.moveTo(x-35,y);c.lineTo(x+w/2,y-170);c.lineTo(x+w+35,y);c.closePath();c.fill();box(c,x-20,y+h,w+40,35,C.muted);for(let i=0;i<6;i++)box(c,x+20+i*(w-40)/5,y+10,18,h-10,C.wood,0);box(c,x,y+190,w,22,C.wood,0);const dh=Math.min(160,h*.36);box(c,x+w*.43,y+h-dh,w*.16,dh,C.ink,0);}
function checklist(c,items,x=1010,y=310){items.forEach((s,i)=>{const yy=y+i*105;ring(c,x+25,yy+25,23,C.orange,3);line(c,x+13,yy+25,x+22,yy+34,C.orange,4);line(c,x+22,yy+34,x+38,yy+15,C.orange,4);txt(c,s,x+75,yy+2,36,C.ink,true);});}
function wall(c,continuous=false){const x=1000,y=330;const layers=[[55,'#A35B46'],[30,C.paper],[25,C.muted],[250,C.green],[30,C.paper]];let xx=x;for(const [w,col] of layers){box(c,xx,y,w,390,col,0);xx+=w+12;}box(c,x+146,y,42,390,C.wood,0);box(c,x+146+160,y,42,390,C.wood,0);if(continuous)box(c,x+97,y-12,30,414,C.blue,0);txt(c,'OUTSIDE',x-10,770,26,C.muted,true);txt(c,'INSIDE',xx-130,770,26,C.muted,true);return {x,y,xx};}
export function drawEpisodeGraphic(c,type,t,s={}){
 if(!EPISODE_GRAPHICS.includes(type))return false;
 c.save();txt(c,'AMERICAN STORIES',96,64,24,C.muted,true);box(c,96,111,72,5,C.orange,0);txt(c,s.diagramKicker||'HOW A HOUSE WORKS',96,158,27,C.muted,true);
 line(c,96,1004,1824,1004,C.rule,2);txt(c,s.diagramFooter||'ORIGINAL SIMPLIFIED ILLUSTRATION · NOT A CONSTRUCTION DRAWING',96,1025,20,C.muted);
 // A slow reveal is deterministic at any seek position.
 c.save();c.globalAlpha=.35+.65*smooth(t/.65);c.translate(0,(1-smooth(t/.65))*20);
 if(type==='history-joinery'){
  box(c,1050,285,115,500,C.wood,0);box(c,940,410,720,115,C.wood,0);box(c,1040,410,135,115,'#AD7A4D',0);box(c,1080,440,55,55,C.paper,0);ring(c,1105,467,95,C.orange,4);txt(c,'HEAVY TIMBERS',970,850,32,C.ink,true);txt(c,'Shaped connections',970,900,28,C.muted);
 }else if(type==='standard-parts'){
  for(let i=0;i<6;i++){box(c,960+i*30,280+i*75,650,36,C.wood,0);box(c,960+i*30,280+i*75,650,5,'#E6C59E',0);}for(let i=0;i<4;i++){line(c,1090+i*125,790,1090+i*125,875,C.ink,9);line(c,1075+i*125,790,1105+i*125,790,C.ink,9);}txt(c,'REPEATABLE PARTS + NAILS',1000,920,30,C.ink,true);
 }else if(type==='history-line'){
  line(c,1000,520,1750,520,C.rule,8);for(let i=0;i<3;i++){const xx=1030+i*340;ring(c,xx,520,18,C.orange,7);}txt(c,'1800s',965,410,60,C.ink,true);txt(c,'Today',1590,410,60,C.ink,true);txt(c,'Timbers',980,600,30);txt(c,'Light framing',1250,600,30);txt(c,'Platform',1590,600,30);txt(c,'Origins debated · Methods evolved',1000,760,32,C.muted);
 }else if(type==='platform-stack'){
  const y=370;studs(c,1080,y,560,220,6);studs(c,1080,y+245,560,220,6);box(c,1030,y+220,660,25,C.ink);box(c,1030,y+465,660,25,C.ink);arrow(c,1720,y+305,1720,y+225);txt(c,'FLOOR PLATFORM',1050,290,30,C.ink,true);txt(c,'One level supports the next',1040,900,30,C.muted);
 }else if(type==='supply-chain'){
  const labels=['MATERIALS','PEOPLE','TOOLS'];for(let i=0;i<3;i++){const xx=940+i*285;box(c,xx,340,245,265,'#FFFFFF',10);txt(c,String(i+1).padStart(2,'0'),xx+20,365,72,C.orange,true);txt(c,labels[i],xx+20,525,26,C.ink,true);if(i<2)arrow(c,xx+245,470,xx+280,470,C.ink,4);}line(c,1060,680,1630,680,C.orange,5);txt(c,'A FAMILIAR BUILDING SYSTEM',1000,750,31,C.ink,true);
 }else if(type==='cost-factors'||type==='project-cost'){
  const labels=type==='project-cost'?['SITE','LABOR','FRAME','SYSTEMS','FINISHES']:['DESIGN','LABOR','MATERIALS','LOCATION'];const n=labels.length;labels.forEach((v,i)=>{box(c,990,270+i*118,710,88,i===2?C.ink:'#FFFFFF');txt(c,v,1020,292+i*118,35,i===2?'#FFFFFF':C.ink,true);txt(c,'+',1630,282+i*118,50,i===2?C.orange:C.muted);});
 }else if(type==='wall-section'||type==='continuous-insulation'||type==='heat-bridge'){
  wall(c,type==='continuous-insulation');if(type==='heat-bridge'){for(let i=0;i<3;i++)arrow(c,940,400+i*120,1520,400+i*120,C.orange,7);badge(c,'HEAT FLOW',1115,855,200);}else if(type==='continuous-insulation'){line(c,1109,295,1109,250,C.ink,3);txt(c,'EXTERIOR INSULATION',980,205,32,C.ink,true);badge(c,'CONTINUOUS LAYER',1030,855,320);}else{badge(c,'LAYERS, DIFFERENT JOBS',970,850,430);}
 }else if(type==='veneer-support'){
  box(c,1030,300,110,480,'#A35B46',0);studs(c,1390,300,280,480,4);for(let i=0;i<3;i++){line(c,1135,390+i*130,1400,390+i*130,C.ink,7);ring(c,1280,390+i*130,22,C.orange,3);}box(c,980,785,760,40,C.muted);txt(c,'VENEER',1000,220,30,C.ink,true);txt(c,'FRAME',1435,220,30,C.ink,true);txt(c,'Anchors connect the layers',1040,890,32,C.muted);
 }else if(type==='advanced-frame'){
  studs(c,970,360,340,410,9,true);studs(c,1410,360,340,410,5,true);txt(c,'MORE MEMBERS',965,270,28,C.muted,true);txt(c,'PLANNED LAYOUT',1400,270,28,C.ink,true);txt(c,'Illustrative comparison — no spacing specified',960,865,26,C.muted);line(c,1450,815,1710,815,C.orange,7);
 }else if(type==='design-check'){
  box(c,1010,260,650,620,'#FFFFFF',8);box(c,1205,235,260,65,C.ink);checklist(c,['Designed for the building','Checked for local loads','Approved before changes'],1035,390);txt(c,'NO DIY STUD REMOVAL',1050,800,32,C.orange,true);
 }else if(type==='load-path'){
  home(c,1030,350,620,420);const progress=(t%5)/5;for(let i=0;i<3;i++){const yy=340+i*180;arrow(c,1730,yy,1730,yy+125,C.orange,7);}for(let i=0;i<3;i++){const yy=350+((progress+i/3)%1)*415;box(c,1050,yy,18,24,C.orange,2);}txt(c,'ROOF → WALLS → FOUNDATION',1000,900,31,C.ink,true);
 }else if(type==='connection-detail'){
  box(c,1000,450,710,65,C.wood,0);box(c,1310,280,65,490,C.wood,0);box(c,1270,407,145,145,C.ink,8);for(const x of [1295,1387])for(const y of [433,525]){ring(c,x,y,8,C.orange,4);}ring(c,1342,480,150,C.orange,4);txt(c,'THE CONNECTION MATTERS',1000,860,36,C.ink,true);
 }else if(type==='whole-system'){
  checklist(c,['Site hazards','Design + connections','Construction quality','Ongoing maintenance'],1010,320);
 }else if(type==='moisture'){
  studs(c,1100,300,520,470,6);const dy=(t%3)/3*200;for(let i=0;i<6;i++){const x=1080+i*115,y=240+dy+(i%2)*70;c.fillStyle=C.blue;c.beginPath();c.moveTo(x,y-20);c.quadraticCurveTo(x-24,y+15,x,y+23);c.quadraticCurveTo(x+24,y+15,x,y-20);c.fill();}box(c,1060,790,610,20,C.blue);txt(c,'MANAGE WATER EXPOSURE',1000,880,34,C.ink,true);
 }else if(type==='fire-exposure'){
  home(c,1080,400,520,365);box(c,1100,490,100,110,C.ink,0);line(c,1150,490,1150,600,C.paper,5);line(c,1100,545,1200,545,C.paper,5);box(c,1545,405,45,28,C.ink,0);const points=[[1340,235,'ROOF',1080,220],[1610,410,'VENTS',1650,350],[1090,530,'WINDOWS',880,560],[1620,770,'NEARBY FUELS',1480,850]];points.forEach(([x,y,label,lx,ly])=>{ring(c,x,y,25,C.orange,4);line(c,x,y,lx+50,ly+12,C.muted,2);box(c,lx-8,ly-5,label.length*18+16,38,C.paper,0);txt(c,label,lx,ly,25,C.ink,true);});for(let i=0;i<8;i++)box(c,1000+(i*113)%690,225+((i*71+t*35)%420),6,10,C.orange,2);txt(c,'EMBER ENTRY + SURROUNDING EXPOSURE',960,930,27,C.muted,true);
 }else if(type==='context'){
  box(c,1010,300,660,460,C.ink,12);txt(c,'ONE LABEL',1050,350,74,'#FFFFFF',true);line(c,1050,468,1600,468,C.orange,7);txt(c,'cannot describe',1050,520,48,'#FFFFFF');txt(c,'the whole building.',1050,590,48,'#FFFFFF');txt(c,'Evaluate the complete system',1010,840,34,C.muted);
 }else if(type==='three-reasons'){
  const labels=['HISTORY','PRACTICALITY','WALL ASSEMBLY'];labels.forEach((v,i)=>{box(c,1010,290+i*190,660,145,'#FFFFFF');txt(c,'0'+(i+1),1040,320+i*190,65,C.orange,true);txt(c,v,1170,340+i*190,35,C.ink,true);});
 }else if(type==='regional-choice'){
  const cells=[[0,1,1,1,1,0],[1,1,1,1,1,1],[0,1,1,1,1,0],[0,0,1,1,0,0]];cells.forEach((row,j)=>row.forEach((v,i)=>{if(v)box(c,990+i*120,360+j*105,98,83,(i+j)%3===0?C.orange:C.blue,5);}));txt(c,'REGIONAL CONDITIONS DIFFER',990,860,33,C.ink,true);txt(c,'Concept graphic · not a data map',990,915,27,C.muted);
 }else if(type==='end-card'){
  box(c,1030,300,610,470,C.ink,12);txt(c,'NOTICE',1080,350,83,'#FFFFFF',true);txt(c,'THE EVERYDAY.',1080,455,58,'#FFFFFF',true);line(c,1080,565,1570,565,C.orange,8);txt(c,'More stories behind',1080,620,36,'#FFFFFF');txt(c,'familiar things.',1080,670,36,'#FFFFFF');
 }
 c.restore();c.restore();return true;
}

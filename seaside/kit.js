/* AMEI 市集・走讀互動：共用插畫、貼紙與場景（剪貼簿、導覽、問答、問卷共用） */
const HAND='"LXGW WenKai TC","Kaiti TC",serif';
const rgba=(hex,a)=>{const n=parseInt(hex.slice(1),16);return`rgba(${n>>16},${n>>8&255},${n&255},${a})`};

/* ---------- drawing helpers ---------- */
function sketch(ctx,draw){draw(ctx);ctx.save();ctx.globalAlpha=.35;ctx.translate(1.4,-1);draw(ctx,true);ctx.restore();}
const rnd=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v)}; // deterministic
function fish(x,cx,cy,s,dir,col){
  x.save();x.translate(cx,cy);x.scale(dir*s,s);x.fillStyle=col;x.beginPath();x.moveTo(-20,0);x.bezierCurveTo(-8,-11,12,-11,20,0);x.bezierCurveTo(12,11,-8,11,-20,0);x.fill();
  x.beginPath();x.moveTo(-18,0);x.lineTo(-30,-9);x.lineTo(-27,0);x.lineTo(-30,9);x.closePath();x.fill();
  x.fillStyle='rgba(255,255,255,.8)';x.beginPath();x.arc(12,-2,1.8,0,7);x.fill();x.restore();
}
function bird(x,cx,cy,s,dir,col,ph=0){ // flying bird, wings flap with ph
  const f=Math.sin(ph)*9;x.save();x.translate(cx,cy);x.scale(dir*s,s);x.strokeStyle=col;x.fillStyle=col;x.lineWidth=3.2;x.lineCap='round';
  x.beginPath();x.moveTo(-22,-4-f);x.quadraticCurveTo(-10,-10-f*.6,0,0);x.quadraticCurveTo(10,-10-f*.6,22,-4-f);x.stroke();
  x.beginPath();x.ellipse(2,1,7,3,0,0,7);x.fill();x.restore();
}
function skyLantern(x,cx,cy,s,dir,col){
  x.save();x.translate(cx,cy);x.scale(s,s);
  const g=x.createRadialGradient(0,0,2,0,0,26);g.addColorStop(0,'rgba(255,214,120,.55)');g.addColorStop(1,'rgba(255,214,120,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,26,0,7);x.fill();
  x.fillStyle=col;x.beginPath();x.moveTo(-9,-13);x.lineTo(9,-13);x.lineTo(12,12);x.lineTo(-12,12);x.closePath();x.fill();
  x.fillStyle='rgba(255,240,190,.9)';x.fillRect(-5,6,10,4);x.restore();
}
function finishSticker(c){ // die-cut white border
  const o=document.createElement('canvas');o.width=o.height=220;const ox=o.getContext('2d');
  const w=document.createElement('canvas');w.width=w.height=220;const wx=w.getContext('2d');
  wx.drawImage(c,0,0);wx.globalCompositeOperation='source-in';wx.fillStyle='#fff';wx.fillRect(0,0,220,220);
  ox.shadowColor='rgba(28,40,50,.25)';ox.shadowBlur=6;ox.shadowOffsetY=2;
  for(let a=0;a<16;a++){const r=7;ox.drawImage(w,Math.cos(a/16*6.283)*r,Math.sin(a/16*6.283)*r);}
  ox.shadowColor='transparent';ox.drawImage(c,0,0);return o;
}
const horiz=(f,t,W)=>{const px=((f.x+f.v*t)%(W+80)+W+80)%(W+80)-40;return[f.d>0?px:W-px,f.y+Math.sin(t*2+f.p)*4]};

/* ---------- sticker art per template ---------- */
const ART={
 /* 茄萣海邊 */
 wuyu(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(30,112);x.bezierCurveTo(60,62,150,62,176,104);x.bezierCurveTo(150,150,64,150,30,112);
    if(!ghost){const g=x.createLinearGradient(0,70,0,150);g.addColorStop(0,'#5E7480');g.addColorStop(.6,'#9FB2B6');g.addColorStop(1,'#E9EEEA');x.fillStyle=g;x.fill();}x.stroke();
    x.beginPath();x.moveTo(174,104);x.lineTo(206,78);x.lineTo(198,108);x.lineTo(206,138);x.closePath();if(!ghost){x.fillStyle='#5E7480';x.fill()}x.stroke();
    x.beginPath();x.moveTo(98,74);x.quadraticCurveTo(112,52,132,76);x.stroke();});
  x.fillStyle=C.ink;x.beginPath();x.arc(56,104,6,0,7);x.fill();
  x.lineWidth=2.5;for(let i=0;i<4;i++){x.beginPath();x.arc(90+i*20,108,10,-1,1);x.stroke();}
  x.fillStyle=C.roe;x.beginPath();x.ellipse(110,174,34,12,-.1,0,7);x.fill();x.lineWidth=3;x.stroke();
 },
 pipi(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(118,120,52,34,-.2,0,7);if(!ghost){x.fillStyle='#FBFBF7';x.fill()}x.stroke();
    x.beginPath();x.moveTo(80,104);x.bezierCurveTo(64,70,74,46,92,42);x.stroke();
    x.beginPath();x.arc(96,44,15,0,7);if(!ghost){x.fillStyle='#FBFBF7';x.fill()}x.stroke();
    x.beginPath();x.moveTo(84,42);x.lineTo(30,58);x.stroke();});
  x.fillStyle=C.ink;x.beginPath();x.ellipse(28,60,10,7,-.3,0,7);x.fill();
  x.beginPath();x.moveTo(82,36);x.quadraticCurveTo(96,30,100,46);x.quadraticCurveTo(88,52,82,48);x.fill();
  x.fillStyle='#fff';x.beginPath();x.arc(93,41,2.6,0,7);x.fill();
  x.lineWidth=4;x.beginPath();x.moveTo(112,152);x.lineTo(108,198);x.moveTo(132,150);x.lineTo(138,198);x.stroke();
  x.strokeStyle=C.sea;x.lineWidth=3;x.beginPath();x.moveTo(70,200);x.quadraticCurveTo(100,190,130,200);x.quadraticCurveTo(160,210,184,198);x.stroke();
 },
 sampan(x,C){
  ['#C9A46A','#B78F55','#D6B57D','#BE9860'].forEach((col,i)=>{sketch(x,(x,ghost)=>{x.beginPath();x.roundRect(26,108+i*15,168,15,8);if(!ghost){x.fillStyle=col;x.fill()}x.lineWidth=3.5;x.stroke();});});
  x.lineWidth=3;x.strokeStyle=C.ink;[60,110,160].forEach(px=>{x.beginPath();x.moveTo(px,104);x.lineTo(px,172);x.stroke()});
  x.lineWidth=5;x.strokeStyle='#7A5A35';x.beginPath();x.moveTo(150,22);x.lineTo(96,196);x.stroke();
  x.strokeStyle=C.sea;x.lineWidth=3;for(let i=0;i<2;i++){x.beginPath();x.moveTo(20,188+i*14);x.quadraticCurveTo(70,176+i*14,110,188+i*14);x.quadraticCurveTo(150,200+i*14,200,186+i*14);x.stroke();}
 },
 mazu(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(24,128);x.lineTo(196,128);x.lineTo(172,170);x.lineTo(48,170);x.closePath();if(!ghost){x.fillStyle='#C6463A';x.fill()}x.stroke();
    x.beginPath();x.rect(80,98,64,30);if(!ghost){x.fillStyle='#F2E3BF';x.fill()}x.stroke();
    x.beginPath();x.moveTo(112,98);x.lineTo(112,30);x.stroke();
    x.beginPath();x.moveTo(112,32);x.lineTo(166,48);x.lineTo(112,66);x.closePath();if(!ghost){x.fillStyle=C.sun;x.fill()}x.stroke();});
  x.fillStyle='#C6463A';x.beginPath();x.moveTo(114,38);x.lineTo(150,48);x.lineTo(114,60);x.fill();
  x.fillStyle=C.sun;x.font='bold 22px '+HAND;x.textAlign='center';x.fillText('平安',112,158);
  x.strokeStyle=C.sea;x.lineWidth=3;x.beginPath();x.moveTo(14,186);x.quadraticCurveTo(60,172,110,186);x.quadraticCurveTo(160,200,206,184);x.stroke();
 },
 sunset(x,C){
  x.save();x.beginPath();x.rect(0,0,220,128);x.clip();
  sketch(x,(x,ghost)=>{x.beginPath();x.arc(110,128,58,0,7);if(!ghost){const g=x.createLinearGradient(0,70,0,128);g.addColorStop(0,'#F1B75A');g.addColorStop(1,'#E07A3F');x.fillStyle=g;x.fill()}x.stroke();});
  x.restore();
  x.strokeStyle=C.sun;x.lineWidth=4;for(let i=0;i<7;i++){const a=Math.PI+(i+.5)*Math.PI/7;x.beginPath();x.moveTo(110+Math.cos(a)*72,128+Math.sin(a)*72);x.lineTo(110+Math.cos(a)*92,128+Math.sin(a)*92);x.stroke();}
  x.lineWidth=5;x.strokeStyle=C.ink;x.beginPath();x.moveTo(16,130);x.lineTo(204,130);x.stroke();
  ['#E4A04A','#3D7585','#3D7585'].forEach((col,i)=>{x.strokeStyle=col;x.lineWidth=4;x.beginPath();x.moveTo(60-i*14,150+i*18);x.lineTo(160+i*14,150+i*18);x.stroke();});
 },
 /* 農村市集 */
 rice(x,C){
  [[-34,.9],[0,1],[34,.85]].forEach(([dx,k],j)=>{
    sketch(x,(x)=>{x.strokeStyle='#6B8E3A';x.lineWidth=5;x.beginPath();x.moveTo(110+dx*.3,206);x.quadraticCurveTo(100+dx,96,138+dx*.7,58);x.stroke();
      x.beginPath();x.moveTo(108+dx*.3,170);x.quadraticCurveTo(80+dx,150,70+dx,120);x.stroke();});
    for(let i=0;i<7;i++){const px=138+dx*.7+i*6.5*k,py=60+i*12*k;sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(px,py,10,6,1.1,0,7);if(!ghost){x.fillStyle=i%2?'#E9BE52':'#DDA93A';x.fill()}x.lineWidth=3;x.strokeStyle=C.ink;x.stroke();});}
  });
 },
 egret(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(122,122,50,30,-.25,0,7);if(!ghost){x.fillStyle='#FDFDF8';x.fill()}x.stroke();
    x.beginPath();x.moveTo(84,108);x.bezierCurveTo(60,84,96,62,82,44);x.stroke();
    x.beginPath();x.arc(84,42,13,0,7);if(!ghost){x.fillStyle='#FDFDF8';x.fill()}x.stroke();});
  x.fillStyle='#E2B54A';x.beginPath();x.moveTo(72,38);x.lineTo(30,46);x.lineTo(72,48);x.closePath();x.fill();x.lineWidth=2.5;x.stroke();
  x.fillStyle=C.ink;x.beginPath();x.arc(82,39,2.8,0,7);x.fill();
  x.lineWidth=4;x.strokeStyle=C.ink;x.beginPath();x.moveTo(118,150);x.lineTo(112,198);x.moveTo(138,148);x.lineTo(146,198);x.stroke();
  x.strokeStyle='#6B8E3A';x.lineWidth=4;[[60,206,52,176],[78,206,84,170],[170,206,164,172],[186,206,196,178]].forEach(([a,b,c,d])=>{x.beginPath();x.moveTo(a,b);x.quadraticCurveTo(a,d+10,c,d);x.stroke();});
 },
 hat(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(18,138);x.lineTo(110,52);x.lineTo(202,138);x.quadraticCurveTo(110,168,18,138);if(!ghost){x.fillStyle='#D9B26A';x.fill()}x.stroke();});
  x.strokeStyle='rgba(122,90,53,.75)';x.lineWidth=2.5;for(let i=1;i<8;i++){const ex=18+i*23;x.beginPath();x.moveTo(110,56);x.lineTo(ex,138+Math.sin(i/8*Math.PI)*16);x.stroke();}
  for(let r=1;r<4;r++){const k=r/4;x.beginPath();x.moveTo(110-92*k,56+82*k);x.quadraticCurveTo(110,56+82*k+28*k,110+92*k,56+82*k);x.stroke();}
  x.strokeStyle=C.roe;x.lineWidth=4;x.beginPath();x.moveTo(62,146);x.quadraticCurveTo(110,206,158,146);x.stroke();
 },
 veg(x,C){
  x.fillStyle='#5E9B48';[[70,92,26],[104,78,30],[140,90,26],[118,104,22]].forEach(([a,b,r])=>{sketch(x,(x,ghost)=>{x.beginPath();x.arc(a,b,r,0,7);if(!ghost){x.fillStyle='#6FA853';x.fill()}x.lineWidth=3.5;x.stroke();});});
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(150,70);x.lineTo(196,104);x.lineTo(160,110);x.closePath();if(!ghost){x.fillStyle='#E58A3A';x.fill()}x.lineWidth=3.5;x.stroke();});
  sketch(x,(x,ghost)=>{x.beginPath();x.arc(60,118,18,0,7);if(!ghost){x.fillStyle='#D9493A';x.fill()}x.lineWidth=3.5;x.stroke();});
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(26,118);x.lineTo(194,118);x.lineTo(174,194);x.lineTo(46,194);x.closePath();if(!ghost){x.fillStyle='#C08F52';x.fill()}x.lineWidth=5;x.stroke();});
  x.strokeStyle='rgba(90,60,30,.6)';x.lineWidth=2.5;for(let i=0;i<4;i++){x.beginPath();x.moveTo(32+i*2,136+i*16);x.lineTo(188-i*4,136+i*16);x.stroke();}
  for(let i=1;i<7;i++){x.beginPath();x.moveTo(26+i*24,120);x.lineTo(46+i*18.3,192);x.stroke();}
 },
 firefly(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.arc(110,110,86,0,7);if(!ghost){x.fillStyle='#24392A';x.fill()}x.lineWidth=4;x.stroke();});
  const g=x.createRadialGradient(118,130,4,118,130,50);g.addColorStop(0,'rgba(240,236,120,.95)');g.addColorStop(1,'rgba(240,236,120,0)');x.fillStyle=g;x.beginPath();x.arc(118,130,50,0,7);x.fill();
  x.fillStyle='rgba(220,235,230,.7)';x.beginPath();x.ellipse(92,92,22,11,-.6,0,7);x.fill();x.beginPath();x.ellipse(126,86,22,11,.6,0,7);x.fill();
  x.fillStyle='#2F3328';x.beginPath();x.ellipse(110,108,11,22,-.3,0,7);x.fill();x.fillStyle='#F4EE7A';x.beginPath();x.ellipse(118,130,10,12,-.3,0,7);x.fill();
  x.fillStyle='#F4EE7A';[[52,70],[160,62],[60,150],[166,150],[136,48]].forEach(([a,b],i)=>{x.beginPath();x.arc(a,b,3+i%2*2,0,7);x.fill();});
  x.strokeStyle='#6B8E3A';x.lineWidth=4;[[50,190,64,150],[80,196,76,160],[150,196,156,158]].forEach(([a,b,c,d])=>{x.beginPath();x.moveTo(a,b);x.quadraticCurveTo(a+4,d+12,c,d);x.stroke();});
 },
 /* 老街走讀 */
 arcade(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.rect(22,58,176,140);if(!ghost){x.fillStyle='#C25A40';x.fill()}x.lineWidth=5;x.stroke();
    x.beginPath();x.moveTo(14,58);x.lineTo(206,58);x.lineTo(196,40);x.lineTo(24,40);x.closePath();if(!ghost){x.fillStyle='#E9D9BE';x.fill()}x.stroke();
    x.beginPath();x.moveTo(84,40);x.quadraticCurveTo(110,14,136,40);if(!ghost){x.fillStyle='#E9D9BE';x.fill()}x.stroke();});
  [[34,62],[89,62],[144,62]].forEach(([a])=>{x.beginPath();x.moveTo(a,198);x.lineTo(a,138);x.arc(a+21,138,21,Math.PI,0);x.lineTo(a+42,198);x.fillStyle='#F2CF8E';x.fill();x.lineWidth=4;x.strokeStyle=C.ink;x.stroke();});
  x.strokeStyle='rgba(90,42,32,.45)';x.lineWidth=2;for(let r=0;r<4;r++){x.beginPath();x.moveTo(24,74+r*12);x.lineTo(196,74+r*12);x.stroke();}
  x.fillStyle='#F8EBD3';[[52,84],[110,84],[168,84]].forEach(([a,b])=>{x.fillRect(a-12,b-8,24,22);x.strokeRect(a-12,b-8,24,22);});
 },
 well(x,C){
  x.lineWidth=5;x.strokeStyle='#7A5A35';x.beginPath();x.moveTo(46,128);x.lineTo(46,40);x.moveTo(174,128);x.lineTo(174,40);x.stroke();
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(26,48);x.lineTo(110,18);x.lineTo(194,48);x.closePath();if(!ghost){x.fillStyle='#A84634';x.fill()}x.lineWidth=4;x.stroke();});
  x.strokeStyle=C.ink;x.lineWidth=2.5;x.beginPath();x.moveTo(110,44);x.lineTo(110,92);x.stroke();
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(98,92);x.lineTo(122,92);x.lineTo(118,114);x.lineTo(102,114);x.closePath();if(!ghost){x.fillStyle='#B98A4E';x.fill()}x.lineWidth=3;x.stroke();});
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(30,134);x.lineTo(30,192);x.ellipse(110,192,80,16,0,Math.PI,0,true);x.lineTo(190,134);if(!ghost){x.fillStyle='#B4ADA2';x.fill()}x.lineWidth=5;x.stroke();
    x.beginPath();x.ellipse(110,134,80,18,0,0,7);if(!ghost){x.fillStyle='#4E6A6E';x.fill()}x.stroke();});
  x.strokeStyle='rgba(60,50,40,.4)';x.lineWidth=2;for(let r=0;r<3;r++){x.beginPath();x.moveTo(32,156+r*14);x.quadraticCurveTo(110,170+r*14,188,156+r*14);x.stroke();}
 },
 sign(x,C){
  x.strokeStyle=C.ink;x.lineWidth=3;x.beginPath();x.moveTo(60,58);x.lineTo(110,22);x.lineTo(160,58);x.stroke();
  sketch(x,(x,ghost)=>{x.beginPath();x.roundRect(18,58,184,92,6);if(!ghost){x.fillStyle='#3A2A24';x.fill()}x.lineWidth=5;x.stroke();});
  x.strokeStyle='#D9A13E';x.lineWidth=2.5;x.strokeRect(28,68,164,72);
  x.fillStyle='#E7B65A';x.font='700 44px '+HAND;x.textAlign='center';x.textBaseline='middle';x.fillText('百年老店',110,106);
  x.fillStyle='#C25A40';x.beginPath();x.roundRect(150,154,40,40,4);x.fill();x.fillStyle='#F8EBD3';x.font='700 18px '+HAND;x.fillText('印',170,175);
 },
 kueh(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(110,124,96,62,-.08,0,7);if(!ghost){x.fillStyle='#5E8C4A';x.fill()}x.lineWidth=4;x.stroke();});
  x.strokeStyle='rgba(30,60,30,.5)';x.lineWidth=2;x.beginPath();x.moveTo(20,132);x.lineTo(200,114);x.stroke();
  sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(110,118,66,48,-.08,0,7);if(!ghost){x.fillStyle='#CC4637';x.fill()}x.lineWidth=5;x.stroke();});
  x.strokeStyle='rgba(255,220,200,.75)';x.lineWidth=3;
  const hex=(cx,cy,r)=>{x.beginPath();for(let i=0;i<6;i++){const a=i/6*6.283+.5;x[i?'lineTo':'moveTo'](cx+Math.cos(a)*r,cy+Math.sin(a)*r)}x.closePath();x.stroke();};
  hex(110,116,16);[[82,104],[138,104],[82,132],[138,132],[110,88],[110,146]].forEach(([a,b])=>hex(a,b,11));
  x.fillStyle='#F4D9A0';x.font='700 18px '+HAND;x.textAlign='center';x.fillText('壽',110,122);
 },
 lantern(x,C){
  x.strokeStyle=C.ink;x.lineWidth=3;x.beginPath();x.moveTo(110,8);x.lineTo(110,34);x.stroke();
  sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(110,112,70,74,0,0,7);if(!ghost){const g=x.createRadialGradient(96,96,10,110,112,80);g.addColorStop(0,'#F06A4F');g.addColorStop(1,'#B42F25');x.fillStyle=g;x.fill()}x.lineWidth=5;x.stroke();});
  x.strokeStyle='rgba(80,20,15,.45)';x.lineWidth=2.5;[-.55,-.28,0,.28,.55].forEach(k=>{x.beginPath();x.ellipse(110,112,Math.abs(k)*120+2,74,0,0,7);x.stroke();});
  x.fillStyle='#D9A13E';x.strokeStyle=C.ink;x.lineWidth=3.5;x.beginPath();x.roundRect(78,30,64,16,4);x.fill();x.stroke();x.beginPath();x.roundRect(78,178,64,16,4);x.fill();x.stroke();
  x.strokeStyle='#D9A13E';x.lineWidth=3;for(let i=0;i<5;i++){x.beginPath();x.moveTo(98+i*6,194);x.lineTo(96+i*7,214);x.stroke();}
  x.fillStyle='#F7D27A';x.font='700 54px '+HAND;x.textAlign='center';x.textBaseline='middle';x.fillText('福',110,114);
 },
 /* 社區燈節 */
 drum(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(36,82);x.lineTo(36,160);x.ellipse(110,160,74,22,0,Math.PI,0,true);x.lineTo(184,82);if(!ghost){x.fillStyle='#C2463A';x.fill()}x.lineWidth=5;x.stroke();
    x.beginPath();x.ellipse(110,82,74,22,0,0,7);if(!ghost){x.fillStyle='#F2E3BF';x.fill()}x.stroke();});
  x.fillStyle='#F0B43C';for(let i=0;i<9;i++){const a=Math.PI*(i/8);x.beginPath();x.arc(110-Math.cos(a)*72,96+Math.sin(a)*20,4,0,7);x.fill();}
  x.strokeStyle='#7A5A35';x.lineWidth=7;x.beginPath();x.moveTo(60,30);x.lineTo(120,78);x.moveTo(170,22);x.lineTo(118,74);x.stroke();
  x.fillStyle=C.roe;x.beginPath();x.arc(60,30,10,0,7);x.fill();x.beginPath();x.arc(170,22,10,0,7);x.fill();
 },
 pinwheel(x,C){
  x.strokeStyle='#7A5A35';x.lineWidth=6;x.beginPath();x.moveTo(110,104);x.lineTo(118,210);x.stroke();
  const cols=['#E8574A','#F0B43C','#3E8FB0','#5FAE6E'];
  for(let i=0;i<4;i++){x.save();x.translate(110,100);x.rotate(i*Math.PI/2+.3);sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(0,0);x.lineTo(0,-78);x.quadraticCurveTo(52,-60,54,-6);x.closePath();if(!ghost){x.fillStyle=cols[i];x.fill()}x.lineWidth=4;x.strokeStyle=C.ink;x.stroke();});x.restore();}
  x.fillStyle=C.sun;x.beginPath();x.arc(110,100,10,0,7);x.fill();x.lineWidth=3;x.stroke();
 },
 tanghulu(x,C){
  x.strokeStyle='#B98A4E';x.lineWidth=6;x.beginPath();x.moveTo(150,14);x.lineTo(60,212);x.stroke();
  for(let i=0;i<5;i++){const cx=140-i*19,cy=36+i*36;sketch(x,(x,ghost)=>{x.beginPath();x.arc(cx,cy,22,0,7);if(!ghost){const g=x.createRadialGradient(cx-7,cy-8,3,cx,cy,24);g.addColorStop(0,'#FF8A6A');g.addColorStop(1,'#C2302A');x.fillStyle=g;x.fill()}x.lineWidth=4;x.strokeStyle=C.ink;x.stroke();});
    x.fillStyle='rgba(255,255,255,.75)';x.beginPath();x.ellipse(cx-8,cy-9,6,3.5,-.6,0,7);x.fill();}
 },
 lotus(x,C){
  const g=x.createRadialGradient(110,120,6,110,120,80);g.addColorStop(0,'rgba(255,214,120,.8)');g.addColorStop(1,'rgba(255,214,120,0)');x.fillStyle=g;x.beginPath();x.arc(110,120,80,0,7);x.fill();
  [[-1.1,'#E37E93'],[1.1,'#E37E93'],[-.6,'#EE9BAB'],[.6,'#EE9BAB'],[0,'#F6B8C3']].forEach(([a,col])=>{x.save();x.translate(110,160);x.rotate(a);sketch(x,(x,ghost)=>{x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(-30,-50,0,-104);x.quadraticCurveTo(30,-50,0,0);if(!ghost){x.fillStyle=col;x.fill()}x.lineWidth=4;x.strokeStyle=C.ink;x.stroke();});x.restore();});
  sketch(x,(x,ghost)=>{x.beginPath();x.ellipse(110,170,70,16,0,0,7);if(!ghost){x.fillStyle='#5FAE6E';x.fill()}x.lineWidth=4;x.stroke();});
 },
 firework(x,C){
  sketch(x,(x,ghost)=>{x.beginPath();x.arc(110,110,90,0,7);if(!ghost){x.fillStyle='#1E2148';x.fill()}x.lineWidth=4;x.stroke();});
  [[110,100,62,'#F0B43C',14],[70,140,34,'#E8574A',10],[156,146,30,'#7FD3E8',10]].forEach(([cx,cy,r,col,n])=>{x.strokeStyle=col;x.lineWidth=4;x.lineCap='round';
    for(let i=0;i<n;i++){const a=i/n*6.283;x.beginPath();x.moveTo(cx+Math.cos(a)*r*.3,cy+Math.sin(a)*r*.3);x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);x.stroke();
      x.fillStyle=col;x.beginPath();x.arc(cx+Math.cos(a)*(r+7),cy+Math.sin(a)*(r+7),3,0,7);x.fill();}});
 }
};

/* ---------- scenes per template ---------- */
const SCENE={
 sea:{
  draw(x,W,H,t,still,C){
    const hz=H*.48;
    let g=x.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#8FB3BC');g.addColorStop(.6,'#E9C892');g.addColorStop(1,'#EFA866');x.fillStyle=g;x.fillRect(0,0,W,hz);
    x.fillStyle='#F2B460';x.beginPath();x.arc(W*.62,hz,W*.11,Math.PI,0);x.fill();
    g=x.createLinearGradient(0,hz,0,H);g.addColorStop(0,'#5D8E98');g.addColorStop(1,C.deep);x.fillStyle=g;x.fillRect(0,hz,W,H-hz);
    x.globalAlpha=.55;x.fillStyle='#F6C379';for(let i=0;i<9;i++){const w=W*(.2-i*.018),y=hz+12+i*i*5;x.fillRect(W*.62-w/2,y,w,3+i*.4);}x.globalAlpha=1;
    x.strokeStyle='rgba(233,242,239,.35)';x.lineWidth=Math.max(2,W/400);
    for(let r=0;r<6;r++){const y=hz+(H-hz)*(.18+r*.15);x.beginPath();for(let px=0;px<=W;px+=W/40){const yy=y+Math.sin(px/W*12+t*1.4+r)*W*.008;px?x.lineTo(px,yy):x.moveTo(px,yy);}x.stroke();}
    if(still){x.fillStyle='#2D4650';x.fillRect(0,H*.84,W,H*.16);x.fillStyle='#3B5A63';for(let i=0;i<5;i++)x.fillRect(i*W*.22,H*.82,W*.16,H*.03);}
  },
  anim(x,W,H,t,C,M){
    let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#E9B66E');g.addColorStop(.28,'#7FA6AE');g.addColorStop(.3,'#4B7F8B');g.addColorStop(1,C.deep);x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle='#F3BC63';x.beginPath();x.arc(W*.78,H*.29,26,Math.PI,0);x.fill();
    M.forEach(f=>{const[px,py]=horiz(f,t,W);fish(x,px,py,f.s,f.d,f.c);});
    x.strokeStyle='rgba(233,242,239,.4)';x.lineWidth=2;
    for(let r=0;r<4;r++){const y=H*.3+r*H*.18;x.beginPath();for(let px=0;px<=W;px+=8){const yy=y+Math.sin(px/38+t*1.6+r*1.3)*4;px?x.lineTo(px,yy):x.moveTo(px,yy);}x.stroke();}
  },
  movers:(W,H)=>Array.from({length:9},(_,i)=>({x:Math.random()*W,y:H*.42+Math.random()*H*.48,v:14+Math.random()*22,s:.6+Math.random()*.6,d:i%3?1:-1,p:Math.random()*6,c:['#A9C9C6','#E4A04A','#D7E4DF','#8DB3B8'][i%4]})),
  band(x,W,H,sy,C,CV){
    let g=x.createLinearGradient(0,sy,0,H);g.addColorStop(0,'#5D8E98');g.addColorStop(1,C.deep);
    x.fillStyle=g;x.beginPath();x.moveTo(0,sy);for(let px=0;px<=W;px+=20)x.lineTo(px,sy+Math.sin(px/70)*14);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
    x.strokeStyle='rgba(233,242,239,.35)';x.lineWidth=4;for(let r=1;r<4;r++){x.beginPath();for(let px=0;px<=W;px+=20){const yy=sy+r*110+Math.sin(px/60+r)*10;px?x.lineTo(px,yy):x.moveTo(px,yy)}x.stroke();}
    [[110,1640,1.8,1,'#E4A04A'],[220,1600,1.2,1,'#A9C9C6'],[960,1860,1.8,-1,'#D7E4DF'],[1000,1610,1.3,-1,'#E4A04A'],[70,1870,1.1,1,'#8DB3B8']].forEach(f=>fish(x,f[0],f[1],f[2],f[3],f[4]));
  },
  cover(x,C,CV){[[180,470,1.6,1,'#E4A04A'],[300,520,1.1,1,'#D7E4DF'],[620,500,1.4,-1,'#A9C9C6'],[700,550,1,-1,'#E4A04A']].forEach(f=>fish(x,...f));x.drawImage(CV.pipi,560,150,170,170);},
  item(C){
    const c=document.createElement('canvas');c.width=90;c.height=180;const x=c.getContext('2d');x.lineWidth=4;x.strokeStyle=C.ink;x.lineJoin='round';
    x.beginPath();x.moveTo(36,10);x.lineTo(54,10);x.lineTo(54,46);x.quadraticCurveTo(80,60,80,90);x.lineTo(80,160);x.quadraticCurveTo(80,172,66,172);x.lineTo(24,172);x.quadraticCurveTo(10,172,10,160);x.lineTo(10,90);x.quadraticCurveTo(10,60,36,46);x.closePath();
    x.fillStyle='rgba(190,226,222,.85)';x.fill();x.stroke();
    x.fillStyle='#B78F55';x.fillRect(34,4,22,14);x.strokeRect(34,4,22,14);
    x.save();x.translate(45,118);x.rotate(.15);x.fillStyle='#F8F2DF';x.fillRect(-20,-30,40,60);x.strokeStyle=C.roe;x.lineWidth=2;x.beginPath();for(let i=0;i<4;i++){x.moveTo(-13,-18+i*12);x.lineTo(13,-18+i*12)}x.stroke();x.restore();
    return c;
  },itemW:42
 },
 farm:{
  draw(x,W,H,t,still,C){
    const hz=H*.46;
    let g=x.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#A9CFE0');g.addColorStop(.7,'#F1E4B8');g.addColorStop(1,'#F4D58C');x.fillStyle=g;x.fillRect(0,0,W,hz);
    x.fillStyle='#F4C55A';x.beginPath();x.arc(W*.72,hz*.62,W*.075,0,7);x.fill();
    x.fillStyle='#93B098';x.beginPath();x.moveTo(0,hz);for(let px=0;px<=W;px+=W/30)x.lineTo(px,hz-H*.07-Math.sin(px/W*5)*H*.045-Math.sin(px/W*13+1)*H*.015);x.lineTo(W,hz);x.closePath();x.fill();
    x.fillStyle='#6E8F70';x.beginPath();x.moveTo(0,hz);for(let px=0;px<=W;px+=W/30)x.lineTo(px,hz-H*.025-Math.sin(px/W*7+2)*H*.02);x.lineTo(W,hz);x.closePath();x.fill();
    g=x.createLinearGradient(0,hz,0,H);g.addColorStop(0,'#C8CF62');g.addColorStop(.5,'#9DB54C');g.addColorStop(1,'#5B7F3A');x.fillStyle=g;x.fillRect(0,hz,W,H-hz);
    x.lineWidth=Math.max(2,W/320);
    for(let r=0;r<10;r++){const y=hz+(H-hz)*Math.pow((r+1)/11,1.5);x.strokeStyle=r%2?'rgba(51,80,42,.32)':'rgba(240,220,120,.35)';x.beginPath();for(let px=0;px<=W;px+=W/40){const yy=y+Math.sin(px/W*9+t*1.3+r)*W*.004*(1+r*.4);px?x.lineTo(px,yy):x.moveTo(px,yy);}x.stroke();}
    x.strokeStyle='rgba(226,190,80,.7)';x.lineWidth=Math.max(1.5,W/500);
    for(let i=0;i<70;i++){const px=rnd(i)*W,k=rnd(i+99),py=hz+(H-hz)*(.08+k*.9),h=W*.012*(.5+k*1.5),sw=Math.sin(t*1.5+i)*h*.3;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px,py-h*.6,px+sw+h*.3,py-h);x.stroke();}
    if(still){x.fillStyle='#8C6A44';x.beginPath();x.moveTo(W*.38,H);x.lineTo(W*.5,hz+(H-hz)*.25);x.lineTo(W*.56,hz+(H-hz)*.25);x.lineTo(W*.72,H);x.closePath();x.fill();}
  },
  anim(x,W,H,t,C,M){this.draw(x,W,H,t,false,C);M.forEach(f=>{const[px,py]=horiz(f,t,W);bird(x,px,py,f.s,f.d,f.c,t*6+f.p);});},
  movers:(W,H)=>Array.from({length:6},(_,i)=>({x:Math.random()*W,y:H*.1+Math.random()*H*.3,v:18+Math.random()*16,s:.7+Math.random()*.4,d:i%3?1:-1,p:Math.random()*6,c:'#FDFDF8'})),
  band(x,W,H,sy,C,CV){
    let g=x.createLinearGradient(0,sy,0,H);g.addColorStop(0,'#A9BE52');g.addColorStop(1,C.deep);
    x.fillStyle=g;x.beginPath();x.moveTo(0,sy);for(let px=0;px<=W;px+=20)x.lineTo(px,sy+Math.sin(px/90)*12);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
    x.strokeStyle='rgba(240,220,120,.4)';x.lineWidth=4;for(let r=1;r<4;r++){x.beginPath();for(let px=0;px<=W;px+=20){const yy=sy+r*100+Math.sin(px/80+r)*8;px?x.lineTo(px,yy):x.moveTo(px,yy)}x.stroke();}
    [[120,1600,2.2,1,1],[240,1640,1.5,1,3],[930,1600,2,-1,2],[1010,1660,1.4,-1,4]].forEach(f=>bird(x,f[0],f[1],f[2],f[3],'#FDFDF8',f[4]));
  },
  cover(x,C,CV){[[150,120,1.8,1,1],[280,90,1.3,1,3],[400,140,1.1,1,5]].forEach(f=>bird(x,f[0],f[1],f[2],f[3],'#FDFDF8',f[4]));x.drawImage(CV.egret,570,300,190,190);},
  item(C){ // paper plane
    const c=document.createElement('canvas');c.width=160;c.height=110;const x=c.getContext('2d');x.lineJoin='round';x.lineWidth=4;x.strokeStyle=C.ink;
    x.beginPath();x.moveTo(8,52);x.lineTo(152,10);x.lineTo(70,70);x.closePath();x.fillStyle='#FBF9F0';x.fill();x.stroke();
    x.beginPath();x.moveTo(70,70);x.lineTo(152,10);x.lineTo(92,100);x.closePath();x.fillStyle='#E6E0C8';x.fill();x.stroke();
    x.beginPath();x.moveTo(70,70);x.lineTo(80,88);x.stroke();return c;
  },itemW:56
 },
 street:{
  draw(x,W,H,t,still,C){
    let g=x.createLinearGradient(0,0,0,H*.6);g.addColorStop(0,'#9CC0CF');g.addColorStop(.55,'#F3D3A4');g.addColorStop(1,'#EBA67A');x.fillStyle=g;x.fillRect(0,0,W,H);
    const top=H*.3,bot=H*.8,n=4,fw=W/n;
    const bricks=['#B5523C','#C46A4E','#A84634','#BD5E45'];
    for(let i=0;i<n;i++){const fx=i*fw,ft=top+(i%2?H*.05:0);
      x.fillStyle=bricks[i];x.fillRect(fx,ft,fw+1,bot-ft);
      x.fillStyle='#E9D9BE';x.fillRect(fx,ft-H*.03,fw+1,H*.03);x.beginPath();x.moveTo(fx+fw*.3,ft-H*.03);x.quadraticCurveTo(fx+fw*.5,ft-H*.09,fx+fw*.7,ft-H*.03);x.fill();
      x.fillStyle='#F8EBD3';for(let k=0;k<2;k++)x.fillRect(fx+fw*(.2+k*.38),ft+H*.06,fw*.22,H*.08);
      x.fillStyle=i%2?'#F2CF8E':'#5A2A20';const aw=fw*.32,ah=(bot-ft)*.42;
      for(let k=0;k<2;k++){const ax=fx+fw*(.12+k*.44);x.beginPath();x.moveTo(ax,bot);x.lineTo(ax,bot-ah+aw/2);x.arc(ax+aw/2,bot-ah+aw/2,aw/2,Math.PI,0);x.lineTo(ax+aw,bot);x.fill();}
      x.strokeStyle='rgba(90,42,32,.4)';x.lineWidth=Math.max(1,W/500);x.strokeRect(fx,ft,fw,bot-ft);}
    x.fillStyle='#CDB8A3';x.fillRect(0,bot,W,H-bot);
    x.strokeStyle='rgba(120,90,70,.35)';x.lineWidth=Math.max(1.5,W/400);for(let r=0;r<4;r++){const y=bot+(H-bot)*(.2+r*.22);x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke();}
    // lantern string
    x.strokeStyle='rgba(58,42,36,.7)';x.lineWidth=Math.max(1.5,W/400);x.beginPath();x.moveTo(0,H*.12);x.quadraticCurveTo(W/2,H*.24,W,H*.12);x.stroke();
    for(let i=1;i<6;i++){const u=i/6,lx=u*W,ly=H*.12+(1-Math.pow(2*u-1,2))*H*.06+H*.02,sw=Math.sin(t*1.6+i)*W*.004,r=W*.022;
      x.fillStyle='#D8412F';x.beginPath();x.ellipse(lx+sw,ly+r,r*.85,r,0,0,7);x.fill();x.fillStyle='#E7B65A';x.fillRect(lx+sw-r*.4,ly-r*.05,r*.8,r*.18);x.fillRect(lx+sw-r*.4,ly+r*1.9,r*.8,r*.18);}
    if(still){x.fillStyle='rgba(58,42,36,.25)';x.fillRect(0,H*.9,W,H*.1);}
  },
  anim(x,W,H,t,C,M){this.draw(x,W,H,t,false,C);M.forEach(f=>{const[px,py]=horiz(f,t,W);bird(x,px,py,f.s,f.d,f.c,t*9+f.p);});},
  movers:(W,H)=>Array.from({length:5},(_,i)=>({x:Math.random()*W,y:H*.04+Math.random()*H*.2,v:30+Math.random()*20,s:.5+Math.random()*.3,d:i%2?1:-1,p:Math.random()*6,c:'#3A2A24'})),
  band(x,W,H,sy,C,CV){
    x.fillStyle='#8E3B2C';x.beginPath();x.moveTo(0,sy);for(let px=0;px<=W;px+=W/8){x.lineTo(px,sy);x.lineTo(px,sy+(px/(W/8)%2?30:0));}x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
    x.fillStyle=C.deep;x.fillRect(0,sy+40,W,H-sy-40);
    x.strokeStyle='rgba(248,235,211,.15)';x.lineWidth=3;for(let r=0;r<6;r++){x.beginPath();x.moveTo(0,sy+70+r*55);x.lineTo(W,sy+70+r*55);x.stroke();for(let k=0;k<12;k++){const bx=(k+(r%2)*.5)*W/11;x.beginPath();x.moveTo(bx,sy+70+r*55);x.lineTo(bx,sy+125+r*55);x.stroke();}}
    [[90,1640],[990,1640],[150,1880],[940,1880]].forEach(([a,b])=>{x.drawImage(CV.lantern,a-55,b-60,110,110);});
  },
  cover(x,C,CV){[[120,60,1.2,1,1],[230,40,.9,1,3]].forEach(f=>bird(x,f[0],f[1],f[2],f[3],'#3A2A24',f[4]));x.drawImage(CV.lantern,600,150,150,150);},
  item(C){ // postcard
    const c=document.createElement('canvas');c.width=150;c.height=110;const x=c.getContext('2d');x.lineWidth=4;x.strokeStyle=C.ink;x.lineJoin='round';
    x.fillStyle='#FBF7F1';x.beginPath();x.rect(6,10,138,92);x.fill();x.stroke();
    x.beginPath();x.moveTo(6,10);x.lineTo(75,62);x.lineTo(144,10);x.stroke();
    x.fillStyle='#C25A40';x.beginPath();x.arc(75,62,13,0,7);x.fill();x.stroke();return c;
  },itemW:52
 },
 lantern:{
  draw(x,W,H,t,still,C){
    let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#141634');g.addColorStop(.6,'#2E3778');g.addColorStop(1,'#4A4F92');x.fillStyle=g;x.fillRect(0,0,W,H);
    for(let i=0;i<60;i++){const a=.35+.65*Math.abs(Math.sin(t*1.5+i));x.fillStyle=`rgba(255,250,220,${a*.8})`;x.beginPath();x.arc(rnd(i)*W,rnd(i+50)*H*.55,Math.max(1,W/500)*(1+rnd(i+7)),0,7);x.fill();}
    x.fillStyle='#F6E7B8';x.beginPath();x.arc(W*.78,H*.16,W*.05,0,7);x.fill();x.fillStyle='#2A3170';x.beginPath();x.arc(W*.8,H*.15,W*.045,0,7);x.fill();
    // temple roofs
    const rb=H*.72;x.fillStyle='#14122A';
    x.beginPath();x.moveTo(-W*.05,rb);x.quadraticCurveTo(W*.02,rb-H*.08,W*.06,rb-H*.11);x.lineTo(W*.4,rb-H*.11);x.quadraticCurveTo(W*.44,rb-H*.08,W*.5,rb-H*.12);x.lineTo(W*.5,rb);x.fill();
    x.beginPath();x.moveTo(W*.42,rb);x.quadraticCurveTo(W*.48,rb-H*.12,W*.54,rb-H*.17);x.lineTo(W*.9,rb-H*.17);x.quadraticCurveTo(W*.96,rb-H*.12,W*1.05,rb-H*.2);x.lineTo(W*1.05,rb);x.fill();
    x.fillRect(0,rb-2,W,H-rb+2);
    x.strokeStyle='rgba(240,180,60,.7)';x.lineWidth=Math.max(1.5,W/400);x.beginPath();x.moveTo(0,rb-H*.02);x.quadraticCurveTo(W/2,rb+H*.05,W,rb-H*.02);x.stroke();
    for(let i=1;i<9;i++){const u=i/9,lx=u*W,ly=rb-H*.02+(1-Math.pow(2*u-1,2))*H*.035+H*.012,r=W*.016;const gl=x.createRadialGradient(lx,ly,1,lx,ly,r*3);gl.addColorStop(0,'rgba(255,200,90,.55)');gl.addColorStop(1,'rgba(255,200,90,0)');x.fillStyle=gl;x.beginPath();x.arc(lx,ly,r*3,0,7);x.fill();x.fillStyle=i%2?'#E8574A':'#F0B43C';x.beginPath();x.ellipse(lx,ly,r*.8,r,0,0,7);x.fill();}
    if(still){x.fillStyle='rgba(255,200,90,.12)';x.fillRect(0,H*.86,W,H*.14);}
  },
  anim(x,W,H,t,C,M){this.draw(x,W,H,t,false,C);M.forEach(f=>{const cy=H+30-((f.y+f.v*t)%(H+60));skyLantern(x,f.x+Math.sin(t+f.p)*8,cy,f.s,1,f.c);});},
  movers:(W,H)=>Array.from({length:8},(_,i)=>({x:W*(.06+i/8*.9),y:Math.random()*H,v:10+Math.random()*10,s:.6+Math.random()*.5,p:Math.random()*6,c:['#E8574A','#F0B43C','#F28C5A'][i%3]})),
  band(x,W,H,sy,C,CV){
    x.fillStyle='#14122A';x.beginPath();x.moveTo(0,sy+40);x.quadraticCurveTo(W*.15,sy,W*.3,sy-10);x.lineTo(W*.7,sy-10);x.quadraticCurveTo(W*.85,sy,W,sy+40);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
    [[110,1660,2.6,'#E8574A'],[230,1880,2,'#F0B43C'],[960,1650,2.4,'#F0B43C'],[1000,1870,2,'#E8574A']].forEach(f=>skyLantern(x,f[0],f[1],f[2],1,f[3]));
  },
  cover(x,C,CV){[[120,400,1.8,'#E8574A'],[240,300,1.3,'#F0B43C'],[360,440,1.1,'#F28C5A']].forEach(f=>skyLantern(x,f[0],f[1],f[2],1,f[3]));x.drawImage(CV.firework,570,40,190,190);},
  item(C){
    const c=document.createElement('canvas');c.width=110;c.height=140;const x=c.getContext('2d');x.lineWidth=4;x.strokeStyle=C.ink;x.lineJoin='round';
    const g=x.createRadialGradient(55,70,6,55,70,60);g.addColorStop(0,'rgba(255,214,120,.7)');g.addColorStop(1,'rgba(255,214,120,0)');x.fillStyle=g;x.fillRect(0,0,110,140);
    x.fillStyle='#E8574A';x.beginPath();x.moveTo(28,14);x.lineTo(82,14);x.lineTo(94,112);x.lineTo(16,112);x.closePath();x.fill();x.stroke();
    x.fillStyle='#F7D27A';x.font='700 30px '+HAND;x.textAlign='center';x.fillText('願',55,74);
    x.fillStyle='#F0B43C';x.fillRect(40,114,30,10);x.strokeRect(40,114,30,10);return c;
  },itemW:46
 }
};

/* ---------- palettes ---------- */
const PAL={
 sea:{paper:'#E8EDE9',sheet:'#F8F8F2',ink:'#22313A',soft:'#5E6E73',sea:'#3D7585',deep:'#1C3F4B',sun:'#E4A04A',roe:'#B4613A',line:'#C9D3CF'},
 farm:{paper:'#EDEBDC',sheet:'#FBF9F0',ink:'#2F3328',soft:'#686C5A',sea:'#5B7F3A',deep:'#33502A',sun:'#E2A93B',roe:'#B5562F',line:'#D6D2BE'},
 street:{paper:'#EFE7DE',sheet:'#FBF7F1',ink:'#3A2A24',soft:'#76655C',sea:'#A2412F',deep:'#5A2A20',sun:'#D9A13E',roe:'#2F6B66',line:'#DCCFC3'},
 lantern:{paper:'#E7E5EF',sheet:'#F8F7FB',ink:'#25223A',soft:'#615D78',sea:'#3E4A8C',deep:'#1E2148',sun:'#F0B43C',roe:'#C2463A',line:'#CFCBDD'}
};
function applyPal(C){
  const r=document.documentElement.style;
  [['--paper',C.paper],['--sheet',C.sheet],['--ink',C.ink],['--ink-soft',C.soft],['--sea',C.sea],['--sea-deep',C.deep],['--sun',C.sun],['--roe',C.roe],['--line',C.line]].forEach(([k,v])=>r.setProperty(k,v));
  const m=document.querySelector('meta[name=theme-color]');if(m)m.content=C.paper;
}
function makeSticker(id,C){
  const c=document.createElement('canvas');c.width=c.height=220;const x=c.getContext('2d');
  x.lineCap=x.lineJoin='round';x.lineWidth=5;x.strokeStyle=C.ink;ART[id](x,C);return finishSticker(c);
}
function wrapText(x,text,maxW){const out=[];text.split('\n').forEach(par=>{let line='';for(const ch of par){if(x.measureText(line+ch).width>maxW&&line){out.push(line);line=ch}else line+=ch}out.push(line)});return out;}
function todayStr(){const d=new Date();return`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`}
function paperGround(x,W,H,C){x.fillStyle=C.paper;x.fillRect(0,0,W,H);x.fillStyle=rgba(C.ink,.035);for(let i=0;i<2600;i++)x.fillRect(Math.random()*W,Math.random()*H,2,2);}
function downloadURL(url,name){const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();}

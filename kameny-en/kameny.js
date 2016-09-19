pl=new Image(40,40);
pl.src="pl.gif";
sn=new Image(40,40);
sn.src="sn.gif";
mo=new Image(40,40);
mo.src="mo.gif";
ce=new Image(40,40);
ce.src="ce.gif";
var pole=new Array(36);
var pole1=new Array(36);
var pole2=new Array(36);
var bodytahu=new Array(12);
var pouzitetahy=new Array(12);
smerx=new initArray(1,1,1,0);
smery=new initArray(-1,0,1,1);
hrajeme=0;reaguj=1;ktpc=2;barvacloveka=1;sccl=0;scpc=0;startnticx=0;startnticy=0;smernticx=0;smernticy=0;
rt="rotate(-90deg)";

function initArray(){this.length=initArray.arguments.length;for(var i=0;i<this.length;i++){this[i]=initArray.arguments[i];}}

function NaSipce(kts)
{
 if((reaguj==1) && (hrajeme==0))
 {
  Reaguj(0);ZvyrazniSipku(kts,3-ktpc);TahDoPole(kts,3-ktpc);
  setTimeout("VykresliTah("+kts+")",700);setTimeout("TestujCtyri("+(3-ktpc)+")",900);setTimeout("HrajePocitac("+ktpc+")",1500);
 }
}

function HrajePocitac(ktk)
{
 if(hrajeme==0)
 {
  ktt=VymysliTah(ktk);TahDoPole(ktt,ktk);VynulujSipky();ZvyrazniSipku(ktt,ktk);
  setTimeout("VykresliTah("+ktt+")",700);setTimeout("TestujCtyri("+ktk+")",900);setTimeout("Reaguj(1)",1100);setTimeout("VynulujSipky()",1500);
 }
}

function Poradit(ktk){if(hrajeme==0){ktt=VymysliTah(ktk);ZvyrazniSipku(ktt,ktk);setTimeout("VynulujSipky()",1200);}}

function NovaHra()
{
 for(var i=0;i<6;i++){for(var j=0;j<6;j++){pole[j+6*i]=0;Zakresli(j,i,0);Disf(j+7*i,"invert(0%)");hrajeme=0;reaguj=1;}}
 VynulujSipky();
}

function ZacinaPocitac(){uz=0;for(var i=0;i<36;i++){if(pole[i]!=0){uz+=1;}}if(uz==0){HrajePocitac(ktpc);}}

function VymenitBarvy()
{
 barvacloveka=3-barvacloveka;if(barvacloveka==1){x=49;y=48;}else{x=48;y=49;}
 document.images[x].src=ce.src;document.images[y].src=mo.src;for(i=0;i<6;i++){for(j=0;j<6;j++){Zakresli(j,i);}}
}

function Disf(z,s){document.images[z].style.WebkitFilter=s;document.images[z].style.filter=s;}

function Zakresli(a,b)
{
 if(pole[a+6*b]==0){document.images[b*7+a].src=pl.src;}
 else
 {
  if(pole[a+6*b]==barvacloveka){document.images[b*7+a].src=ce.src;}
  else{document.images[b*7+a].src=mo.src;}
 }
}

function TestujCtyri(ktk)
{
 if(Ntice(3-ktk,4)>0){hrajeme=3-ktk;}
 if((Ntice(ktk,4)>0)&&(Ntice(3-ktk,4)==0)){hrajeme=ktk;}
 if(hrajeme!=0)
 {
  if(hrajeme==ktpc){scpc++;Sc(scpc,"cisla1");}else{sccl++;Sc(sccl,"cisla2");}
  for(var k=0;k<4;k++){Disf(startnticx+k*smernticx+7*(startnticy+k*smernticy),"invert(20%)");}
 }
}

function Sc(sc,csx){a=Mf(sc/100);b=Mf((sc-100*a)/10);c=sc-10*b-100*a;document.getElementById(csx).innerHTML=""+a+b+c;}

function Mf(r){f=Math.floor(r);return f;}

function Reaguj(xx){if(hrajeme==0){reaguj=xx;}}

function Ntice(ktk,kolik)
{
 celkemntic=0;
 for(var iy=0;iy<6;iy++)
 {
  for(var ix=0;ix<6;ix++)
  {
   if(pole[ix+iy*6]==ktk)
   {
    for(var j=0;j<4;j++)
    {
     kk=kolik-1;
     if((ix+kk*smerx[j]>=0) && (ix+kk*smerx[j]<6) && (iy+kk*smery[j]>=0) && (iy+kk*smery[j]<6))
     {
      jetam=1;
      for(var k=1;k<kolik;k++){if(pole[(ix+k*smerx[j])+6*(iy+k*smery[j])]!=ktk){jetam=0;}}
      if(jetam==1){celkemntic+=1;startnticx=ix;startnticy=iy;smernticx=smerx[j];smernticy=smery[j];}
 }}}}}
 return celkemntic;
}

function ObodujPole(km)
{
 b=10*Ntice(km,2)-30*Ntice(3-km,2);
 b+=200*Ntice(km,3)-400*Ntice(3-km,3);
 b+=4000*Ntice(km,4)-8000*Ntice(3-km,4);return b;
}

function TahDoPole(tah,ktk)
{
 if(tah<6){ix=tah;for(var iy=0;iy<5;iy++){pole[ix+iy*6]=pole[ix+6*(iy+1)];}pole[ix+30]=ktk;}
 else{iy=tah-6;for(var ix=0;ix<5;ix++){pole[ix+6*iy]=pole[ix+1+6*iy];}pole[5+6*iy]=ktk;}
}

function NakresliPlochu()
{
  for(var i=0;i<36;i++){pole[i]=0;}
  s="";s1=" src='' class='a' onClick='NaSipce(";
  for(var iy=0;iy<6;iy++)
  {
   tahiy=iy+6;
   for(var ix=0;ix<6;ix++){s+="<img src=''>";}
   s+="<img style='transform:"+rt+"' "+s1;s+=tahiy;s+=")'><br>\n";
  }
  for(var ix=0;ix<6;ix++){s+="<img"+s1;s+=ix;s+=")'>";}
  document.write(s);
}

function VykresliTah(kt)
{
 if(kt<6){ix=kt;for(var iy=0;iy<6;iy++){Zakresli(ix,iy);}}
 else{iy=kt-6;for(var ix=0;ix<6;ix++){Zakresli(ix,iy);}}
}

function ZvyrazniSipku(ktt)
{
 if(ktt<6){x2=42+ktt;}else{x2=6+(ktt-6)*7;document.images[x2].style.transform=rt;}
 Disf(x2,"invert(80%)");
}

function VynulujSipky()
{
 s="invert(0%)";
 for(var i=0;i<6;i++)
 {
  document.images[42+i].src=sn.src;document.images[i*7+6].src=sn.src;
  document.images[i*7+6].style.transform=rt;
  Disf(i*7+6,s);Disf(42+i,s);
 }
}

function VymysliTah(kterykamen)
{
 for(var i=0;i<36;i++){pole1[i]=pole[i];}
 max=-100000;maxindex=-1;minule=ObodujPole(kterykamen);
 for(var i=0;i<12;i++)
 {
  if(i<6){zaklad=i;}else{zaklad=i-6;}
  TahDoPole(i,kterykamen);
  bodytahu[i]=ObodujPole(kterykamen)-minule+Mf(zaklad/2)+Mf(100*Math.random(1))/100;
  if(max<bodytahu[i]){max=bodytahu[i];maxindex=i;}
  for(var j=0;j<36;j++){pole[j]=pole1[j];}
 }
 puvodnindex=maxindex;
 for(var j=0;j<12;j++){pouzitetahy[j]=0;}
 for(var j=0;j<36;j++){pole2[j]=pole1[j];}
 for(var j=0;j<36;j++){pole[j]=pole2[j];}
 TahDoPole(maxindex,kterykamen);
 if (Ntice(kterykamen,4)==0)
 {
  do
  {
   for(var j=0;j<36;j++){pole[j]=pole2[j];}
   TahDoPole(maxindex,kterykamen);pouzitetahy[maxindex]=1;
   for(var j=0;j<36;j++){pole1[j]=pole[j];}
   ctverice=0;
   for(var i=0;i<12;i++)
   {
    TahDoPole(i,3-kterykamen);
    if(Ntice(3-kterykamen,4)>0){ctverice=1;}
    for(var j=0;j<36;j++){pole[j]=pole1[j];}
   }
   if(ctverice==1)
   {
    novyindex=12;maximum=-100000;
    for(var i=0;i<12;i++){if((pouzitetahy[i]==0) && (maximum<=bodytahu[i])){novyindex=i;maximum=bodytahu[i];}}
    if(novyindex!=12){maxindex=novyindex;pouzitetahy[novyindex]=1;}
    else{maxindex=puvodnindex;ctverice=0;}
   }
  }
  while(ctverice==1)
 }
 for(var j=0;j<36;j++){pole[j]=pole2[j];}
 return(maxindex);
}

function Butony()
{
 e="<p class='";f="'><img src='";g=".gif' alt='";h="'><b class='a'> ";i=" </b><b class='b' id='";j="'>000</b></p>";
 x=e+"pc"+f+"mo"+g+"X"+h+"computer"+i+"cisla1"+j;o=e+"cl"+f+"ce"+g+"O"+h+"human"+i+"cisla2"+j;
 b="<button onclick='";c="</button>";d=c+b;
 s=x+o+"<p>"+b+"VymenitBarvy()'>Swap colors"+d+"ZacinaPocitac()'>Computer begins"+d+"Poradit(1)'>Help move"+d+"NovaHra()'>New game"+c+"</p>";
 document.write(s);
}

function Duha()
{
 rb=document.getElementById("rb");cx=rb.getContext("2d");
 for(j=0;j<4;j++)
 {
  if(j>1){r1=0;}else{r1=252;};if(j>0){r2=252;}else{r2=0;};r3=252*Mf(j/3);cx.fillStyle = "rgb("+r1+","+r2+","+r3+")";
  cx.beginPath();cx.moveTo(70,7*j);cx.lineTo(7*j,70);cx.lineTo(7+7*j,70);cx.lineTo(70,7+7*j);cx.lineTo(70,7*j);cx.fill();
 }
}
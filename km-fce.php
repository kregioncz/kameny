<?php
function TahDoPole($tah,$ktk,$pole)
{
 if($tah<6)
 {
  $ix=$tah;for($iy=0;$iy<5;$iy++){$pole[$ix+$iy*6]=$pole[$ix+6*($iy+1)];}
  $pole[$ix+30]=$ktk;
 }
 else
 {
  $iy=$tah-6;for($ix=0;$ix<5;$ix++){$pole[$ix+6*$iy]=$pole[$ix+1+6*$iy];}
  $pole[5+6*$iy]=$ktk;
 }
 return $pole;
}

function ObodujPole($km,$pole)
{
 $nt1=Ntice($km,2,$pole);$nt2=Ntice(3-$km,2,$pole);$b=10*$nt1["pocet"]-30*$nt2["pocet"];
 $nt1=Ntice($km,3,$pole);$nt2=Ntice(3-$km,3,$pole);$b+=200*$nt1["pocet"]-400*$nt2["pocet"];
 $nt1=Ntice($km,4,$pole);$nt2=Ntice(3-$km,4,$pole);$b+=4000*$nt1["pocet"]-8000*$nt2["pocet"];return $b;
}

function VymysliTah($kterykamen,$pole)
{
 for($i=0;$i<36;$i++){$pole1[$i]=$pole[$i];}
 $max=-100000;$maxindex=-1;$minule=ObodujPole($kterykamen,$pole);
 for($i=0;$i<12;$i++)
 {
  if($i<6){$zaklad=$i;}else{$zaklad=$i-6;}
  $pole=TahDoPole($i,$kterykamen,$pole);
  $bodytahu[$i]=ObodujPole($kterykamen,$pole)-$minule+floor($zaklad/2)+rand(0,100)/100;
  if($max<$bodytahu[$i]){$max=$bodytahu[$i];$maxindex=$i;}
  for($j=0;$j<36;$j++){$pole[$j]=$pole1[$j];}
 }
 $puvodnindex=$maxindex;
 for($j=0;$j<12;$j++){$pouzitetahy[$j]=0;}
 for($j=0;$j<36;$j++){$pole2[$j]=$pole1[$j];}
 for($j=0;$j<36;$j++){$pole[$j]=$pole2[$j];}
 $pole=TahDoPole($maxindex,$kterykamen,$pole);
 if (Ntice($kterykamen,4,$pole)==0)
 {
  do
  {
   for($j=0;$j<36;$j++){$pole[$j]=$pole2[$j];}
   $pole=TahDoPole($maxindex,$kterykamen,$pole);$pouzitetahy[$maxindex]=1;
   for($j=0;$j<36;$j++){$pole1[$j]=$pole[$j];}
   $ctverice=0;
   for($i=0;$i<12;$i++)
   {
    $pole=TahDoPole($i,3-$kterykamen,$pole);
    if(Ntice(3-$kterykamen,4,$pole)>0){$ctverice=1;}
    for($j=0;$j<36;$j++){$pole[$j]=$pole1[$j];}
   }
   if($ctverice==1)
   {
    $novyindex=12;$maximum=-100000;
    for($i=0;$i<12;$i++){if(($pouzitetahy[$i]==0) && ($maximum<=$bodytahu[$i])){$novyindex=$i;$maximum=$bodytahu[$i];}}
    if($novyindex!=12){$maxindex=$novyindex;$pouzitetahy[$novyindex]=1;}
    else{$maxindex=$puvodnindex;$ctverice=0;}
   }
  }
  while($ctverice==1);
 }
 for($j=0;$j<36;$j++){$pole[$j]=$pole2[$j];}
 return($maxindex);
}

function Ntice($kterykamen,$kolik,$pole)
{
 $smerx[0]=1;$smerx[1]=1;$smerx[2]=1;$smerx[3]=0;
 $smery[0]=-1;$smery[1]=0;$smery[2]=1;$smery[3]=1;
 $celkemntic["pocet"]=0;
 for($iy=0;$iy<6;$iy++)
 {
  for($ix=0;$ix<6;$ix++)
  {
   if($pole[$ix+$iy*6]==$kterykamen)
   {
    for($j=0;$j<4;$j++)
    {
     $kk=$kolik-1;
     if(($ix+$kk*$smerx[$j]>=0) && ($ix+$kk*$smerx[$j]<6) && ($iy+$kk*$smery[$j]>=0) && ($iy+$kk*$smery[$j]<6))
     {
      $jetam=1;
      for($k=1;$k<$kolik;$k++){if($pole[($ix+$k*$smerx[$j])+6*($iy+$k*$smery[$j])]!=$kterykamen){$jetam=0;}}
      if($jetam==1){$celkemntic["pocet"]+=1;$celkemntic["startnticx"]=$ix;$celkemntic["startnticy"]=$iy;
                    $celkemntic["smernticx"]=$smerx[$j];$celkemntic["smernticy"]=$smery[$j];}
 }}}}}
 return $celkemntic;
}

function NakresliPlochu($moves)
{
  $decode="abcdefghijkl";
  if($moves==""){$moves="2";}
  $ktk=substr($moves,0,1);for($i=0;$i<36;$i++){$pole[$i]=0;}
  $hrajepc=0;
  if(floor(strlen($moves)/2)==(strlen($moves)/2) && $ktk==2){$hrajepc=1;}
  for($i=1;$i<strlen($moves);$i++)
  {
    $tmp=substr($moves,$i,1);
    $tah=strpos($decode,$tmp);
    $pole=TahDoPole($tah,$ktk,$pole);
    $ktk=3-$ktk;
  }
  $ktk=3-$ktk;
  $s="";$s1="<a href='?m=";
  $s2="<img src='sl.gif' class='a' alt='&lt;'>";
  $s3="<img src='sn.gif' class='a' alt='^'>";
  $end=0;
  $nt=Ntice(3-$ktk,4,$pole);
  if($nt["pocet"]==0){$nt=Ntice($ktk,4,$pole);}
  if($nt["pocet"]>0){$end=1;for($k=0;$k<4;$k++){$ntx[$k]=$nt["startnticx"]+$k*$nt["smernticx"]+6*($nt["startnticy"]+$k*$nt["smernticy"]);}}
  for($iy=0;$iy<6;$iy++)
  {
   $tahiy=$iy+6;$strtahiy=substr($decode,$tahiy,1);
   for($ix=0;$ix<6;$ix++)
   {
    $s.="<img src='";$pxy=$ix+$iy*6;$vitez="";
    if($nt["pocet"]>0)
    {
     if($pxy==$ntx[0] || $pxy==$ntx[1] || $pxy==$ntx[2] || $pxy==$ntx[3]){$vitez="' style='filter:invert(20%%);WebkitFilter:invert(20%%);";}
    }
    if($pole[$pxy]==0){$s.="pl.gif' alt='.";}
    if($pole[$pxy]==1){$s.="mo.gif' alt='O".$vitez;}
    if($pole[$pxy]==2){$s.="ce.gif' alt='X".$vitez;}
    $s.="'>";
   }
   if($end==1 || $hrajepc==1){$s.=$s2."<br>\n";}
   else{$s.=$s1.$moves.$strtahiy."'>".$s2."</a><br>\n";}
  }
  for($ix=0;$ix<6;$ix++)
  {
    if($end==1 || $hrajepc==1){$s.=$s3;}
    else{$s.=$s1.$moves.substr($decode,$ix,1)."'>".$s3."</a>";}
  }
  printf($s);
}
?>
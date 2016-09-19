<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-2">
 <?php
  include("km-fce.php");
  $m=$_GET['m'];
  $kmn=substr($m,0,1);
  if($kmn!="")
  {
   $decode="abcdefghijkl";
   $ktk=$kmn;for($i=0;$i<36;$i++){$pole[$i]=0;}
   for($i=1;$i<strlen($m);$i++)
   {
    $tmp=substr($m,$i,1);
    $tah=strpos($decode,$tmp);
    $pole=TahDoPole($tah,$ktk,$pole);
    $ktk=3-$ktk;
   }
   $nt=Ntice(3-$ktk,4,$pole);
   $tah=VymysliTah($ktk,$pole);
   $tmp=$m.substr($decode,$tah,1);
   if($nt["pocet"]==0)
   {
    if(3-$ktk==$kmn){printf("<noscript>\n<meta http-equiv='Refresh' content='3; url=?m=%s'>\n</noscript>\n",$tmp);}
   }
  }
 ?>
 <link rel="stylesheet" type="text/css" href="kameny.css">
 <script src="kameny.js"></script>
 <title>Hra Kameny</title>
</head>
<body>
<div id="main">
 <div id="plocha">
  <noscript>
  <?php
   NakresliPlochu($m);
  ?>
  </noscript>
  <script>NakresliPlochu();</script>
  <p class="pt2">Artificial intelligence in 3 lines of code!</p>
 </div>
 <div id="panel">
  <h1>kameny</h1>
  <hr>
  <noscript>
  <?php
   $s="<form action='?m='><button type='submit'>New game</button></form>";
   $f="<p><img src='";$g=".gif' alt='";$h="'><b class='a'> ";$e="</b></p>";
   $x=$f."mo".$g."O".$h."computer".$e;$o=$f."ce".$g."X".$h."human".$e;
   $s=$x.$o.$s;printf($s);
  ?>
  </noscript>
  <script>Butony();</script>
  <canvas id="rb" width=70 height=70></canvas><script>Duha();NovaHra();</script>
 </div>
 <div id="patka">
  <p class="pt1">The goal is to build four stones in a row - vertically, horizontally or diagonally. Put stones by sliding from right or bottom. Click the arrow to insert the stone and also move an entire column on the board. When you create at the same time a quartet of yourself and your computer, you lose.</p>
  <p class="pt2">Remake of the game Think! ( by Ariolasoft '85 ) with my own new AI.</p>
  <p class="pt3">&copy;2002,2016 Pavel Chalupa ( pavel@kregion.cz ), 10kB version /4kB gzip/</p>
 </div>
</div>
</body>
</html>
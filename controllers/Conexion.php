<?php
/*      
$DBhost = "db5010974493.hosting-data.io";
$DBuser = "dbu1564484";
$DBpass = "zonetKVM3016";
$DBname = "dbs9277449";
try {

    $DBcon = new PDO("mysql:host=$DBhost;dbname=$DBname", $DBuser, $DBpass);
    $DBcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $ex) {

    die($ex->getMessage());
}*/

$DBhost = "localhost";
$DBuser = "root";
$DBpass = "";
$DBname = "veryauto";

try{
 
 $DBcon = new PDO("mysql:host=$DBhost;dbname=$DBname",$DBuser,$DBpass);
 $DBcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $ex){
 
 die($ex->getMessage());
}

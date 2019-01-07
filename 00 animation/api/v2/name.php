<?php
require 'flight/Flight.php';


Flight::route('/name/', function(){
    echo 'hello name!';
});

Flight::start();
?>

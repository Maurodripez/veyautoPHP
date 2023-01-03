<?php
session_start();
session_destroy();
header('Location: ../resources/LoginUsuarios.html');
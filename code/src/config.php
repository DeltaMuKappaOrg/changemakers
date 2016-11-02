<?php
require_once('vendor/autoload.php');

$stripe = array(
  "secret_key"      => "sk_test_berYYzVPf63eCc7lrcXeBUxX",
  "publishable_key" => "pk_test_fvLtLOXsZz38RphJZMm95YpO"
);

define('CONSUMER_KEY', 'vTpXPHcNaHiyrGkZfMQiRTicl');
define('CONSUMER_SECRET', 'eqe8cOn95TvX57VzuAMTy2Orak6ybGoW9MstAPlULUZnLUD7bZ');
define('ACCESS_TOKEN', '34374456-Te9VIj19VjZhkwsHuGeJxhShH6oCs10BuiQ2zXzIF');
define('ACCESS_TOKEN_SECRET', 'eZcgau3Rvff3K8hxYvloGjNKDLPmeknLINpq1KG23m5UH');

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>

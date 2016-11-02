<?php
require_once('./config.php');

$token  = $_POST['stripeToken'];
$customerEmail = $_POST['stripeEmail'];
$amount = intval($_POST['amount'])*100;
$name = $_POST['name'];

$charges = \Stripe\Charge::all();

$total = 0;

foreach($charges["data"] as $i => $value) {
  $total += $value["amount"];
}

$avg_payment = $total/100*count($charges["data"]);

$customer = \Stripe\Customer::create(array(
  'email' => $customerEmail,
  'source'  => $token
));

$charge = \Stripe\Charge::create(array(
  'customer' => $customer->id,
  'amount'   => $amount,
  'currency' => 'usd',
  'metadata' => array(
    'over_avg' => $amount >= $avg_payment,
    'name' => $name
  )
));

echo json_encode($charge);

?>

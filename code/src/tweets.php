<?php
include 'config.php';
use Abraham\TwitterOAuth\TwitterOAuth;

try {
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
  $connection->setTimeouts(10, 15);

  $content = $connection->get("account/verify_credentials");

  $statuses = $connection->get("search/tweets", ["q" => "#changemakersconf"]);

  header('Content-Type: application/json');

  echo json_encode($statuses->statuses);
} catch (Exception $e) {
  echo $e;
}
?>

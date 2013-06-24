<!DOCTYPE html>

<html lang="en" class="no-js">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=800">

  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo URL::base(); ?>">
  <meta property="og:title" content="Where to get N95 masks and Air Purifiers - #FreeMyInternet">
  <meta property="og:description" content="A map of where you can find stocks of N95 masks and Air Purifiers in Singapore (and nearby Malaysia)">
  <meta property="og:image" content="<?php echo URL::base().'assets/fb-thumbnail.jpg'; ?>">

  <title>Where to get N95 masks and Air Purifiers - #FreeMyInternet</title>

  <link rel="shortcut icon" href="<?php echo URL::base().'assets/favicon.ico'; ?>">
  <link rel="stylesheet" href="<?php echo URL::base().'assets/css/normalize.css'; ?>">
  <link rel="stylesheet" href="<?php echo URL::base().'assets/css/style.css'; ?>">

  <script src="<?php echo URL::base().'assets/js/modernizr.js'; ?>"></script>
  <script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=visualization"></script>
  <script src="<?php echo URL::base().'assets/js/visualise.js'; ?>"></script>
</head>

<body>
  <noscript>
    <p>Please enable JavaScript in your web browser.</p>
  </noscript>

  <div id="page">
    <header class="clearfix">
      <h1>Where to get N95 masks and Air Purifiers</h1>
      <p><em>This is a prototype and is continually being improved. Users interested in helping, please contact us <a href="https://www.facebook.com/FreeMyInternet" target="fmi-facebook">here</em></a></p>
    </header>

    <div id="content" class="clearfix">
      <div id="map-canvas" style="width:800px; height:400px;"></div>
      <p class="first"><em>Map locations are only approximate.</em></p>
      <p class="last">Enter a new location <a target="google-form" href="https://goo.gl/hoYLm">here</a></p>
    </div>

    <footer class="clearfix">
      <span id="copyright">Copyleft 2013 Chong Kai Xiong and Donaldson Tan</span>
      <span id="credits">Brought to you by #FreeMyInternet</span>
    </footer>
  </div>
</body>

</html>

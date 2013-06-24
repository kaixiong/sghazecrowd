<!DOCTYPE html>

<html lang="en" class="no-js">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">

  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo URL::base(); ?>">
  <meta property="og:title" content="Where to get N95 masks and Air Purifiers - #FreeMyInternet">
  <meta property="og:description" content="A map of where you can find stocks of N95 masks and Air Purifiers in Singapore (and nearby Malaysia)">
  <meta property="og:image" content="<?php echo URL::base().'assets/fb-thumbnail.jpg'; ?>">

  <title>Find N95 masks and Air Purifiers - #FreeMyInternet</title>

  <link rel="shortcut icon" href="<?php echo URL::base().'assets/favicon.ico'; ?>">
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
    <header>
      <h1><a href="<?php echo URL::base(); ?>">Find N95 masks and Air Purifiers</a></h1>
      <p><em>This is a prototype and is continually being improved. Interested contributors, please contact us <a href="https://facebook.com/FreeMyInternet" target="fmi-facebook">here</em></a></p>
    </header>

    <div id="content">
      <div id="map-canvas"></div>
      <p class="first"><em>Map locations are only approximate.</em></p>
      <p class="last">Enter a new location <a target="google-form" href="https://goo.gl/hoYLm">here</a></p>
    </div>

    <footer>
      <span id="copyright">Copyleft 2013 <a href="https://github.com/kaixiong/sghazecrowd" target="project-page">SGHazeCrowd</a> team</span>
      <span id="credits">Presented by <a target="fmi-facebook" href="https://facebook.com/FreeMyInternet">#FreeMyInternet</a></span>
    </footer>
  </div>
</body>

</html>

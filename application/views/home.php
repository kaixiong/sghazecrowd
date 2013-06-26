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
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.css">
  <!--[if lte IE 8]>
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.ie.css" />
  <![endif]-->

  <script src="<?php echo URL::base().'assets/js/modernizr.js'; ?>"></script>
  <script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
  <script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
  <script src="<?php echo URL::Base().'assets/js/leaflet-Google-layer.js'; ?>"></script>
  <script src="<?php echo URL::base().'assets/js/visualise.js'; ?>"></script>
</head>

<body>
  <noscript>
    <p>Please enable JavaScript in your web browser.</p>
  </noscript>

  <div id="page">
    <header>
      <h1><a href="<?php echo URL::base(); ?>">Anti-Haze Equipment Hunter <span class="dev-stage">alpha</span></a></h1>
      <div id="toolbar">
        <a class="button" target="google-form" href="https://goo.gl/hoYLm"><span class="icon">+</span><span class="caption">Add a Location</span></a>
      </div>
    </header>

    <div id="map-canvas"></div>

    <div id="sidebar">
      <div id="latest-entries"></div>
    </div>

    <footer>
      <span class="copyright">Copyleft 2013 <a href="https://github.com/kaixiong/sghazecrowd" target="project-page">SGHazeCrowd</a></span>
    </footer>
  </div>
</body>

</html>

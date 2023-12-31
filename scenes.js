function cornell() {
  return [ 
    sphere(1e5, v3(1e5 + 1, 40.8, 81.6), v3(0.0, 0.0, 0.0), v3(0.75, 0.25, 0.25), DIFF),    //Left
    sphere(1e5, v3(-1e5 + 99, 40.8, 81.6), v3(0.0, 0.0, 0.0), v3(0.25, 0.25, 0.75), DIFF),   //Right
    sphere(1e5, v3(50, 40.8, 1e5), v3(0.0, 0.0, 0.0), v3(0.75, 0.75, 0.75), DIFF),   //Back
    sphere(1e5, v3(50, 40.8, -1e5 + 170), v3(0.0, 0.0, 0.0), v3(0.0, 0.0, 0.0), DIFF),   //Front
    sphere(1e5, v3(50, 1e5, 81.6), v3(0.0, 0.0, 0.0), v3(0.75, 0.75, 0.75), DIFF),    //Bottom
    sphere(1e5, v3(50, -1e5 + 81.6, 81.6), v3(0.0, 0.0, 0.0), v3(0.75, 0.75, 0.75), DIFF),   //Top
    sphere(16.5, v3(27, 16.5, 47), v3(0.0, 0.0, 0.0), v3(0.999, 0.999, 0.999), SPEC),   //Mirror
    sphere(16.5, v3(73, 16.5, 78), v3(0.0, 0.0, 0.0), v3(0.999, 0.999, 0.999), REFR), //Glass
    sphere(600, v3(50, 681.6 - .27, 81.6), v3(12.0, 12.0, 12.0), v3(0.0, 0.0, 0.0), DIFF)    //Light
  ];
}

function cornell_tiny_light() {
  return [
    // Scene: radius, position, emission, color, material
    sphere(1e5, v3(1e5 + 1, 40.8, 81.6), v3(0., 0., 0.), v3(.75, .25, .25), DIFF),  // Left
    sphere(1e5, v3(-1e5 + 99, 40.8, 81.6), v3(0., 0., 0.), v3(.25, .25, .75), DIFF), // Rght
    sphere(1e5, v3(50, 40.8, 1e5), v3(0., 0., 0.), v3(.75, .75, .75), DIFF),  // Back
    sphere(1e5, v3(50, 40.8, -1e5 + 170), v3(0., 0., 0.), v3(0., 0., 0.), DIFF),        // Frnt
    sphere(1e5, v3(50, 1e5, 81.6), v3(0., 0., 0.), v3(.75, .75, .75), DIFF),  // Botm
    sphere(1e5, v3(50, -1e5 + 81.6, 81.6), v3(0., 0., 0.), v3(.75, .75, .75), DIFF), // Top
    sphere(16.5, v3(27, 16.5, 47), v3(0., 0., 0.), v3(1, 1, 1).smul(.999), SPEC),  // Mirr
    sphere(16.5, v3(73, 16.5, 78), v3(0., 0., 0.), v3(1, 1, 1).smul(.999), REFR),  // Glas
    sphere(1.5, v3(50, 81.6 - 16.5, 81.6), v3(4, 4, 4).smul(100), v3(0.0, 0.0, 0.0), DIFF),  // Lite
  ];
}

function sky_scene() {
  const cen = v3(50, 40.8, -860);
  return [
    sphere(1600, smul(3000, v3(1, 0, 2)), smul(1.2e1 * 1.56 * 2, v3(1, .9, .8)), v3(0., 0., 0.), DIFF), // sun
    sphere(1560, smul(3500, v3(1, 0, 2)), smul(4.8e1 * 1.56 * 2, v3(1, .5, .05)), v3(0., 0., 0.), DIFF), // horizon sun2
    sphere(10000, vadd(cen, v3(0, 0, -200)), smul(6e-2 * 8, v3(0.00063842, 0.02001478, 0.28923243)), smul(.25, v3(.7, .7, 1)), DIFF), // sky

    sphere(100000, v3(50, -100000, 0), v3(0., 0., 0.), v3(.3, .3, .3), DIFF), // grnd
    sphere(110000, v3(50, -110048.5, 0), smul(4, v3(.9, .5, .05)), v3(0., 0., 0.), DIFF),// horizon brightener
    sphere(4e4, v3(50, -4e4 - 30, -3000), v3(0., 0., 0.), v3(.2, .2, .2), DIFF),// mountains

    sphere(26.5, v3(22, 26.5, 42), v3(0., 0., 0.), smul(.596, v3(1, 1, 1)), SPEC),    // white Mirr
    sphere(13, v3(75, 13, 82), v3(0., 0., 0.), smul(.96, v3(.96, .96, .96)), REFR), // Glas
    sphere(22, v3(87, 22, 24), v3(0., 0., 0.), smul(.696, v3(.6, .6, .6)), REFR),   // Glas2
  ];
}


function night_sky() {
  return [
    sphere(2.5e3, smul(1e4, v3(.82, .92, -2)), smul(.8e2, v3(1, 1, 1)), v3(0., 0., 0.), DIFF), // moon

    sphere(2.5e4, v3(50, 0, 0), smul(1e-2, v3(0.114, 0.133, 0.212)), smul(0.003, v3(.216, .384, 1)), DIFF), // sky

    sphere(5e0, smul(1e4, v3(-.2, 0.16, -1)), smul(1e2, v3(1.00, 0.843, 0.698)), v3(0., 0., 0.), DIFF),  // star
    sphere(5e0, smul(1e4, v3(0, 0.18, -1)), smul(1e2, v3(1.00, 0.851, 0.710)), v3(0., 0., 0.), DIFF),  // star
    sphere(5e0, smul(1e4, v3(.3, 0.15, -1)), smul(1e2, v3(0.671, 0.780, 1.00)), v3(0., 0., 0.), DIFF),  // star
    sphere(3.5e4, v3(600, -3.5e4 + 1, 300), v3(0., 0., 0.), smul(.01, v3(.6, .8, 1)), REFR),   //pool
    sphere(5e4, v3(-500, -5e4 + 0, 0), v3(0., 0., 0.), smul(.35, v3(1, 1, 1)), DIFF),    //hill
    sphere(16.5, v3(27, 0, 47), v3(0., 0., 0.), smul(.33, v3(1, 1, 1)), DIFF), //hut
    sphere(7, v3(27 + 8 * Math.sqrt(2), 0, 47 + 8 * Math.sqrt(2)), v3(0., 0., 0.), smul(.33, v3(1, 1, 1)), DIFF), //door
    sphere(500, v3(-1e3, -300, -3e3), v3(0., 0., 0.), smul(.351, v3(1, 1, 1)), DIFF),  //mnt
    sphere(830, v3(0, -500, -3e3), v3(0., 0., 0.), smul(.354, v3(1, 1, 1)), DIFF),  //mnt
    sphere(490, v3(1e3, -300, -3e3), v3(0., 0., 0.), smul(.352, v3(1, 1, 1)), DIFF),  //mnt
  ];
}

function forest() {
  let tc = v3(0.0588, 0.361, 0.0941);
  let sc = smul(.7, v3(1, 1, 1));
  return [
    sphere(1e5, v3(50, 1e5 + 130, 0), smul(1.3, v3(1, 1, 1)), v3(0., 0., 0.), DIFF), //lite
    sphere(1e2, v3(50, -1e2 + 2, 47), v3(0., 0., 0.), smul(.7, v3(1, 1, 1)), DIFF), //grnd

    sphere(1e4, vadd(v3(50, -30, 300), smul(1e4, v3(-Math.sin(50 * Math.PI / 180), 0, Math.cos(50 * Math.PI / 180)))), v3(0., 0., 0.), smul(.99, v3(1, 1, 1)), SPEC),// mirr L
    sphere(1e4, vadd(v3(50, -30, 300), smul(1e4, v3(Math.sin(50 * Math.PI / 180), 0, Math.cos(50 * Math.PI / 180)))), v3(0., 0., 0.), smul(.99, v3(1, 1, 1)), SPEC),// mirr R
    sphere(1e4, vadd(v3(50, -30, -50), smul(1e4, v3(-Math.sin(30 * Math.PI / 180), 0, -Math.cos(30 * Math.PI / 180)))), v3(0., 0., 0.), smul(.99, v3(1, 1, 1)), SPEC),// mirr FL
    sphere(1e4, vadd(v3(50, -30, -50), smul(1e4, v3(Math.sin(30 * Math.PI / 180), 0, -Math.cos(30 * Math.PI / 180)))), v3(0., 0., 0.), smul(.99, v3(1, 1, 1)), SPEC),// mirr


    sphere(4, v3(50, 6 * .6, 47), v3(0., 0., 0.), v3(.13, .066, .033), DIFF),//"tree"
    sphere(16, v3(50, 6 * 2 + 16 * .6, 47), v3(0., 0., 0.), tc, DIFF),//"tree"
    sphere(11, v3(50, 6 * 2 + 16 * .6 * 2 + 11 * .6, 47), v3(0., 0., 0.), tc, DIFF),//"tree"
    sphere(7, v3(50, 6 * 2 + 16 * .6 * 2 + 11 * .6 * 2 + 7 * .6, 47), v3(0., 0., 0.), tc, DIFF),//"tree"

    sphere(15.5, v3(50, 1.8 + 6 * 2 + 16 * .6, 47), v3(0., 0., 0.), sc, DIFF),//"tree"
    sphere(10.5, v3(50, 1.8 + 6 * 2 + 16 * .6 * 2 + 11 * .6, 47), v3(0., 0., 0.), sc, DIFF),//"tree"
    sphere(6.5, v3(50, 1.8 + 6 * 2 + 16 * .6 * 2 + 11 * .6 * 2 + 7 * .6, 47), v3(0., 0., 0.), sc, DIFF),//"tree"
  ];
}

function wada() {
  const R = 60;
  const T = 30 * Math.PI / 180.0;
  const D = R / Math.cos(T);
  return [
    sphere(1e5, v3(50, 100, 0), smul(3e0, v3(1, 1, 1)), v3(0., 0., 0.), DIFF), // sky
    sphere(1e5, v3(50, -1e5 - D - R, 0), v3(0., 0., 0.), v3(.1, .1, .1), DIFF),           //grnd
    sphere(R, vadd(v3(50, 40.8, 62), smul(D, v3(Math.cos(T), Math.sin(T), 0))), v3(0., 0., 0.), smul(.999, v3(1, .3, .3)), SPEC), //red
    sphere(R, vadd(v3(50, 40.8, 62), smul(D, v3(-Math.cos(T), Math.sin(T), 0))), v3(0., 0., 0.), smul(.999, v3(.3, 1, .3)), SPEC), //grn
    sphere(R, vadd(v3(50, 40.8, 62), smul(D, v3(0, -1, 0))), v3(0., 0., 0.), smul(.999, v3(.3, .3, 1)), SPEC), //blue
    sphere(R, vadd(v3(50, 40.8, 62), smul(D, v3(0, 0, -1))), v3(0., 0., 0.), smul(.999, v3(.53, .53, .53)), SPEC), //back
    sphere(R, vadd(v3(50, 40.8, 62), smul(D, v3(0, 0, 1))), v3(0., 0., 0.), smul(.999, v3(1, 1, 1)), REFR), //front
  ];
}

function island() {
  // Inspired by cover of "Time Planet Earth: An Illustrated History"
  let Cen = v3(50, -20, -860);
  return [
    sphere(160, vadd(Cen, v3(0, 600, -500)), v3(1, 1, 1).smul(2e2), v3(0, 0, 0), DIFF), // sun
    sphere(800, vadd(Cen, v3(0, -880, -9120)), v3(1, 1, 1).smul(2e1), v3(0, 0, 0), DIFF), // horizon
    sphere(10000, vadd(Cen, v3(0, 0, -200)), v3(0.0627, 0.188, 0.569).smul(1e0), v3(1, 1, 1).smul(0.4), DIFF), // sky
    sphere(800, vadd(Cen, v3(0, -720, -200)), v3(0, 0, 0), v3(0.110, 0.898, 1.00).smul(0.996), REFR), // water
    sphere(790, vadd(Cen, v3(0, -720, -200)), v3(0, 0, 0), v3(.4, .3, .04).smul(0.6), DIFF), // earth
    sphere(325, vadd(Cen, v3(0, -255, -50)), v3(0, 0, 0), v3(.4, .3, .04).smul(0.8), DIFF), // island
    sphere(275, vadd(Cen, v3(0, -205, -33)), v3(0, 0, 0), v3(.02, .3, .02).smul(0.75), DIFF), // grass
  ]
}

function wada2() {
  //double R=60;
  let R = 120;     // radius
  let T = 30 * PI / 180.;
  let D = R / cos(T);     //distance
  let Z = 62;
  let C = v3(0.275, 0.612, 0.949);
  return [
    sphere(R, vadd(v3(50, 28, Z), v3(cos(T), sin(T), 0).smul(D)), C.smul(6e-2), v3(1, 1, 1).smul(.996), SPEC), //red
    sphere(R, vadd(v3(50, 28, Z), v3(-cos(T), sin(T), 0).smul(D)), C.smul(6e-2), v3(1, 1, 1).smul(.996), SPEC), //grn
    sphere(R, vadd(v3(50, 28, Z), v3(0, -1, 0).smul(D)), C.smul(6e-2), v3(1, 1, 1).smul(.996), SPEC), //blue
    sphere(R, vadd(v3(50, 28, Z), v3(0, 0, -1).smul(R * 2 * sqrt(2. / 3.))), C.smul(6e-2), v3(1, 1, 1).smul(.996), SPEC), //back
    sphere(
      2 * 2 * R * 2 * sqrt(2. / 3.) - R * 2 * sqrt(2. / 3.) / 3.,
      vadd(v3(50, 28, Z), v3(0, 0, -R * 2 * sqrt(2. / 3.) / 3.)),
      v3(1, 1, 1).smul(0),
      v3(1, 1, 1).smul(.5),
      SPEC
    ), //front
  ];
}

function getScene(s) {
  switch (s) {
    case "cornell": return cornell();
    case "cornell_tiny_light": return cornell_tiny_light();
    case "sky": return sky_scene();
    case "night_sky": return night_sky();
    case "forest": return forest();
    case "wada": return wada();
    case "wada2": return wada2();
    case "island": return island();
  }
}
import "./style.css";
// import typescriptLogo from "./typescript.svg";
// import viteLogo from "/vite.svg";
import plane from "/plane-frame-yellow-two.svg";
import planeFrameTwo from "/plane-frame-yellow.svg";
//import { setupCounter } from "./counter.ts";
import * as PIXI from "pixi.js";

const animateJetGamePhase = (
  app: PIXI.Application,
  planeContainer: PIXI.Container,
  planeLogo: PIXI.Sprite,
  planeLogoTwo: PIXI.Sprite
) => {
  planeContainer.x = planeLogo.width / 2;
  planeContainer.y = app.screen.height - planeLogo.height / 2;
  // planeLogo.x = planeLogo.width / 2;
  // planeLogo.y = app.screen.height - planeLogo.height / 2;
  planeLogo.anchor.set(0.5);

  // planeLogoTwo.x = planeLogoTwo.width / 2;
  // planeLogoTwo.y = app.screen.height - planeLogoTwo.height / 2;
  planeLogoTwo.anchor.set(0.5);

  planeContainer.addChild(planeLogo, planeLogoTwo);
  // // Create a graphics object for the trail
  const trail = new PIXI.Graphics();
  // Mov the trail to the initial position of the jett
  trail.moveTo(planeContainer.x, planeContainer.y);
  app.stage.addChild(trail);
  app.stage.addChild(planeContainer);

  // Variables for controlling alpha toggle rate
  let alphaToggleCounter = 0;
  const alphaToggleInterval = 10; // Number of frames between alpha toggles

  let baseY = app.screen.height / 2; // Base Y position
  let amplitude = 150; // Height of the hop
  let speed = 0.05; // Speed of the hop
  let angle = 0; // Angle for the sine wave
  const horizontalSpeed = 2;
  // Variable to keep track of the current frame
  const animate = (_delta: any) => {
    angle += speed * _delta.deltaTime;

    planeContainer.x += horizontalSpeed * _delta.deltaTime; // Move right
    planeContainer.y = baseY + Math.sin(angle) * amplitude; // Calculate the new Y position using a sine wave

    trail
      .lineTo(planeContainer.x, planeContainer.y)
      .fill({ color: 0xffff00, alpha: 0.5 })
      .stroke({ width: 10, color: 0xff0000 });
    // Reset position if the rocket moves off the screen
    if (planeContainer.x > app.screen.width + planeLogo.width / 2) {
      planeContainer.x = planeLogo.width / 2; // Start offscreen to the left again
      trail.clear();
    }
    alphaToggleCounter += 1;
    if (alphaToggleCounter >= alphaToggleInterval) {
      // Toggle plane logo two alpha between 1 and 0
      planeLogoTwo.alpha = planeLogoTwo.alpha === 1 ? 0 : 1;
      // Reset the alpha toggle counter
      alphaToggleCounter = 0;
    }
  };

  app.ticker.add(animate);
};

// IIFE
(async () => {
  const app = new PIXI.Application();
  await app.init({
    width: 640,
    height: 360,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    resizeTo: window,
  });
  document.body.appendChild(app.canvas);

  // load the texture we need
  // const texture = await PIXI.Assets.load(viteLogo);
  const texturePlane = await PIXI.Assets.load(plane);
  const texturePlaneFrameTwo = await PIXI.Assets.load(planeFrameTwo);

  // const planeSVG = new PIXI.Graphics().svg(plane);
  // // This creates a texture from a 'vitelogo.png' image
  // const vitelogo = new PIXI.Sprite(texture);
  const planeLogo = new PIXI.Sprite(texturePlane);
  const planeLogoTwo = new PIXI.Sprite(texturePlaneFrameTwo);
  const planeContainer = new PIXI.Container();

  //console.log(planeContainer.height);
  // animateJetGamePhase(app, planeContainer, planeLogo, planeLogoTwo);
  const curve = new PIXI.Graphics();
  curve.moveTo(0, app.screen.height);
  curve.bezierCurveTo(
    100,
    app.screen.height - 100,
    200,
    200,
    app.screen.width - 200,
    200
  );
  curve.stroke({ width: 5, color: 0xffff00 });

  app.stage.addChild(curve);
})();

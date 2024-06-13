import "./style.css";
// import typescriptLogo from "./typescript.svg";
// import viteLogo from "/vite.svg";
import plane from "/plane-frame-yellow-two.svg";
import planeFrameTwo from "/plane-frame-yellow.svg";
//import { setupCounter } from "./counter.ts";
import * as PIXI from "pixi.js";

// IIFE
(async () => {
  const app = new PIXI.Application();
  await app.init({
    width: 640,
    height: 360,
    backgroundColor: "red",
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
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
  console.log(planeContainer.width);
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
  // const trail = new PIXI.Graphics();
  // app.stage.addChild(trail);
  app.stage.addChild(planeContainer);

  // Variable to keep track of the current frame
  const animate = (delta: any) => {
    // console.log(delta);
    planeLogo.x += 0.78;
    planeLogo.y -= 0.78;
    planeLogoTwo.x += 0.78;
    planeLogoTwo.y -= 0.78;
  };

  // app.ticker.add(animate);
  // app.ticker.add(() => {
  //   // each frame we spin the logo around a bit
  //   // vitelogo.rotation += 0.05;
  //   // planeLogo.x += 0.88;
  //   // planeLogoTwo.x += 0.88;
  //   // if (planeLogo.x >= app.renderer.width / 2 / 2) {
  //   //   planeLogo.y -= 0.88;
  //   //   planeLogoTwo.y -= 0.88;
  //   // }
  //   // Toggle visibility of the plane logos
  //   // Switch the texture of the plane sprite every frame

  //   // Increment the frame counter
  // });
})();

import Phaser from "phaser";
import type { LaunchOptions } from "../main.ts";
import { loadSounds } from "../sounds.ts";
import { makeTextures } from "../textures.ts";

/** Shared fade for every transition; repeated requests keep the first target. */
export function fadeTo(
  scene: Phaser.Scene,
  target: "title" | "play" | "cutscene",
  data: object = {},
): void {
  const camera = scene.cameras.main;
  if (camera.fadeEffect.isRunning && camera.fadeEffect.direction) return;
  camera.fadeOut(450, 4, 2, 12);
  camera.once("camerafadeoutcomplete", () => scene.scene.start(target, data));
}

/** Builds the shared assets once before opening the title. */
export class BootScene extends Phaser.Scene {
  constructor(private readonly options: LaunchOptions) {
    super("boot");
  }

  create(): void {
    makeTextures(this);
    loadSounds(this);
    this.scene.start("title", { autoStart: this.options.attract });
  }
}

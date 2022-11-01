import { DEFAULT_PRIMARY_COLOR } from "../constants";
import { generateRootColors } from "../generate";
import { LIGHT_MODE } from "../modes";

describe("generateRootColors", () => {
  it("should generate correct root colors", () => {
    expect(generateRootColors(DEFAULT_PRIMARY_COLOR, LIGHT_MODE))
      .toMatchInlineSnapshot(`
      Object {
        "--hadmean-base-color": "#ffffff",
        "--hadmean-border-color": "#e3ebf6",
        "--hadmean-foundation-color": "#f3f6f9",
        "--hadmean-main-text": "#5f6270",
        "--hadmean-muted-text": "#a4abc5",
        "--hadmean-primary-color": "#4b38b3",
        "--hadmean-primary-shade-color": "#4b38b31A",
        "--hadmean-shade-opacity": "1A",
        "--hadmean-soft-color": "#f1f5fa",
        "--hadmean-text-on-primary": "#ffffff",
        "--hadmean-text-on-shade": "#4b38b3",
      }
    `);
  });
});

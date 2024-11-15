/**
 * @param {object} options
 * @param {number} options.h1 vertical position of A, C, D & F
 *
 * @param {number} options.h2 vertical position of B & E
 * @param {number} options.w1 horizontal position of A, C, D & F
 *
 * @param {number} options.t1 outward control point of A, C, D & F
 * @param {number} options.t2 horizontal control point of B & E
 * @param {number} options.t3 inward control point of C & D
 *
 * ```
 * .  ╋━w1━┫            ┯ ┯ D F
 * ╭──╴B╶──╮  ┳    t1 : │ │ │ │
 * │       │  h2        A C ┷ ┷
 * C       A  ╋
 * │          h1   t2 : ┠─╴B╶─┨
 * ╰───╂───╮  ┻         ┠─╴E╶─┨
 * .       │
 * F       D            C  ┯
 * │       │       t3 : │  │
 * ╰──╴E╶──╯            ┷  D
 * ```
 */
function drawS({ h1, h2, w1, t1, t2, t3 }) {
  const [Ax, Ay] = [w1, -h1];
  const [Bx, By] = [0, -(h1 + h2)];
  const [Cx, Cy] = [-w1, -h1];
  const [Dx, Dy] = [w1, h1];
  const [Ex, Ey] = [0, h1 + h2];
  const [Fx, Fy] = [-w1, h1];
  return [
    `M ${[Ax, Ay]}`,
    `C ${[Ax, Ay - t1]} ${[Bx + t2, By]} ${[Bx, By]}`,
    `C ${[Bx - t2, By]} ${[Cx, Cy - t1]} ${[Cx, Cy]}`,
    `C ${[Cx, Cy + t3]} ${[Dx, Dy - t3]} ${[Dx, Dy]}`,
    `C ${[Dx, Dy + t1]} ${[Ex + t2, Ey]} ${[Ex, Ey]}`,
    `C ${[Ex - t2, Ey]} ${[Fx, Fy + t1]} ${[Fx, Fy]}`,
  ].join(" \n");
}

/**
 * @param {object} options
 * @param {number} options.h1 vertical position of A, C, D & F
 * @param {number} options.h2 vertical position of B & E
 *
 * @param {number} options.w1 horizontal position of A, C, D & F
 *
 * @param {number} options.t1 outward control point of A, C, D & F
 * @param {number} options.t2 horizontal control point of B & E
 *
 * ```
 * .  ╋━w1━┫            ┯ ┯ D F
 * ╭──╴B╶──╮  ┳    t1 : │ │ │ │
 * │       │  h2        A C ┷ ┷
 * C       A  ╋
 * │          h1   t2 : ┠─╴B╶─┨
 * │   ╋      ┻         ┠─╴E╶─┨
 * │
 * D       F
 * │       │
 * ╰──╴E╶──╯
 * ```
 */
function drawC({ h1, h2, w1, t1, t2 }) {
  const [Ax, Ay] = [w1, -h1];
  const [Bx, By] = [0, -(h1 + h2)];
  const [Cx, Cy] = [-w1, -h1];
  const [Dx, Dy] = [-w1, h1];
  const [Ex, Ey] = [0, h1 + h2];
  const [Fx, Fy] = [w1, h1];
  return [
    `M ${[Ax, Ay]}`,
    `C ${[Ax, Ay - t1]} ${[Bx + t2, By]} ${[Bx, By]}`,
    `C ${[Bx - t2, By]} ${[Cx, Cy - t1]} ${[Cx, Cy]}`,
    `L ${[Dx, Dy]}`,
    `C ${[Dx, Dy + t1]} ${[Ex - t2, Ey]} ${[Ex, Ey]}`,
    `C ${[Ex + t2, Ey]} ${[Fx, Fy + t1]} ${[Fx, Fy]}`,
  ].join(" \n");
}

/**
 * Draw the CSS logo
 *
 * @param {string} foreground
 * @param {string} background
 * @returns {string} The SVG output
 */
export function draw(foreground, background) {
  const thickness = 18;

  const w1 = 18;

  const h1 = 26;
  const h2 = 24;

  const t1 = 12;
  const t2 = 12;
  const t3 = 32;

  const k = thickness + 6;
  const r = 42;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-120 -120 240 240" width="240" fill="none">
  <title>CSS</title>
  <path d="M-120,-120
      H${120 - r}
		  A ${r} ${r} 0 0 1 ${120} ${-120 + r}
			V${120 - r}
		  A ${r} ${r} 0 0 1 ${120 - r} ${120}
		  H${-120 + r}
		  A ${r} ${r} 0 0 1 ${-120} ${120 - r}
		  Z
  " fill="${background}" />
  <g class="CSS"
    stroke-width="${thickness}" stroke="${foreground}"
    transform="translate(${120 - k - w1} ${120 - h1 - h2 - k})"
  >
    <path class="C"
      transform="translate(-${w1 * 4 + k * 2} 0)"
      d="${drawC({ h1, h2, w1, t1, t2, t3 })}"
    />
    <path class="S"
      transform="translate(-${w1 * 2 + k * 1} 0)"
      d="${drawS({ h1, h2, w1, t1, t2, t3 })}"
    />
    <path class="S"
      transform="translate(-${w1 * 0 + k * 0} 0)"
      d="${drawS({ h1, h2, w1, t1, t2, t3 })}"
    />
  </g>
</svg>`;
}

if (import.meta.main) {
  await Deno.writeTextFile("css.svg", draw("white", "rebeccapurple"));
}

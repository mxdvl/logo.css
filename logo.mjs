if (import.meta.main) {
  console.log(draw());
}

/**
 * @param {object} options
 * @param {number} options.h1 vertical position of A, C, D & F
 * @param {number} options.h2 vertical position of B & E
 * @param {number} options.w1 horizontal position of A, C, D & F
 *
 * ```
 * .  ╋━w1━┫
 * ╭──╴B╶──╮  ┳
 * │       │  h2
 * C       A  ╋
 * │          h1
 * ╰───╂───╮  ┻
 * .       │
 * F       D
 * │       │
 * ╰──╴E╶──╯
 * ```
 */
function drawS({ h1, h2, w1 }) {
  const A = /** @type {const} */ ([w1, -h1]);
  const B = /** @type {const} */ ([0, -(h1 + h2)]);
  const C = /** @type {const} */ ([-w1, -h1]);
  const D = /** @type {const} */ ([w1, h1]);
  const E = /** @type {const} */ ([0, h1 + h2]);
  const F = /** @type {const} */ ([-w1, h1]);
  return [
    `M ${A}`,
    `L ${B}`,
    `L ${C}`,
    `L ${D}`,
    `L ${E}`,
    `L ${F}`,
  ].join(" \n");
}

/**
 * @param {object} options
 * @param {number} options.h1 vertical position of A, C, D & F
 * @param {number} options.h2 vertical position of B & E
 * @param {number} options.w1 horizontal position of A, C, D & F
 *
 * ```
 * .  ╋━w1━┫
 * ╭──╴B╶──╮  ┳
 * │       │  h2
 * C       A  ╋
 * │          h1
 * │   ╋      ┻
 * │
 * D       F
 * │       │
 * ╰──╴E╶──╯
 * ```
 */
function drawC({ h1, h2, w1 }) {
  const A = /** @type {const} */ ([w1, -h1]);
  const B = /** @type {const} */ ([0, -(h1 + h2)]);
  const C = /** @type {const} */ ([-w1, -h1]);
  const D = /** @type {const} */ ([-w1, h1]);
  const E = /** @type {const} */ ([0, h1 + h2]);
  const F = /** @type {const} */ ([w1, h1]);
  return [
    `M ${A}`,
    `L ${B}`,
    `L ${C}`,
    `L ${D}`,
    `L ${E}`,
    `L ${F}`,
  ].join(" \n");
}

export function draw() {
  const w1 = 20;
  const h1 = 30;
  const h2 = 10;
  const k = 5;
  return `<svg viewBox="-120 -120 240 240" fill=none stroke=black>
  <path class="C"
    transform="translate(${w1 * 0 + k * 0} 0)"
    d="${drawC({ h1, h2, w1 })}"
  />
  <path class="S"
    transform="translate(${w1 * 2 + k * 1} 0)"
    d="${drawS({ h1, h2, w1 })}"
  />
  <path class="S"
    transform="translate(${w1 * 4 + k * 2} 0)"
    d="${drawS({ h1, h2, w1 })}"
  />
</svg>`;
}

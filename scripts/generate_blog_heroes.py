#!/usr/bin/env python3
"""Original 16:9 editorial stills for Funimation blog heroes.

Locked stock-subject briefs (not portfolio / case crops). Site palette only:
off-white field, purple #6C4DFF, orange #FF6B35. No text, watermarks,
photo-real clutter, or video-player chrome.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "images" / "blog"

W, H = 1600, 900
SCALE = 2
SW, SH = W * SCALE, H * SCALE

BG = (250, 250, 248)
PURPLE = (108, 77, 255)
ORANGE = (255, 107, 53)
INK = (26, 29, 36)
MUTED = (91, 101, 112)
LINE = (214, 211, 204)
CARD = (255, 255, 255)
WELL = (245, 244, 241)
SOFT = (232, 230, 225)


def new_canvas(color=BG) -> Image.Image:
    return Image.new("RGB", (SW, SH), color)


def finish(im: Image.Image, name: str) -> None:
    out = im.resize((W, H), Image.Resampling.LANCZOS)
    dest = OUT / name
    out.save(dest, "JPEG", quality=92, optimize=True, progressive=True)
    print(f"wrote {dest} {out.size}")


def rr(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def disk(draw, cx, cy, r, fill=None, outline=None, width=1):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill, outline=outline, width=width)


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def shade(color, t):
    """t<1 darkens toward ink, t>1 lifts toward white."""
    if t <= 1:
        return mix(INK, color, t)
    return mix(color, CARD, min(1.0, t - 1.0))


def paste_rgba(base: Image.Image, layer: Image.Image) -> Image.Image:
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def soft_sphere(base: Image.Image, cx: int, cy: int, r: int, color: tuple[int, int, int]) -> None:
    """Soft 3D orb: rim shade, body, specular, contact shadow."""
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse((cx - r * 0.70, cy + r * 0.58, cx + r * 0.78, cy + r * 0.88), fill=(26, 29, 36, 42))
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(8, r // 10)))
    base.paste(paste_rgba(base, shadow))

    orb = Image.new("RGBA", base.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(orb)
    steps = max(40, r // 2)
    for i in range(steps, 0, -1):
        t = i / steps
        # darker at rim, mid in core
        body = mix(shade(color, 0.62), color, 1 - (1 - t) * 0.15)
        od.ellipse((cx - i * r / steps, cy - i * r / steps, cx + i * r / steps, cy + i * r / steps), fill=(*body, 255))
    # lifted quarter toward the light
    lift = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(lift)
    lx, ly, lr = int(cx - r * 0.18), int(cy - r * 0.22), int(r * 0.72)
    ld.ellipse((lx - lr, ly - lr, lx + lr, ly + lr), fill=(*mix(color, CARD, 0.28), 150))
    lift = lift.filter(ImageFilter.GaussianBlur(max(6, r // 14)))
    spec = Image.new("RGBA", base.size, (0, 0, 0, 0))
    spd = ImageDraw.Draw(spec)
    sx, sy, sr = int(cx - r * 0.30), int(cy - r * 0.34), int(r * 0.13)
    spd.ellipse((sx - sr, sy - sr, sx + sr, sy + sr), fill=(255, 255, 255, 200))
    spec = spec.filter(ImageFilter.GaussianBlur(max(2, r // 40)))
    composed = Image.alpha_composite(Image.alpha_composite(orb, lift), spec)
    base.paste(paste_rgba(base, composed))


def draw_2d_character(draw: ImageDraw.ImageDraw, ox: int, oy: int, s: int) -> None:
    """Flat geometric character — hard edges, no gradients."""
    # ground shadow (flat, not 3D)
    draw.ellipse((ox - int(0.34 * s), oy + int(0.56 * s), ox + int(0.34 * s), oy + int(0.66 * s)), fill=SOFT)
    rr(draw, (ox - int(0.22 * s), oy + int(0.18 * s), ox - int(0.04 * s), oy + int(0.60 * s)), int(0.07 * s), PURPLE)
    rr(draw, (ox + int(0.04 * s), oy + int(0.18 * s), ox + int(0.22 * s), oy + int(0.60 * s)), int(0.07 * s), PURPLE)
    rr(draw, (ox - int(0.32 * s), oy - int(0.26 * s), ox + int(0.32 * s), oy + int(0.22 * s)), int(0.16 * s), PURPLE)
    rr(draw, (ox - int(0.58 * s), oy - int(0.16 * s), ox - int(0.32 * s), oy + int(0.04 * s)), int(0.09 * s), ORANGE)
    rr(draw, (ox + int(0.32 * s), oy - int(0.16 * s), ox + int(0.58 * s), oy + int(0.04 * s)), int(0.09 * s), ORANGE)
    disk(draw, ox, oy - int(0.48 * s), int(0.22 * s), INK)
    disk(draw, ox - int(0.07 * s), oy - int(0.50 * s), int(0.028 * s), CARD)
    disk(draw, ox + int(0.07 * s), oy - int(0.50 * s), int(0.028 * s), CARD)
    rr(draw, (ox - int(0.10 * s), oy - int(0.08 * s), ox + int(0.10 * s), oy + int(0.06 * s)), int(0.04 * s), ORANGE)


def hero_2d_vs_3d() -> None:
    im = new_canvas()
    # split wash
    left = Image.new("RGB", (SW // 2, SH), (247, 246, 252))
    right = Image.new("RGB", (SW - SW // 2, SH), (252, 247, 244))
    im.paste(left, (0, 0))
    im.paste(right, (SW // 2, 0))
    draw = ImageDraw.Draw(im)
    draw.line((SW // 2, int(0.14 * SH), SW // 2, int(0.86 * SH)), fill=LINE, width=3)

    draw_2d_character(draw, int(0.26 * SW), int(0.54 * SH), int(0.36 * SH))
    soft_sphere(im, int(0.73 * SW), int(0.48 * SH), int(0.20 * SH), PURPLE)
    soft_sphere(im, int(0.86 * SW), int(0.66 * SH), int(0.065 * SH), ORANGE)
    finish(im, "2d-vs-3d-hero.jpg")


def vector_icon(draw, kind: str, x: int, y: int, r: int, color) -> None:
    if kind == "circle":
        disk(draw, x, y, r, None, color, width=12)
        disk(draw, x, y, int(r * 0.40), color)
    elif kind == "squircle":
        rr(draw, (x - r, y - r, x + r, y + r), int(r * 0.36), None, color, width=12)
        rr(
            draw,
            (x - int(r * 0.38), y - int(r * 0.38), x + int(r * 0.38), y + int(r * 0.38)),
            int(r * 0.16),
            color,
        )
    else:
        # filled diamond with matching stroke weight
        outer = [(x, y - r - 4), (x + r + 4, y), (x, y + r + 4), (x - r - 4, y)]
        inner = [(x, y - r + 10), (x + r - 10, y), (x, y + r - 10), (x - r + 10, y)]
        draw.polygon(outer, fill=color)
        draw.polygon(inner, fill=BG)
        core = [(x, y - int(r * 0.32)), (x + int(r * 0.32), y), (x, y + int(r * 0.32)), (x - int(r * 0.32), y)]
        draw.polygon(core, fill=color)


def chevron_down(draw, x, y, color=SOFT):
    draw.polygon([(x - 12, y - 8), (x + 12, y - 8), (x, y + 12)], fill=color)


def hero_rive_vs_lottie() -> None:
    im = new_canvas()
    draw = ImageDraw.Draw(im)

    # left: state-machine column of vector icons
    states = [
        ("circle", PURPLE),
        ("squircle", ORANGE),
        ("diamond", PURPLE),
    ]
    r = int(0.068 * SH)
    xs = int(0.20 * SW)
    ys = [int(0.28 * SH), int(0.50 * SH), int(0.72 * SH)]
    for i, ((kind, color), y) in enumerate(zip(states, ys)):
        # faint card so icons read as UI states
        rr(draw, (xs - int(0.085 * SW), y - int(0.085 * SH), xs + int(0.085 * SW), y + int(0.085 * SH)), 36, CARD, LINE, width=3)
        vector_icon(draw, kind, xs, y, r, color)
        if i < 2:
            mid = (y + ys[i + 1]) // 2
            draw.line((xs, y + int(0.085 * SH) + 6, xs, mid - 16), fill=LINE, width=5)
            chevron_down(draw, xs, mid, MUTED)
            draw.line((xs, mid + 16, xs, ys[i + 1] - int(0.085 * SH) - 6), fill=LINE, width=5)

    # right: timeline metaphor
    tx0, tx1 = int(0.40 * SW), int(0.90 * SW)
    ty = int(0.42 * SH)
    draw.line((tx0, ty, tx1, ty), fill=LINE, width=10)
    ticks = 7
    for i in range(ticks):
        x = tx0 + int((tx1 - tx0) * i / (ticks - 1))
        disk(draw, x, ty, 16, WELL, LINE, width=5)

    k1 = tx0 + int((tx1 - tx0) * 2 / 6)
    k2 = tx0 + int((tx1 - tx0) * 5 / 6)
    disk(draw, k1, ty, 26, PURPLE)
    disk(draw, k2, ty, 26, ORANGE)

    # playhead — readable flag above the track
    px = tx0 + int((tx1 - tx0) * 0.42)
    draw.rectangle((px - 5, ty - 128, px + 5, ty - 16), fill=INK)
    draw.polygon([(px + 5, ty - 128), (px + 64, ty - 98), (px + 5, ty - 68)], fill=INK)

    # secondary keyed track (motion bars)
    ty2 = int(0.66 * SH)
    draw.line((tx0, ty2, tx1, ty2), fill=SOFT, width=8)
    spans = [
        (0.06, 0.22, PURPLE),
        (0.30, 0.48, ORANGE),
        (0.56, 0.70, PURPLE),
        (0.78, 0.94, ORANGE),
    ]
    for a, b, color in spans:
        x0 = tx0 + int((tx1 - tx0) * a)
        x1 = tx0 + int((tx1 - tx0) * b)
        rr(draw, (x0, ty2 - 16, x1, ty2 + 16), 12, color)

    finish(im, "rive-vs-lottie-hero.jpg")


def mini_figure(draw, x, y, s, color):
    disk(draw, x, y - int(s * 0.62), int(s * 0.20), color)
    rr(draw, (x - int(s * 0.20), y - int(s * 0.38), x + int(s * 0.20), y + int(s * 0.10)), int(s * 0.12), color)
    rr(draw, (x - int(s * 0.16), y + int(s * 0.08), x - int(s * 0.02), y + int(s * 0.42)), int(s * 0.07), color)
    rr(draw, (x + int(s * 0.02), y + int(s * 0.08), x + int(s * 0.16), y + int(s * 0.42)), int(s * 0.07), color)


def storyboard_frame(draw, box, scene: int) -> None:
    x0, y0, x1, y1 = box
    rr(draw, box, 28, CARD, LINE, width=4)
    cx = (x0 + x1) // 2
    ground_y = y0 + int((y1 - y0) * 0.72)
    draw.line((x0 + 28, ground_y, x1 - 28, ground_y), fill=LINE, width=4)
    s = int((x1 - x0) * 0.36)
    if scene == 0:
        # empty beat — mark where the subject will land
        disk(draw, cx, ground_y - 8, 10, None, LINE, width=4)
    elif scene == 1:
        mini_figure(draw, cx, ground_y, s, PURPLE)
    elif scene == 2:
        mini_figure(draw, cx - int((x1 - x0) * 0.16), ground_y, int(s * 0.92), PURPLE)
        mini_figure(draw, cx + int((x1 - x0) * 0.16), ground_y, int(s * 0.92), ORANGE)
    else:
        mini_figure(draw, cx - int((x1 - x0) * 0.20), ground_y, int(s * 0.80), PURPLE)
        mini_figure(draw, cx, ground_y, int(s * 0.80), ORANGE)
        mini_figure(draw, cx + int((x1 - x0) * 0.20), ground_y, int(s * 0.80), INK)


def hero_explainer() -> None:
    im = new_canvas()
    draw = ImageDraw.Draw(im)
    margin_x = int(0.07 * SW)
    margin_y = int(0.20 * SH)
    rr(draw, (margin_x, margin_y, SW - margin_x, SH - margin_y), 48, WELL)

    n = 4
    gap = int(0.022 * SW)
    pad = int(0.038 * SW)
    inner_w = SW - 2 * margin_x - 2 * pad - (n - 1) * gap
    fw = inner_w // n
    fh = int(0.42 * SH)
    fy0 = (SH - fh) // 2
    frames = []
    for i in range(n):
        x0 = margin_x + pad + i * (fw + gap)
        frames.append((x0, fy0, x0 + fw, fy0 + fh))
        storyboard_frame(draw, frames[-1], i)

    for i in range(n - 1):
        x0 = frames[i][2]
        x1 = frames[i + 1][0]
        mid = (x0 + x1) // 2
        y = (fy0 + fy0 + fh) // 2
        draw.line((x0 + 6, y, x1 - 6, y), fill=LINE, width=6)
        draw.polygon([(mid - 7, y - 11), (mid + 12, y), (mid - 7, y + 11)], fill=MUTED)

    finish(im, "explainer-video-length-hero.jpg")


def dashed_rounded_rect(draw, box, radius, color, dash=18, gap=12, width=5):
    """Approximate a dashed rounded rect with short strokes along the path."""
    x0, y0, x1, y1 = box
    # sample a stadium-ish path
    pts = []
    # top
    for x in range(x0 + radius, x1 - radius, 1):
        pts.append((x, y0))
    # TR corner
    for t in range(270, 361):
        pts.append((x1 - radius + radius * math.cos(math.radians(t)), y0 + radius + radius * math.sin(math.radians(t))))
    for y in range(y0 + radius, y1 - radius, 1):
        pts.append((x1, y))
    for t in range(0, 91):
        pts.append((x1 - radius + radius * math.cos(math.radians(t)), y1 - radius + radius * math.sin(math.radians(t))))
    for x in range(x1 - radius, x0 + radius, -1):
        pts.append((x, y1))
    for t in range(90, 181):
        pts.append((x0 + radius + radius * math.cos(math.radians(t)), y1 - radius + radius * math.sin(math.radians(t))))
    for y in range(y1 - radius, y0 + radius, -1):
        pts.append((x0, y))
    for t in range(180, 271):
        pts.append((x0 + radius + radius * math.cos(math.radians(t)), y0 + radius + radius * math.sin(math.radians(t))))

    # walk path by approximate pixel distance
    acc = 0.0
    drawing = True
    last = pts[0]
    run = 0.0
    for p in pts[1:]:
        d = math.hypot(p[0] - last[0], p[1] - last[1])
        run += d
        limit = dash if drawing else gap
        if run >= limit:
            if drawing:
                draw.line((last[0], last[1], p[0], p[1]), fill=color, width=width)
            drawing = not drawing
            run = 0.0
        elif drawing:
            draw.line((last[0], last[1], p[0], p[1]), fill=color, width=width)
        last = p
        acc += d


def phone_chrome(draw, box, state: str) -> None:
    x0, y0, x1, y1 = box
    rr(draw, box, 56, CARD, LINE, width=6)
    cx = (x0 + x1) // 2
    rr(draw, (cx - 44, y0 + 30, cx + 44, y0 + 48), 10, SOFT)
    wx0, wy0 = x0 + 40, y0 + 88
    wx1, wy1 = x1 - 40, y1 - 56
    if state == "empty":
        rr(draw, (wx0, wy0, wx1, wy1), 32, WELL)
        dashed_rounded_rect(draw, (wx0 + 18, wy0 + 18, wx1 - 18, wy1 - 18), 24, LINE, dash=22, gap=14, width=6)
    else:
        rr(draw, (wx0, wy0, wx1, wy1), 32, (247, 244, 255))
        cx2, cy2 = (wx0 + wx1) // 2, (wy0 + wy1) // 2
        disk(draw, cx2, cy2, 64, PURPLE)
        draw.line((cx2 - 32, cy2 + 4, cx2 - 8, cy2 + 28), fill=CARD, width=14)
        draw.line((cx2 - 8, cy2 + 28, cx2 + 34, cy2 - 22), fill=CARD, width=14)


def tap_hand(draw, cx, cy, s: int) -> None:
    """Stylized pointing hand + tap ripples. Geometric, not photoreal."""
    disk(draw, cx, cy, int(s * 0.82), None, (255, 176, 148), width=5)
    disk(draw, cx, cy, int(s * 0.56), None, ORANGE, width=7)
    disk(draw, cx, cy, int(s * 0.16), ORANGE)

    fw = int(s * 0.22)
    # index finger — vertical capsule, tip on the tap
    rr(draw, (cx - fw // 2, cy - int(s * 0.02), cx + fw // 2, cy + int(s * 0.78)), fw // 2, INK)
    disk(draw, cx, cy + int(s * 0.02), fw // 2, INK)
    # knuckle / other fingers as a rounded block
    rr(
        draw,
        (cx - int(s * 0.06), cy + int(s * 0.52), cx + int(s * 0.62), cy + int(s * 1.18)),
        int(s * 0.16),
        INK,
    )
    # thumb to the left
    rr(
        draw,
        (cx - int(s * 0.52), cy + int(s * 0.58), cx + int(s * 0.02), cy + int(s * 0.86)),
        int(s * 0.14),
        INK,
    )


def hero_onboarding() -> None:
    im = new_canvas()
    draw = ImageDraw.Draw(im)
    phone_w, phone_h = int(0.22 * SW), int(0.64 * SH)
    y0 = (SH - phone_h) // 2
    left = (int(0.13 * SW), y0, int(0.13 * SW) + phone_w, y0 + phone_h)
    right = (int(0.65 * SW), y0, int(0.65 * SW) + phone_w, y0 + phone_h)
    phone_chrome(draw, left, "empty")
    phone_chrome(draw, right, "success")
    tap_hand(draw, int(0.50 * SW), int(0.46 * SH), int(0.15 * SH))
    for i, x in enumerate((int(0.42 * SW), int(0.50 * SW), int(0.58 * SW))):
        disk(draw, x, int(0.88 * SH), 11, PURPLE if i == 1 else SOFT)
    finish(im, "saas-onboarding-hero.jpg")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    hero_2d_vs_3d()
    hero_rive_vs_lottie()
    hero_explainer()
    hero_onboarding()


if __name__ == "__main__":
    main()

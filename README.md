![Menu](public/assets/icon128.png)

# tailwindcss-decompiler

An extension that enables free access to Tailwind UI.

## Note
This project does not work right now because Tailwind UI started using tailwindcss v4 and this broke bunch of things.

I don't really know if i want to fix it, its an old project, and i think i would be better rewriting it from scratch again.

Another thing is, that i respect the Tailwind team and what they do, and this thing does not really help them.

## Installation

1. Download the latest [release](https://github.com/Ev357/tailwindcss-decompiler/releases).
2.
- On Firefox, go to [This firefox](about:debugging#/runtime/this-firefox) and click "Load Temporary Add-on" and select the downloaded release.
- On Chrome, go to [Extenions](chrome://extensions), enable "Developer mode", unzip the downloaded release and click "Load unpacked".

## Usage

Just go to [tailwindui.com](https://tailwindui.com) and enjoy.

## How it works

This extensions takes the "encrypted" paid Tailwind UI code:
```html
<div class="fy hs la vt cmz dls dmm dmx dpx dqf ebt">
    <div class="vu wt crd dpx">
        <div class="ff agg all ati ber bga bjg dlj dtp dvt"></div>
    </div>
</div>
```

And decrypts it to the original code:
```html
i could not get an example, because as in time of writing this README, it stopped working as stated above.
```

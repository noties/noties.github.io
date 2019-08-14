# GIF

```
ffmpeg -y -i 1.mp4 -vf fps=12,scale=320:-1:flags=lanczos,palettegen palette.png
```

```
ffmpeg -i 1.mp4 -i palette.png -filter_complex "fps=12,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse" output.gif
```

# Video

450x800 is scaled down for Pixel XL (different device might need different output resolution)

## Generated webm
```
ffmpeg -fflags +genpts -i 1.mp4 -r 24 -vf scale=450:800 1.webm
ffmpeg -fflags +genpts -i 0.mp4 -r 24 -vf scale=450:800 1.mp4
```

## Generate preview (first frame)
```
ffmpeg -ss 0.0 -i 1.mp4 -t 1 -f image2 -vframes 1  -s 450x800 1.jpg
```

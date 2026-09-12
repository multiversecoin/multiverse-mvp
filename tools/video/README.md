# Geração do vídeo de pitch (2 minutos)

Pipeline que gera `multiverse-coin-2min.mp4` (1080p, ~112s) a partir do próprio MVP,
seguindo o roteiro de `VIDEO_SCRIPT_2MIN.md`.

## Requisitos

```bash
pip install edge-tts playwright && python3 -m playwright install chromium
# ffmpeg disponível no PATH
```

## Passos

```bash
# servir o MVP (raiz do repositório)
python3 -m http.server 8000

cd tools/video
python3 narration.py   # gera audio/*.mp3 (TTS pt-BR) + durations.json
python3 record.py      # grava stage.html em 1920x1080 (slides + app real no mockup)
bash compose.sh        # sincroniza narração + vídeo e exporta o MP4
```

`stage.html` (na raiz) é o palco da gravação: painel de texto à esquerda e o
`index.html` do MVP rodando num mockup de celular à direita, controlado via
`appCall`/`appScroll` pelo script de gravação.

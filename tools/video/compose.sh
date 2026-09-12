#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
A=audio
VID=$(ls rec/*.webm)
VDUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$VID")
EXP=$(python3 -c "import json;print(json.load(open('rec_meta.json'))['expected'])")
OFF=$(python3 -c "print(max(0,$VDUR-$EXP))")
echo "video=$VDUR expected=$EXP trim_start=$OFF"

sil() { ffmpeg -y -v error -f lavfi -i anullsrc=r=44100:cl=stereo -t "$1" -c:a libmp3lame "$2"; }
sil 0.8 $A/pad_start.mp3
sil 1.2 $A/gap.mp3
sil 2.0 $A/pad_end.mp3

cat > $A/list.txt <<EOF
file 'pad_start.mp3'
file 's1.mp3'
file 'gap.mp3'
file 's2.mp3'
file 'gap.mp3'
file 's3.mp3'
file 'gap.mp3'
file 's4.mp3'
file 'gap.mp3'
file 's5.mp3'
file 'gap.mp3'
file 's6.mp3'
file 'pad_end.mp3'
EOF
ffmpeg -y -v error -f concat -safe 0 -i $A/list.txt -c:a libmp3lame -q:a 2 $A/voice.mp3
ADUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 $A/voice.mp3)
echo "audio=$ADUR"

ffmpeg -y -v error -ss "$OFF" -i "$VID" -i $A/voice.mp3 \
  -filter_complex "[0:v]fps=30,scale=1920:1080,format=yuv420p,fade=t=in:st=0:d=0.6,fade=t=out:st=$(python3 -c "print(round($ADUR-1.0,2))"):d=1.0[v];[1:a]afade=t=out:st=$(python3 -c "print(round($ADUR-1.2,2))"):d=1.2[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -preset medium -crf 20 -c:a aac -b:a 192k -movflags +faststart \
  -t "$ADUR" multiverse-coin-2min.mp4
ffprobe -v error -show_entries format=duration,size -of default=nw=1 multiverse-coin-2min.mp4

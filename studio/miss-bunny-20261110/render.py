"""Deterministic motion composition of approved, generated Bunny artwork.
No character redrawing. Requirements: Pillow, numpy, ffmpeg.
Run: python3 render.py from this directory.
"""
from pathlib import Path
import math, subprocess, json, hashlib, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT=Path(__file__).parent
ART=ROOT/'assets'; ART.mkdir(exist_ok=True)
SOURCE=ROOT.parent/'generated_images'
NAMES={
 'exec-c8c05251-88cf-4977-be7b-dd24198af602.png':'01-first-style-exploration.png',
 'exec-e7837513-7fdd-4f74-98b1-a25fd2d55c0a.png':'02-first-line-art.png',
 'exec-300f6955-01b2-44d6-bf82-cdf220b44646.png':'03-approved-first-color.png',
 'exec-f15ae0fa-4180-437e-9a57-0cf330e6354b.png':'04-chibi-exploration-not-selected.png',
 'exec-9efd7347-d410-4bf2-9f5e-a3f75168d10b.png':'05-chibi-line-not-selected.png',
 'exec-7e90fce8-319f-4383-99f4-ff442b6853a2.png':'06-chibi-color-not-selected.png',
 'exec-d2ee63e9-fffb-43f0-9367-2be6cae893fa.png':'07-family-sprite-atlas.png',
 'exec-b025ad82-9d38-4474-afd7-476aaeaa8a7d.png':'08-family-sketch.png',
 'exec-42b1259e-cef7-4815-b3dd-fc8ed2ecea14.png':'09-castle-seated-study.png',
 'exec-a67208f0-8180-4fac-8845-b75a360bd232.png':'10-castle-standing-final.png',
}
for src,dst in NAMES.items():
 if (SOURCE/src).exists(): shutil.copy2(SOURCE/src,ART/dst)
cover=ROOT.parent/'upload/MissBunny_Vol1_Cover_Traditional_1600x2560.jpg'
if cover.exists(): shutil.copy2(cover,ART/'11-current-book-cover-reference.jpg')
for path in sorted(ART.glob('*.png')):
 if path.name=='07-family-sprite-atlas.png': continue
 im=Image.open(path).convert('RGB')
 im.save(path.with_suffix('.jpg'),quality=92,optimize=True)

INK='#121638'; PURPLE='#783de2'
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
SERIF='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'
atlas=Image.open(ART/'07-family-sprite-atlas.png').convert('RGBA')
sprites=[]
for i in range(6):
 x=(i%3)*512; y=(i//3)*512
 s=atlas.crop((x,y,x+512,y+512))
 sprites.append(s)

def centered(draw,text,y,size,fill=INK,serif=False,w=1080):
 f=ImageFont.truetype(SERIF if serif else FONT,size)
 box=draw.textbbox((0,0),text,font=f)
 draw.text(((w-(box[2]-box[0]))/2,y),text,font=f,fill=fill)

def family(t,size=1080):
 canvas=Image.new('RGBA',(1080,1080),'white'); d=ImageDraw.Draw(canvas)
 centered(d,'MISS BUNNY',55,54,serif=True)
 centered(d,'ONE CHARACTER. MANY WAYS TO CREATE.',130,18)
 labels=['Classic','Pencil','Spot colour','2D','Watercolour','Storybook']
 for i,s in enumerate(sprites):
  phase=2*math.pi*t/4+i*.75
  h=330; sc=1+.018*math.sin(phase)
  layer=s.resize((int(h*sc),int(h*sc)),Image.Resampling.LANCZOS)
  layer=layer.rotate(1.2*math.sin(phase),resample=Image.Resampling.BICUBIC,expand=True)
  cx=190+(i%3)*350; cy=374+(i//3)*400
  canvas.alpha_composite(layer,(round(cx-layer.width/2),round(cy-layer.height/2+7*math.sin(phase))))
  f=ImageFont.truetype(FONT,19)
  box=d.textbbox((0,0),labels[i],font=f)
  d.text((cx-(box[2]-box[0])/2,cy+175),labels[i],font=f,fill=INK)
 centered(d,'Joyce Mi  /  SAGA1001',1016,18)
 return canvas.convert('RGB').resize((size,size),Image.Resampling.LANCZOS)

def encode(name,w,h,duration,fps,render):
 cmd=['ffmpeg','-y','-loglevel','error','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',str(ART/name)]
 p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for k in range(round(duration*fps)):
  p.stdin.write(render(k/fps).tobytes())
 p.stdin.close()
 if p.wait(): raise RuntimeError('ffmpeg encode failed')

family(0).save(ART/'12-family-portrait.jpg',quality=94)
encode('13-family-loop.mp4',1080,1080,8,24,lambda t:family(t))
g=[family(i/12,600) for i in range(48)]
g[0].save(ART/'14-family-loop.gif',save_all=True,append_images=g[1:],duration=round(1000/12),loop=0,optimize=True)

sketch=Image.open(ART/'08-family-sketch.png').convert('RGB')
castle=Image.open(ART/'10-castle-standing-final.png').convert('RGB')
def slide(im,title,sub,progress):
 out=Image.new('RGB',(1440,960),'white'); d=ImageDraw.Draw(out)
 centered(d,title,40,43,serif=True,w=1440)
 centered(d,sub,103,19,w=1440)
 # Full image retained. Gentle deterministic breathing scale within safe margins.
 box=(1320,750)
 target=ImageOps.contain(im,box,Image.Resampling.LANCZOS)
 factor=.98+.02*progress
 target=target.resize((round(target.width*factor),round(target.height*factor)),Image.Resampling.LANCZOS)
 out.paste(target,((1440-target.width)//2,160+(750-target.height)//2))
 centered(d,'MISS BUNNY  /  Joyce Mi  /  SAGA1001',928,14,w=1440)
 return out

def film(t):
 if t<5:
  im=family(t,760)
  return slide(im,'One Bunny. Many possibilities.','A visual family, built from the same simple silhouette.',t/5)
 if t<9:
  a=slide(sketch,'Begin with a sketch.','Simple lines. A familiar face. Room for imagination.',(t-5)/4)
  if t<5.5: return Image.blend(film(4.99),a,(t-5)/.5)
  return a
 if t<16:
  a=slide(castle,'Let a whole world grow.','A little artist. A sketch. A castle from imagination.',(t-9)/7)
  if t<9.5: return Image.blend(film(8.99),a,(t-9)/.5)
  return a
 a=slide(Image.open(ART/'03-approved-first-color.png').convert('RGB'),'Keep the character. Explore the medium.','Discover the Miss Bunny creative journal at saga1001.com',1)
 if t<16.5: return Image.blend(film(15.99),a,(t-16)/.5)
 return a
encode('15-creative-process.mp4',1440,960,18,24,film)

# QA contact sheet extracted from the actual encoded video.
times=[0,4.8,5.3,7,9.3,12,15.7,17.5]
sheet=Image.new('RGB',(1200,460),'#f8f8fb')
for i,t in enumerate(times):
 p=subprocess.run(['ffmpeg','-loglevel','error','-ss',str(t),'-i',str(ART/'15-creative-process.mp4'),'-frames:v','1','-f','image2pipe','-vcodec','png','-'],capture_output=True,check=True)
 import io
 im=Image.open(io.BytesIO(p.stdout)).convert('RGB').resize((300,200))
 sheet.paste(im,((i%4)*300,(i//4)*230))
 ImageDraw.Draw(sheet).text(((i%4)*300+8,(i//4)*230+205),str(t)+' s',fill=INK,font=ImageFont.truetype(FONT,15))
sheet.save(ROOT/'qa-contact-sheet.jpg',quality=92)
manifest=[]
for p in sorted(ART.iterdir()):
 if p.is_file(): manifest.append({'name':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(ROOT/'asset-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'files':len(manifest),'bytes':sum(x['bytes'] for x in manifest),'video':'18 seconds / 1440x960 / 24fps / silent','loop':'8 seconds / 1080 square / 24fps / silent'}))

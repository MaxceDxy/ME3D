
if (!window.THREE) {
  window.ME3DShowError('La bibliothèque 3D est indisponible', 'ME3D a besoin de Three.js pour afficher les planètes. Vérifie ta connexion Internet ou l’accès à cdnjs/jsDelivr, puis réessaie. Le fichier contient les textures, mais la bibliothèque 3D est chargée depuis un CDN.');
} else {
const monuments=[
  {name:'Paris',kind:'city',type:'city',country:'France',lat:48.8566,lon:2.3522,note:'Capitale française',aliases:['Paris, France']},
  {name:'Londres',kind:'city',type:'city',country:'Royaume-Uni',lat:51.5072,lon:-0.1276,note:'Capitale du Royaume-Uni',aliases:['London']},
  {name:'New York',kind:'city',type:'city',country:'États-Unis',lat:40.7128,lon:-74.0060,note:'Ville de la côte est des États-Unis',aliases:['New York City','NYC']},
  {name:'Los Angeles',kind:'city',type:'city',country:'États-Unis',lat:34.0522,lon:-118.2437,note:'Ville de Californie'},
  {name:'Mexico',kind:'city',type:'city',country:'Mexique',lat:19.4326,lon:-99.1332,note:'Capitale du Mexique',aliases:['Mexico City','Mexico-ville']},
  {name:'Rio de Janeiro',kind:'city',type:'city',country:'Brésil',lat:-22.9068,lon:-43.1729,note:'Ville du sud-est du Brésil'},
  {name:'Buenos Aires',kind:'city',type:'city',country:'Argentine',lat:-34.6037,lon:-58.3816,note:'Capitale de l’Argentine'},
  {name:'Reykjavik',kind:'city',type:'city',country:'Islande',lat:64.1466,lon:-21.9426,note:'Capitale de l’Islande',aliases:['Reykjavík']},
  {name:'Le Caire',kind:'city',type:'city',country:'Égypte',lat:30.0444,lon:31.2357,note:'Capitale de l’Égypte',aliases:['Cairo']},
  {name:'Nairobi',kind:'city',type:'city',country:'Kenya',lat:-1.2921,lon:36.8219,note:'Capitale du Kenya'},
  {name:'Le Cap',kind:'city',type:'city',country:'Afrique du Sud',lat:-33.9249,lon:18.4241,note:'Ville située à l’extrémité sud-ouest du pays',aliases:['Cape Town']},
  {name:'Tokyo',kind:'city',type:'city',country:'Japon',lat:35.6762,lon:139.6503,note:'Capitale du Japon'},
  {name:'Pékin',kind:'city',type:'city',country:'Chine',lat:39.9042,lon:116.4074,note:'Capitale de la Chine',aliases:['Beijing']},
  {name:'New Delhi',kind:'city',type:'city',country:'Inde',lat:28.6139,lon:77.2090,note:'Capitale de l’Inde',aliases:['Delhi']},
  {name:'Sydney',kind:'city',type:'city',country:'Australie',lat:-33.8688,lon:151.2093,note:'Grande ville de la côte est australienne'},
  {name:'Wellington',kind:'city',type:'city',country:'Nouvelle-Zélande',lat:-41.2866,lon:174.7756,note:'Capitale de la Nouvelle-Zélande'},
  {name:'Dubaï',kind:'city',type:'city',country:'Émirats arabes unis',lat:25.2048,lon:55.2708,note:'Ville des Émirats arabes unis',aliases:['Dubai']},
  {name:'Singapour',kind:'city',type:'city',country:'Singapour',lat:1.3521,lon:103.8198,note:'Cité-État d’Asie du Sud-Est',aliases:['Singapore']},
  {name:'Rome',kind:'city',type:'city',country:'Italie',lat:41.9028,lon:12.4964,note:'Capitale italienne'},
  {name:'Istanbul',kind:'city',type:'city',country:'Turquie',lat:41.0082,lon:28.9784,note:'Métropole située entre Europe et Asie'},
  {name:'Moscou',kind:'city',type:'city',country:'Russie',lat:55.7558,lon:37.6173,note:'Capitale de la Russie',aliases:['Moscow']},
  {name:'Anchorage',kind:'city',type:'city',country:'États-Unis · Alaska',lat:61.2181,lon:-149.9003,note:'Ville d’Alaska'},
  {name:'Honolulu',kind:'city',type:'city',country:'États-Unis · Hawaï',lat:21.3099,lon:-157.8581,note:'Ville de l’archipel hawaïen'},
  {name:'Jakarta',kind:'city',type:'city',country:'Indonésie',lat:-6.2088,lon:106.8456,note:'Grande ville indonésienne'},
  {name:'Ushuaïa',kind:'city',type:'city',country:'Argentine',lat:-54.8019,lon:-68.3030,note:'Ville de Terre de Feu',aliases:['Ushuaia']},
  {name:'Nuuk',kind:'city',type:'city',country:'Groenland',lat:64.1814,lon:-51.6941,note:'Capitale du Groenland'},
  {name:'Mont Everest',kind:'peak',type:'relief',country:'Népal / Chine',lat:27.9881,lon:86.9250,elev:8849,note:'Plus haut sommet terrestre mesuré',aliases:['Everest']},
  {name:'Fosse des Mariannes',kind:'trench',type:'relief',country:'Océan Pacifique',lat:11.35,lon:142.2,elev:-10994,note:'Profondeur indicative selon le secteur et la méthode de mesure',aliases:['Mariana Trench']}
]; // Repères géographiques de démonstration : coordonnées arrondies, catalogue volontairement non exhaustif.

(() => {
const DEG=Math.PI/180;
/* Textures servies en fichiers WebP — sources d’origine annoncées dans le prototype :
   • couleur du sol : NASA Blue Marble (images satellite, domaine public)
   • lumières nocturnes : NASA Black Marble (domaine public)
   • relief : modèle d'élévation numérique (NASA / topographie SRTM-GTOPO) et ombrage Natural Earth
   • nuages : composite satellite réel (couverture nuageuse mondiale)
   • planètes : textures Planet Pixel Emporium (J. Hastings-Trew) d'après des données NASA ; positions : éléments JPL ; orientation : IAU
   • côtes, lacs, fleuves, frontières, sommets : Natural Earth 1:10m (domaine public) */
const ASSET={day:'./assets/earth-day.webp',lights:'./assets/earth-night-lights.webp',height:'./assets/earth-height.webp',spec:'./assets/earth-specular.webp',borders:'./assets/earth-borders.webp',clouds:'./assets/earth-clouds.webp'};
const PTEX={mercury:'./assets/mercury.webp',venus:'./assets/venus.webp',mars:'./assets/mars.webp',jupiter:'./assets/jupiter.webp',saturn:'./assets/saturn.webp',saturnring:'./assets/saturn-rings.webp',saturnringalpha:'./assets/saturn-rings-alpha.webp',uranus:'./assets/uranus.webp',neptune:'./assets/neptune.webp',moon:'./assets/moon.webp',sun:'./assets/sun.webp'};
const PKEYS=Object.keys(PTEX);
const D_SCALE=0.032;            // exagération verticale du relief (≈ ×22 par rapport à la réalité)
const SEG_W=512, SEG_H=256;     // maillage de la sphère

/* ---------- Utilitaires (nuages et Lune procéduraux uniquement) ---------- */
function hashNoise(x,y){ let h=(Math.imul(x,374761393)+Math.imul(y,668265263))|0; h=Math.imul(h^(h>>>13),1274126177); return ((h^(h>>>16))>>>0)/4294967296; }
function smoothNoise(x,y){ const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;
  const a=hashNoise(xi,yi),b=hashNoise(xi+1,yi),c=hashNoise(xi,yi+1),d=hashNoise(xi+1,yi+1), u=xf*xf*(3-2*xf), v=yf*yf*(3-2*yf);
  return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
function fbm(x,y,oct){ let val=0,amp=0.5,freq=1,norm=0; for(let o=0;o<(oct||4);o++){ val+=smoothNoise(x*freq,y*freq)*amp; norm+=amp; amp*=0.5; freq*=2.03; } return val/norm; }
const lerp=(a,b,t)=>a+(b-a)*t, clamp01=v=>v<0?0:v>1?1:v, smooth=(a,b,v)=>{ const t=clamp01((v-a)/(b-a)); return t*t*(3-2*t); };
function toCanvas(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; }
function loadImage(src){ return new Promise((res,rej)=>{ const i=new Image(); i.onload=()=>res(i); i.onerror=()=>rej(new Error('Texture non chargée : '+String(src).split('/').pop())); i.decoding='async'; i.src=src; }); }


function latLonToVec3(lat,lon,radius){
  const phi=(90-lat)*DEG, theta=(lon+180)*DEG;
  return new THREE.Vector3(-radius*Math.sin(phi)*Math.cos(theta), radius*Math.cos(phi), radius*Math.sin(phi)*Math.sin(theta));
}
function vecToLatLon(v){
  const n=v.clone().normalize();
  const lat=Math.asin(Math.max(-1,Math.min(1,n.y)))/DEG;
  let lon=Math.atan2(n.z,-n.x)/DEG-180; lon=((lon+540)%360)-180;
  return {lat,lon};
}
const fmtLat=l=>Math.abs(l).toFixed(2)+'° '+(l>=0?'N':'S');
const fmtLon=l=>Math.abs(l).toFixed(2)+'° '+(l>=0?'E':'O');

const imageSources=[ASSET.day,ASSET.lights,ASSET.height,ASSET.spec,ASSET.borders,ASSET.clouds].concat(PKEYS.map(k=>PTEX[k]));
let imageLoaded=0;
function updateLoadingProgress(){
  const pct=Math.round(imageLoaded/imageSources.length*100);
  const label=document.getElementById('loadingText'),bar=document.getElementById('loadingProgress'),percent=document.getElementById('loadingPercent');
  if(label) label.textContent='Chargement des textures planétaires · '+imageLoaded+'/'+imageSources.length;
  if(bar) bar.style.width=pct+'%';
  if(percent) percent.textContent=pct+' %';
}
updateLoadingProgress();
Promise.all(imageSources.map(src=>loadImage(src).then(img=>{ imageLoaded++; updateLoadingProgress(); return img; }))).then(boot).catch(e=>{
  console.error('ME3D : échec du chargement ou de l’initialisation', e);
  if (window.ME3DShowError) window.ME3DShowError('Impossible de démarrer ME3D', 'Le navigateur n’a pas pu charger une texture ou initialiser WebGL. Vérifie que le dossier assets accompagne index.html et que l’accélération matérielle est disponible, puis réessaie. Détail : '+((e&&e.message)||String(e)).slice(0,180));
});

function boot(imgs){
  const [dayI,lightsI,heightI,specI,bordersI,cloudsI]=imgs; const P={}; PKEYS.forEach((k,i)=>{ P[k]=imgs[6+i]; });
  const canvas=document.getElementById('globe');
  const renderer=new THREE.WebGLRenderer({ canvas, antialias:true, alpha:false });
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.08;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 0.1, 200);
  camera.position.set(0,0,4.7);

  // étoiles (fond procédural : sera remplacé par un vrai catalogue dans la scène « Ciel »)
  let stars=null;
  {
    const g=new THREE.BufferGeometry(); const N=2600, pos=new Float32Array(N*3), col=new Float32Array(N*3);
    let seed=99; const rnd=()=>{ seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; };
    for(let i=0;i<N;i++){
      const r=60+rnd()*40, th=rnd()*Math.PI*2, ph=Math.acos(2*rnd()-1);
      pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.sin(ph)*Math.sin(th); pos[i*3+2]=r*Math.cos(ph);
      const b=0.45+rnd()*0.55, warm=rnd()<0.18, c=warm?[1,0.9,0.75]:[0.82,0.9,1];
      col[i*3]=c[0]*b; col[i*3+1]=c[1]*b; col[i*3+2]=c[2]*b;
    }
    g.setAttribute('position',new THREE.BufferAttribute(pos,3)); g.setAttribute('color',new THREE.BufferAttribute(col,3));
    stars=new THREE.Points(g,new THREE.PointsMaterial({ size:0.28, sizeAttenuation:true, transparent:true, opacity:.9, vertexColors:true, depthWrite:false })); scene.add(stars);
  }

  const sun=new THREE.DirectionalLight(0xfff1dc,1.6); sun.position.set(6,1.5,3); scene.add(sun);
  const ambient=new THREE.AmbientLight(0x2f4a78,0.40); scene.add(ambient);
  const hemi=new THREE.HemisphereLight(0x4a78b8,0x0a0f18,0.18); scene.add(hemi);
  const sunGlowTex=(()=>{ const c=toCanvas(256,256), g=c.getContext('2d'); const gr=g.createRadialGradient(128,128,0,128,128,128);
    gr.addColorStop(0,'rgba(255,248,230,1)'); gr.addColorStop(0.12,'rgba(255,230,180,0.75)'); gr.addColorStop(0.4,'rgba(255,190,110,0.18)'); gr.addColorStop(1,'rgba(255,170,90,0)');
    g.fillStyle=gr; g.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); })();
  const sunSprite=new THREE.Sprite(new THREE.SpriteMaterial({ map:sunGlowTex, blending:THREE.AdditiveBlending, transparent:true, depthWrite:false, opacity:0.9 }));
  sunSprite.scale.set(16,16,1); scene.add(sunSprite);

  const tiltGroup=new THREE.Group(); tiltGroup.rotation.z=-23.4*DEG; scene.add(tiltGroup);
  const globeGroup=new THREE.Group(); tiltGroup.add(globeGroup);

  /* ---------- Textures réelles ---------- */
  const maxAniso=renderer.capabilities.getMaxAnisotropy();
  const maxTex=renderer.capabilities.maxTextureSize||4096;
  const fit=img=>{ if(img.width<=maxTex) return img; const k=maxTex/img.width, c=toCanvas(maxTex,Math.round(img.height*k)); const x=c.getContext('2d'); x.imageSmoothingQuality='high'; x.drawImage(img,0,0,c.width,c.height); return c; };
  const mkTex=(img,srgb)=>{ const t=new THREE.Texture(fit(img)); t.needsUpdate=true; t.wrapS=THREE.RepeatWrapping; t.anisotropy=Math.min(8,maxAniso); if(srgb) t.encoding=THREE.sRGBEncoding; return t; };
  const dayTex=mkTex(dayI,true), lightsTex=mkTex(lightsI,false), heightTex=mkTex(heightI,false), specTex=mkTex(specI,false), bordersTex=mkTex(bordersI,true);

  // Fonctions topographiques héritées du prototype terrestre (scène non exposée dans ME3D)
  const hW=heightI.width, hH=heightI.height, hCtx=toCanvas(hW,hH).getContext('2d'); hCtx.drawImage(heightI,0,0);
  const hData=hCtx.getImageData(0,0,hW,hH).data;
  const heightAt=(lat,lon)=>{ const x=Math.min(hW-1,Math.max(0,Math.floor((lon+180)/360*hW))), y=Math.min(hH-1,Math.max(0,Math.floor((90-lat)/180*hH))); return hData[(y*hW+x)*4]/255; };
  // rayon réel du maillage à (lat,lon) : interpolation des 4 sommets voisins, comme le rendu GPU
  function terrainR(lat,lon){
    const fx=(lon+180)/360*SEG_W, fy=Math.min(SEG_H-1e-6,Math.max(0,(90-lat)/180*SEG_H));
    const i0=Math.floor(fx), j0=Math.floor(fy), tx=fx-i0, ty=fy-j0;
    const vh=(i,j)=>heightAt(90-j/SEG_H*180, ((((i%SEG_W)+SEG_W)%SEG_W)/SEG_W)*360-180);
    const h=(1-ty)*((1-tx)*vh(i0,j0)+tx*vh(i0+1,j0))+ty*((1-tx)*vh(i0,j0+1)+tx*vh(i0+1,j0+1));
    return 1+h*D_SCALE;
  }
  const sW=specI.width, sH=specI.height, sCtx=toCanvas(sW,sH).getContext('2d'); sCtx.drawImage(specI,0,0);
  const sData=sCtx.getImageData(0,0,sW,sH).data;
  function isOcean(lat,lon){ const x=Math.min(sW-1,Math.max(0,Math.floor((lon+180)/360*sW))), y=Math.min(sH-1,Math.max(0,Math.floor((90-lat)/180*sH))); return sData[(y*sW+x)*4]>128; }

  /* ---------- La Terre : un seul maillage, relief réel déplacé ---------- */
  const globeGeo=new THREE.SphereGeometry(1,SEG_W,SEG_H);
  const globeMat=new THREE.MeshPhongMaterial({
    map:dayTex, bumpMap:heightTex, bumpScale:0.02,
    displacementMap:heightTex, displacementScale:D_SCALE,
    specularMap:specTex, specular:0x9cc4ee, shininess:38
  });
  const globeMesh=new THREE.Mesh(globeGeo,globeMat); globeGroup.add(globeMesh);

  // lumières des villes (NASA Black Marble) : visibles uniquement du côté nuit, suivent le même relief
  const lightsU={ lightsMap:{value:lightsTex}, heightMap:{value:heightTex}, dScale:{value:D_SCALE}, sunDir:{value:new THREE.Vector3(1,0.2,0.5)}, intensity:{value:1.1} };
  const lightsMesh=new THREE.Mesh(globeGeo,new THREE.ShaderMaterial({
    uniforms:lightsU, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
    vertexShader:`uniform sampler2D heightMap; uniform float dScale; varying vec2 vUv; varying vec3 vNW;
      void main(){ vUv=uv; float h=texture2D(heightMap,uv).r; vec3 p=position+normal*(h*dScale+0.0012); vNW=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
    fragmentShader:`uniform sampler2D lightsMap; uniform vec3 sunDir; uniform float intensity; varying vec2 vUv; varying vec3 vNW;
      void main(){ vec3 L=texture2D(lightsMap,vUv).rgb; float d=dot(normalize(vNW),normalize(sunDir)); float night=1.0-smoothstep(-0.10,0.12,d); gl_FragColor=vec4(L*night*intensity,1.0); }`
  }));
  lightsMesh.renderOrder=1; globeGroup.add(lightsMesh);

  // frontières (Natural Earth) : calque optionnel posé sur le relief
  const bordersMesh=new THREE.Mesh(globeGeo,new THREE.MeshPhongMaterial({
    map:bordersTex, transparent:true, depthWrite:false, shininess:0, emissive:0x1b2636,
    displacementMap:heightTex, displacementScale:D_SCALE, displacementBias:0.0016
  }));
  bordersMesh.visible=false; bordersMesh.renderOrder=2; globeGroup.add(bordersMesh);

  // nuages : composite satellite réel (densité en niveaux de gris), deux couches avec parallaxe et relief éclairé
  const cloudTex=mkTex(cloudsI,false);
  const mkClouds=(r,op)=>new THREE.Mesh(new THREE.SphereGeometry(r,128,128),
    new THREE.MeshPhongMaterial({ color:0xffffff, alphaMap:cloudTex, bumpMap:cloudTex, bumpScale:1.4, transparent:true, depthWrite:false, opacity:op, shininess:0 }));
  const cloudsMesh=mkClouds(1.036,0.92), cloudsMesh2=mkClouds(1.046,0.34);
  cloudsMesh2.scale.x=-1; cloudsMesh2.rotation.y=1.1;
  globeGroup.add(cloudsMesh); globeGroup.add(cloudsMesh2);

  // atmosphère sensible au soleil
  const atmoUniforms={ sunV:{ value:new THREE.Vector3(1,0.2,0.5) } };
  const atmoOuter=new THREE.Mesh(
    new THREE.SphereGeometry(1.19,64,64),
    new THREE.ShaderMaterial({
      uniforms:atmoUniforms,
      vertexShader:`varying vec3 vNormal; void main(){ vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader:`uniform vec3 sunV; varying vec3 vNormal; void main(){ vec3 n=normalize(vNormal); float i=pow(max(0.0,0.70-dot(n,vec3(0.0,0.0,1.0))),4.0); float d=dot(n,normalize(sunV)); float day=smoothstep(-0.55,0.35,d); float tw=exp(-pow(d*3.2,2.0)); vec3 col=mix(vec3(0.38,0.64,1.0),vec3(1.0,0.52,0.28),tw*0.55); gl_FragColor=vec4(col,1.0)*i*(0.25+0.9*day); }`,
      blending:THREE.AdditiveBlending, side:THREE.BackSide, transparent:true, depthWrite:false
    })
  );
  scene.add(atmoOuter);
  const atmoInner=new THREE.Mesh(
    new THREE.SphereGeometry(1.06,64,64),
    new THREE.ShaderMaterial({
      vertexShader:`varying vec3 vNormal; void main(){ vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader:`varying vec3 vNormal; void main(){ float i=pow(1.0-abs(dot(vNormal,vec3(0.0,0.0,1.0))),3.2); gl_FragColor=vec4(0.45,0.70,1.0,1.0)*i*0.5; }`,
      blending:THREE.AdditiveBlending, side:THREE.FrontSide, transparent:true, depthWrite:false
    })
  );
  scene.add(atmoInner);

  // Lune
  const moonTex=mkTex(P.moon,true);
  const moon=new THREE.Mesh(new THREE.SphereGeometry(0.27,64,64), new THREE.MeshPhongMaterial({ map:moonTex, bumpMap:moonTex, bumpScale:0.12, shininess:2, specular:0x111111 }));
  scene.add(moon);
  let moonAngle=-0.62;
  function updateMoon(dt,rate){
    moonAngle+=dt*(rate===undefined?0.025:rate);
    moon.position.set(Math.cos(moonAngle)*6.6, 1.5+Math.sin(moonAngle)*0.9, Math.sin(moonAngle)*6.6);
    moon.rotation.y=-moonAngle+Math.PI;
  }
  updateMoon(0);

  /* ---------- Repères ---------- */
  const markerGroup=new THREE.Group(); globeGroup.add(markerGroup);
  const markerMeshes=[];
  const ACCENT=0x6d8dfb, ACCENT_EMI=0x3a4fb0;
  const dotGeo=new THREE.SphereGeometry(0.0095,16,16);
  const glowTex=(()=>{ const c=toCanvas(64,64), g=c.getContext('2d'); const gr=g.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,'rgba(140,165,255,0.9)'); gr.addColorStop(1,'rgba(140,165,255,0)'); g.fillStyle=gr; g.fillRect(0,0,64,64); return new THREE.CanvasTexture(c); })();
  /* ---------- Repères terrestres désactivés dans ME3D ---------- */
  const modelMeshes=[];
  const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
  const M=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:26,flatShading:true},o||{}));
  const LM=(c,o)=>M(c,Object.assign({flatShading:false,side:THREE.DoubleSide,shininess:45},o||{}));
  function rng(seed){ let s=(seed>>>0)||1; return ()=>{ s=(Math.imul(s,1664525)+1013904223)>>>0; return s/4294967296; }; }
  function hashJ(x,y,z){ const s=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453; return s-Math.floor(s); }
  // aspérités : le décalage dépend de la position, donc les sommets confondus (coutures) restent soudés
  function craggy(geo,amt){
    const p=geo.attributes.position;
    for(let i=0;i<p.count;i++){
      const x=p.getX(i),y=p.getY(i),z=p.getZ(i), k=1000, a=Math.round(x*k), b=Math.round(y*k), c=Math.round(z*k);
      p.setXYZ(i, x+(hashJ(a,b,c)-0.5)*amt, y+(hashJ(b,c,a+7)-0.5)*amt*0.6, z+(hashJ(c,a,b+13)-0.5)*amt);
    }
    geo.computeVertexNormals(); return geo;
  }
  function buildModel(m){
    const g=new THREE.Group(); let h=0.04;
    const lift=m.kind?0:0.0025, body=new THREE.Group(); body.position.y=lift; g.add(body);
    const R=rng(Math.floor((m.lat+90)*1000+(m.lon+180)*7));
    const add=(geo,mt,x,y,z)=>{ const o=new THREE.Mesh(geo,mt); o.position.set(x||0,y||0,z||0); body.add(o); return o; };
    const box=(w,hh,d,mt,x,y,z)=>add(new THREE.BoxGeometry(w,hh,d),mt,x,y,z);
    const cyl=(rt,rb,hh,mt,x,y,z,seg)=>add(new THREE.CylinderGeometry(rt,rb,hh,seg||12),mt,x,y,z);
    const cone=(r,hh,mt,x,y,z,seg)=>add(new THREE.ConeGeometry(r,hh,seg||8),mt,x,y,z);
    const sph=(r,mt,x,y,z,sx,sy,sz)=>{ const o=add(new THREE.SphereGeometry(r,16,12),mt,x,y,z); o.scale.set(sx||1,sy||1,sz||1); return o; };
    const lathe=(pts,mt,x,y,z,seg)=>{ const o=new THREE.Mesh(new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg||24),mt); o.position.set(x||0,y||0,z||0); body.add(o); return o; };
    const beam=(x1,y1,z1,x2,y2,z2,r,mt,seg)=>{ const a=V3(x1,y1,z1), b=V3(x2,y2,z2), len=a.distanceTo(b);
      const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,seg||5),mt); o.position.copy(a).add(b).multiplyScalar(0.5);
      o.quaternion.setFromUnitVectors(V3(0,1,0), b.clone().sub(a).normalize()); body.add(o); return o; };
    const gold=M(0xe8c765,{emissive:0x5a4010});
    const key=m.kind==='peak'?'peak':m.kind==='trench'?'trench':m.type;
    switch(key){
      case 'peak': { const t=Math.min(1,m.elev/8849), H=0.03+0.034*t, r=0.015+0.011*t;
        const rock=M(0x6f6a63), snow=M(0xf4f6fa,{emissive:0x1d2432});
        add(craggy(new THREE.ConeGeometry(r,H,7,3),r*0.28),rock,0,H/2,0);
        add(craggy(new THREE.ConeGeometry(r*0.5,H*0.46,7,2),r*0.16),snow,0,H*0.77,0);
        [[-0.55,0.5,0.55],[0.6,-0.35,0.6]].forEach(([ox,oz,k])=>{ const hh=H*k;
          add(craggy(new THREE.ConeGeometry(r*0.62,hh,6,2),r*0.2),rock,ox*r*1.15,hh/2,oz*r*1.15);
          add(craggy(new THREE.ConeGeometry(r*0.3,hh*0.45,6,1),r*0.1),snow,ox*r*1.15,hh*0.78,oz*r*1.15); });
        h=H; break; }
      case 'trench': { const mt=M(0x2dd4bf,{emissive:0x0b6b60,flatShading:false});
        add(new THREE.TorusGeometry(0.02,0.0032,10,40),mt,0,0.004,0).rotation.x=Math.PI/2;
        add(new THREE.TorusGeometry(0.012,0.002,10,32),mt,0,0.004,0).rotation.x=Math.PI/2;
        add(new THREE.CircleGeometry(0.011,28),M(0x06303a,{emissive:0x04222b,flatShading:false}),0,0.0035,0).rotation.x=-Math.PI/2;
        h=0.006; break; }
      default: add(new THREE.ConeGeometry(0.008,0.03,8),M(0xb98a52),0,0.015,0); h=0.03;
    }
    g.userData.h=h+lift; return g;
  }
  monuments.forEach(m=>{
    const up=latLonToVec3(m.lat,m.lon,1.0).normalize();
    const R=terrainR(m.lat,m.lon)+0.0004;   // pose exacte sur le relief affiché
    const model=buildModel(m);
    model.position.copy(up.clone().multiplyScalar(R));
    model.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), up);
    model.rotateY(((m.lon*7+m.lat*3)%360)*DEG);
    model.traverse(o=>{ if(o.isMesh){ o.userData.monument=m; modelMeshes.push(o); } });
    m._model=model; markerGroup.add(model);
    const hgt=model.userData.h;
    const kindCol = m.kind==='peak' ? [0xeef3ff,0x56648a] : m.kind==='trench' ? [0x2dd4bf,0x0b6b60] : [ACCENT,ACCENT_EMI];
    const dot=new THREE.Mesh(dotGeo,new THREE.MeshPhongMaterial({ color:kindCol[0], emissive:kindCol[1], shininess:90, specular:0xffffff }));
    dot.position.copy(up.clone().multiplyScalar(R+hgt+0.016));
    dot.userData.monument=m; dot.userData.base=up.clone().multiplyScalar(R+0.004); dot.userData.up=up; dot.userData.R=R; dot.userData.hgt=hgt;
    markerGroup.add(dot); markerMeshes.push(dot);
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending }));
    if(m.kind==='trench') glow.material.color.setRGB(0.3,1,0.85); else if(m.kind==='peak') glow.material.color.setRGB(0.85,0.9,1);
    glow.scale.set(0.06,0.06,1); glow.position.copy(dot.position); markerGroup.add(glow); dot.userData.glow=glow;
  });
  const selectRing=new THREE.Mesh(new THREE.RingGeometry(0.030,0.036,40), new THREE.MeshBasicMaterial({ color:0x9db4ff, transparent:true, opacity:0.95, side:THREE.DoubleSide }));
  selectRing.visible=false; markerGroup.add(selectRing);

  // reflet du soleil sur l'eau (suit la bissectrice caméra/soleil)
  const glintTex=(()=>{ const c=toCanvas(128,128), g=c.getContext('2d'); const gr=g.createRadialGradient(64,64,0,64,64,64);
    gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.25,'rgba(255,250,235,0.7)'); gr.addColorStop(1,'rgba(255,250,235,0)');
    g.fillStyle=gr; g.fillRect(0,0,128,128); return new THREE.CanvasTexture(c); })();
  const glintSprite=new THREE.Sprite(new THREE.SpriteMaterial({ map:glintTex, blending:THREE.AdditiveBlending, transparent:true, depthWrite:false, depthTest:true, opacity:0 }));
  scene.add(glintSprite);
  function updateGlint(){
    const camDir=camera.position.clone().normalize(), sunDir=sun.position.clone().normalize();
    const half=camDir.clone().add(sunDir);
    if(half.lengthSq()<1e-6){ glintSprite.material.opacity=0; return; }
    half.normalize();
    const align=camDir.dot(half), surfacePos=half.clone().multiplyScalar(1.001);
    const ll=vecToLatLon(globeMesh.worldToLocal(surfacePos.clone()));
    const ocean=sunDir.dot(half)>0.3 && isOcean(ll.lat,ll.lon);
    const strength=ocean?Math.pow(Math.max(0,align),46):0;
    glintSprite.position.copy(surfacePos); glintSprite.material.opacity=strength*0.85;
    const sc=0.1+strength*0.05; glintSprite.scale.set(sc,sc,1);
  }

  /* ======================================================================
     Monde « Système solaire »
     • positions : éléments képlériens JPL (Standish & Williams) — Table 1 (1800-2050), Table 2a/2b (3000 av. J.-C. – 3000)
     • Lune : série de Meeus (Astronomical Algorithms, chap. 47, termes principaux)
     • orientation des corps : éléments IAU/WGCCRE ; la Terre suit le temps sidéral de Greenwich (jour/nuit et saisons exacts)
     • les distances et les tailles sont compressées pour rester lisibles (non à l'échelle)
     ====================================================================== */
  const EPS_OBL=23.43928*DEG;
  const JPL1={ // [a,e,I,L,varpi,Omega, da,de,dI,dL,dvarpi,dOmega]  (au, deg ; taux par siècle)
    mercury:[0.38709927,0.20563593,7.00497902,252.25032350,77.45779628,48.33076593, 0.00000037,0.00001906,-0.00594749,149472.67411175,0.16047689,-0.12534081],
    venus:[0.72333566,0.00677672,3.39467605,181.97909950,131.60246718,76.67984255, 0.00000390,-0.00004107,-0.00078890,58517.81538729,0.00268329,-0.27769418],
    earth:[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0.0, 0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0.0],
    mars:[1.52371034,0.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891, 0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343],
    jupiter:[5.20288700,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909, -0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106],
    saturn:[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448, -0.00125060,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794],
    uranus:[19.18916464,0.04725744,0.77263783,313.23810451,170.95427630,74.01692503, -0.00196176,-0.00004397,-0.00242939,428.48202785,0.40805281,0.04240589],
    neptune:[30.06992276,0.00859048,1.77004347,-55.12002969,44.96476227,131.78422574, 0.00026291,0.00005105,0.00035372,218.45945325,-0.32241464,-0.00508664]
  };
  const JPL2={
    mercury:[0.38709843,0.20563661,7.00559432,252.25166724,77.45771895,48.33961819, 0.00000000,0.00002123,-0.00590158,149472.67486623,0.15940013,-0.12214182],
    venus:[0.72332102,0.00676399,3.39777545,181.97970850,131.76755713,76.67261496, -0.00000026,-0.00005107,0.00043494,58517.81560260,0.05679648,-0.27274174],
    earth:[1.00000018,0.01673163,-0.00054346,100.46691572,102.93005885,-5.11260389, -0.00000003,-0.00003661,-0.01337178,35999.37306329,0.31795260,-0.24123856],
    mars:[1.52371243,0.09336511,1.85181869,-4.56813164,-23.91744784,49.71320984, 0.00000097,0.00009149,-0.00724757,19140.29934243,0.45223625,-0.26852431],
    jupiter:[5.20248019,0.04853590,1.29861416,34.33479152,14.27495244,100.29282654, -0.00002864,0.00018026,-0.00322699,3034.90371757,0.18199196,0.13024619],
    saturn:[9.54149883,0.05550825,2.49424102,50.07571329,92.86136063,113.63998702, -0.00003065,-0.00032044,0.00451969,1222.11494724,0.54179478,-0.25015002],
    uranus:[19.18797948,0.04685740,0.77298127,314.20276625,172.43404441,73.96250215, -0.00020455,-0.00001550,-0.00180155,428.49512595,0.09266985,0.05739699],
    neptune:[30.06952752,0.00895439,1.77005520,304.22289287,46.68158724,131.78635853, 0.00006447,0.00000818,0.00022400,218.46515314,0.01009938,-0.00606302]
  };
  const JPL2B={ jupiter:[-0.00012452,0.06064060,-0.35635438,38.35125], saturn:[0.00025899,-0.13434469,0.87320147,38.35125], uranus:[0.00058331,-0.97731848,0.17689245,7.67025], neptune:[-0.00041348,0.68346318,-0.10162547,7.67025] };
  const jdOf=ms=>ms/86400000+2440587.5;
  // coordonnées héliocentriques écliptiques J2000 (UA). Eover : anomalie excentrique imposée (tracé des orbites)
  function helioEcl(id,T,Eover){
    const t1=(T>=-2&&T<=0.5), tab=(t1?JPL1:JPL2)[id];
    const a=tab[0]+tab[6]*T, e=tab[1]+tab[7]*T, I=(tab[2]+tab[8]*T)*DEG, L=tab[3]+tab[9]*T, wb=tab[4]+tab[10]*T, Om=(tab[5]+tab[11]*T)*DEG;
    const w=wb*DEG-Om; let E;
    if(Eover===undefined){
      let M=L-wb; const ex=!t1&&JPL2B[id];
      if(ex) M+=ex[0]*T*T+ex[1]*Math.cos(ex[3]*T*DEG)+ex[2]*Math.sin(ex[3]*T*DEG);
      M=((M+180)%360+360)%360-180;
      const es=e/DEG; let En=M+es*Math.sin(M*DEG);
      for(let i=0;i<40;i++){ const dM=M-(En-es*Math.sin(En*DEG)), dE=dM/(1-e*Math.cos(En*DEG)); En+=dE; if(Math.abs(dE)<1e-7) break; }
      E=En*DEG;
    } else E=Eover;
    const xp=a*(Math.cos(E)-e), yp=a*Math.sqrt(1-e*e)*Math.sin(E);
    const cw=Math.cos(w), sw=Math.sin(w), cO=Math.cos(Om), sO=Math.sin(Om), cI=Math.cos(I), sI=Math.sin(I);
    return [(cw*cO-sw*sO*cI)*xp+(-sw*cO-cw*sO*cI)*yp, (cw*sO+sw*cO*cI)*xp+(-sw*sO+cw*cO*cI)*yp, (sw*sI)*xp+(cw*sI)*yp];
  }
  // Lune : position géocentrique écliptique (km), termes principaux de Meeus
  function moonEcl(T){
    const r=DEG, Lp=218.3164477+481267.88123421*T, D=(297.8501921+445267.1114034*T)*r, Ms=(357.5291092+35999.0502909*T)*r,
          Mp=(134.9633964+477198.8675055*T)*r, F=(93.2720950+483202.0175233*T)*r;
    const lon=(Lp+6.288774*Math.sin(Mp)+1.274027*Math.sin(2*D-Mp)+0.658314*Math.sin(2*D)+0.213618*Math.sin(2*Mp)-0.185116*Math.sin(Ms)-0.114332*Math.sin(2*F))*r;
    const lat=(5.128122*Math.sin(F)+0.280602*Math.sin(Mp+F)+0.277693*Math.sin(Mp-F)+0.173238*Math.sin(2*D-F))*r;
    const dist=385000.56-20905.355*Math.cos(Mp)-3699.111*Math.cos(2*D-Mp)-2955.968*Math.cos(2*D)-569.925*Math.cos(2*Mp);
    return [dist*Math.cos(lat)*Math.cos(lon), dist*Math.cos(lat)*Math.sin(lon), dist*Math.sin(lat)];
  }
  // orientation (pôle + méridien origine) selon l'IAU ; matrice repère du maillage -> repère three
  const IAU={
    sun:{a:286.13,d:63.87,W0:84.176,Wd:14.1844}, mercury:{a:281.0103,d:61.4155,W0:329.5988,Wd:6.1385108},
    venus:{a:272.76,d:67.16,W0:160.20,Wd:-1.4813688}, earth:{}, mars:{a:317.269202,d:54.432516,W0:176.049863,Wd:350.891982443297},
    jupiter:{a:268.056595,d:64.495303,W0:284.95,Wd:870.536642}, saturn:{a:40.589,d:83.537,W0:38.90,Wd:810.7939024},
    uranus:{a:257.311,d:-15.175,W0:203.81,Wd:-501.1600928}, neptune:{a:299.36,d:43.46,W0:253.18,Wd:536.3128492},
    moon:{a:269.9949,d:66.5392,W0:38.3213,Wd:13.17635815}
  };
  const M4=()=>new THREE.Matrix4();
  const MBF=M4().set(1,0,0,0, 0,0,-1,0, 0,1,0,0, 0,0,0,1);
  const MECL=M4().set(1,0,0,0, 0,Math.cos(EPS_OBL),Math.sin(EPS_OBL),0, 0,-Math.sin(EPS_OBL),Math.cos(EPS_OBL),0, 0,0,0,1);
  const MTHREE=M4().set(1,0,0,0, 0,0,1,0, 0,-1,0,0, 0,0,0,1);
  function orientation(id,jd){
    const d=jd-2451545.0, o=IAU[id]; let a0, d0, W;
    if(id==='earth'){ const T=d/36525; W=(280.46061837+360.98564736629*d+0.000387933*T*T)*DEG; a0=-Math.PI/2; d0=Math.PI/2; }
    else { a0=o.a*DEG; d0=o.d*DEG; W=(o.W0+o.Wd*d)*DEG; }
    const Meq=M4().makeRotationZ(a0+Math.PI/2).multiply(M4().makeRotationX(Math.PI/2-d0)).multiply(M4().makeRotationZ(W));
    return MTHREE.clone().multiply(MECL).multiply(Meq).multiply(MBF);
  }
  const AU_KM=149597870.7;
  const VIS={ mode:'compact', dist(r){ return 14*Math.pow(r,this.mode==='extended'?0.57:0.5); }, size:R=>0.9*Math.pow(R/6371,0.41), sun:3.0, moonOrbit:2.9 };
  const toVis=v=>{ const r=Math.hypot(v[0],v[1],v[2])||1, k=VIS.dist(r)/r; return new THREE.Vector3(v[0]*k,v[2]*k,-v[1]*k); };
  const fmtN=(v,d)=>Number(v).toLocaleString('fr-FR',{maximumFractionDigits:d===undefined?0:d,minimumFractionDigits:d===undefined?0:d});

  const BODIES=[
    {id:'sun',name:'Le Soleil',short:'Soleil',R:695700,tex:'sun',type:'Étoile',orbital:false},
    {id:'mercury',name:'Mercure',short:'Mercure',R:2439.7,tex:'mercury',type:'Planète tellurique',color:0xb3a99c,facts:['3,70 m/s²','167 °C','87,97 jours','58,65 jours','0,03°']},
    {id:'venus',name:'Vénus',short:'Vénus',R:6051.8,tex:'venus',type:'Planète tellurique',color:0xe3c58a,glow:[1.0,0.82,0.5],facts:['8,87 m/s²','464 °C','224,70 jours','243,02 jours (rétrograde)','177,4°']},
    {id:'earth',name:'La Terre',short:'Terre',R:6371.0,type:'Planète tellurique',color:0x5b8fe0,glow:[0.35,0.6,1.0],facts:['9,80 m/s²','15 °C','365,26 jours','23 h 56 min','23,44°']},
    {id:'mars',name:'Mars',short:'Mars',R:3389.5,tex:'mars',type:'Planète tellurique',color:0xd1763f,glow:[1.0,0.6,0.4],facts:['3,71 m/s²','−65 °C','686,98 jours','24 h 37 min','25,19°']},
    {id:'jupiter',name:'Jupiter',short:'Jupiter',R:69911,tex:'jupiter',type:'Géante gazeuse',color:0xd9b38c,glow:[0.9,0.75,0.55],facts:['24,79 m/s²','−110 °C (à 1 bar)','11,86 ans','9 h 56 min','3,13°']},
    {id:'saturn',name:'Saturne',short:'Saturne',R:58232,tex:'saturn',type:'Géante gazeuse',color:0xe3d3a2,glow:[0.95,0.85,0.6],rings:true,facts:['10,44 m/s²','−140 °C (à 1 bar)','29,46 ans','10 h 33 min','26,73°']},
    {id:'uranus',name:'Uranus',short:'Uranus',R:25362,tex:'uranus',type:'Géante de glaces',color:0x9fdce5,glow:[0.55,0.9,0.95],facts:['8,69 m/s²','−195 °C','84,01 ans','17 h 14 min (rétrograde)','97,77°']},
    {id:'neptune',name:'Neptune',short:'Neptune',R:24622,tex:'neptune',type:'Géante de glaces',color:0x4f6fe0,glow:[0.35,0.5,1.0],facts:['11,15 m/s²','−200 °C','164,8 ans','16 h 06 min','28,32°']},
    {id:'moon',name:'La Lune',short:'Lune',R:1737.4,tex:'moon',type:'Satellite naturel de la Terre',color:0xbdbdbd,isMoon:true}
  ];

  // Satellites majeurs : dimensions et périodes orbitales de référence ; position 3D circulaire simplifiée.
  const SATELLITES=[
    {id:'phobos',name:'Phobos',short:'Phobos',parent:'mars',R:11.1,aKm:9376,periodDays:0.31891,orbitVis:1.22,inclination:1.1,node:18,phase:24,color:0x746052},
    {id:'deimos',name:'Déimos',short:'Déimos',parent:'mars',R:6.2,aKm:23463,periodDays:1.26244,orbitVis:1.82,inclination:0.9,node:114,phase:210,color:0x958878},
    {id:'io',name:'Io',short:'Io',parent:'jupiter',R:1821.6,aKm:421700,periodDays:1.7691,orbitVis:3.05,inclination:0.04,node:17,phase:32,color:0xd9ad50},
    {id:'europa',name:'Europe',short:'Europe',parent:'jupiter',R:1560.8,aKm:671100,periodDays:3.5512,orbitVis:3.85,inclination:0.47,node:62,phase:145,color:0xc8c0ad},
    {id:'ganymede',name:'Ganymède',short:'Ganymède',parent:'jupiter',R:2634.1,aKm:1070400,periodDays:7.1546,orbitVis:4.9,inclination:0.21,node:138,phase:235,color:0x82776b},
    {id:'callisto',name:'Callisto',short:'Callisto',parent:'jupiter',R:2410.3,aKm:1882700,periodDays:16.689,orbitVis:6.25,inclination:0.28,node:205,phase:310,color:0x57514b},
    {id:'mimas',name:'Mimas',short:'Mimas',parent:'saturn',R:198.2,aKm:185539,periodDays:0.9424,orbitVis:3.05,inclination:1.57,node:36,phase:14,color:0xb3a99b},
    {id:'enceladus',name:'Encelade',short:'Encelade',parent:'saturn',R:252.1,aKm:238042,periodDays:1.3702,orbitVis:3.48,inclination:0.02,node:79,phase:96,color:0xe4e1d9},
    {id:'tethys',name:'Téthys',short:'Téthys',parent:'saturn',R:531.1,aKm:294672,periodDays:1.8878,orbitVis:3.95,inclination:1.09,node:123,phase:181,color:0xbdb8ae},
    {id:'dione',name:'Dioné',short:'Dioné',parent:'saturn',R:561.4,aKm:377415,periodDays:2.7369,orbitVis:4.45,inclination:0.02,node:171,phase:246,color:0xa6a098},
    {id:'rhea',name:'Rhéa',short:'Rhéa',parent:'saturn',R:763.8,aKm:527068,periodDays:4.5182,orbitVis:5.05,inclination:0.35,node:218,phase:42,color:0x918b83},
    {id:'titan',name:'Titan',short:'Titan',parent:'saturn',R:2574.7,aKm:1221870,periodDays:15.945,orbitVis:6.1,inclination:0.33,node:264,phase:125,color:0xc98a40},
    {id:'iapetus',name:'Japet',short:'Japet',parent:'saturn',R:734.5,aKm:3560820,periodDays:79.3215,orbitVis:8.35,inclination:15.47,node:312,phase:288,color:0x6d6255},
    {id:'miranda',name:'Miranda',short:'Miranda',parent:'uranus',R:235.8,aKm:129900,periodDays:1.4135,orbitVis:2.55,inclination:4.34,node:25,phase:72,color:0xa19a91},
    {id:'ariel',name:'Ariel',short:'Ariel',parent:'uranus',R:578.9,aKm:190900,periodDays:2.5204,orbitVis:3.15,inclination:0.04,node:92,phase:159,color:0xb7b0a4},
    {id:'umbriel',name:'Umbriel',short:'Umbriel',parent:'uranus',R:584.7,aKm:266000,periodDays:4.144,orbitVis:3.75,inclination:0.13,node:146,phase:253,color:0x595550},
    {id:'titania',name:'Titania',short:'Titania',parent:'uranus',R:788.9,aKm:436300,periodDays:8.706,orbitVis:4.55,inclination:0.08,node:204,phase:328,color:0x9a9185},
    {id:'oberon',name:'Obéron',short:'Obéron',parent:'uranus',R:761.4,aKm:583500,periodDays:13.463,orbitVis:5.35,inclination:0.07,node:276,phase:48,color:0x81786d},
    {id:'triton',name:'Triton',short:'Triton',parent:'neptune',R:1353.4,aKm:354759,periodDays:5.87685,orbitVis:3.4,inclination:156.8,node:58,phase:275,color:0x9eafb3,direction:-1},
    {id:'proteus',name:'Protée',short:'Protée',parent:'neptune',R:210,aKm:117647,periodDays:1.1223,orbitVis:2.45,inclination:0.5,node:198,phase:36,color:0x69645e}
  ];
  BODIES.push(...SATELLITES.map(m=>({...m,isMoon:true,type:'Satellite naturel · '+({mars:'Mars',jupiter:'Jupiter',saturn:'Saturne',uranus:'Uranus',neptune:'Neptune'}[m.parent])})));

  const Solar={ group:new THREE.Group(), bodies:{}, list:[], selected:null, active:false,
    rig:{ target:new THREE.Vector3(), off:new THREE.Vector3(), follow:null, yaw:0.55, pitch:0.85, dist:250, tDist:250 },
    flags:{ orbits:true, labels:true, moons:true } };
  Solar.group.visible=false; scene.add(Solar.group);
  const solarLabels=document.getElementById('labels-solar');
  const planetTex=k=>{ const t=mkTex(P[k],true); return t; };
  const satelliteTextureCache=new Map();
  function satelliteTex(b){
    if(b.tex) return planetTex(b.tex);
    if(satelliteTextureCache.has(b.id)) return satelliteTextureCache.get(b.id);
    const c=toCanvas(512,256),ctx=c.getContext('2d'),hex=(b.color||0x888888).toString(16).padStart(6,'0');
    const base=[parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)];
    const rgb=(v,k)=>Math.max(0,Math.min(255,Math.round(v*k)));
    ctx.fillStyle=`rgb(${base.join(',')})`; ctx.fillRect(0,0,c.width,c.height);
    let seed=0; for(const ch of b.id) seed=(Math.imul(seed,31)+ch.charCodeAt(0))>>>0;
    const rnd=()=>{ seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; };
    for(let i=0;i<260;i++){
      const x=rnd()*c.width,y=rnd()*c.height,r=2+rnd()*12;
      ctx.fillStyle=`rgba(${rgb(base[0],0.62)},${rgb(base[1],0.62)},${rgb(base[2],0.62)},${0.035+rnd()*0.12})`;
      ctx.beginPath(); ctx.ellipse(x,y,r*(0.7+rnd()*1.5),r*(0.55+rnd()*0.9),rnd()*Math.PI,0,Math.PI*2); ctx.fill();
    }
    for(let i=0;i<150;i++){
      const x=rnd()*c.width,y=rnd()*c.height,r=1.2+rnd()*7.5;
      const g=ctx.createRadialGradient(x-r*0.12,y-r*0.16,r*0.05,x,y,r);
      g.addColorStop(0,`rgba(${rgb(base[0],1.18)},${rgb(base[1],1.18)},${rgb(base[2],1.18)},.42)`);
      g.addColorStop(.72,`rgba(${rgb(base[0],0.72)},${rgb(base[1],0.72)},${rgb(base[2],0.72)},.42)`);
      g.addColorStop(1,`rgba(${rgb(base[0],0.42)},${rgb(base[1],0.42)},${rgb(base[2],0.42)},.02)`);
      ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(x,y,r,r*(0.75+rnd()*0.5),rnd()*Math.PI,0,Math.PI*2); ctx.fill();
    }
    // Signatures visuelles stylisées, volontairement présentées comme procédurales.
    if(b.id==='io'){
      for(let i=0;i<38;i++){ const x=rnd()*c.width,y=rnd()*c.height,rx=4+rnd()*22,ry=2+rnd()*9; ctx.fillStyle=['rgba(244,190,65,.62)','rgba(170,76,34,.48)','rgba(90,57,30,.40)'][i%3]; ctx.beginPath(); ctx.ellipse(x,y,rx,ry,rnd()*Math.PI,0,Math.PI*2); ctx.fill(); }
    } else if(b.id==='europa'){
      ctx.save(); ctx.strokeStyle='rgba(130,74,58,.46)'; ctx.lineWidth=1.4;
      for(let i=0;i<28;i++){ let x=rnd()*c.width,y=rnd()*c.height; ctx.beginPath(); ctx.moveTo(x,y); for(let j=0;j<4;j++){ x+=(rnd()-.5)*44; y+=(rnd()-.5)*26; ctx.lineTo(x,y); } ctx.stroke(); }
      ctx.restore();
    } else if(b.id==='titan'){
      ctx.fillStyle='rgba(218,139,56,.22)'; ctx.fillRect(0,0,c.width,c.height);
      for(let i=0;i<22;i++){ const x=rnd()*c.width,y=rnd()*c.height,r=10+rnd()*42; const h=ctx.createRadialGradient(x,y,1,x,y,r); h.addColorStop(0,'rgba(255,205,120,.14)'); h.addColorStop(1,'rgba(255,205,120,0)'); ctx.fillStyle=h; ctx.fillRect(x-r,y-r,r*2,r*2); }
    } else if(b.id==='enceladus'){
      ctx.save(); ctx.strokeStyle='rgba(255,255,255,.52)'; ctx.lineWidth=2;
      for(let i=0;i<16;i++){ const x=rnd()*c.width,y=rnd()*c.height; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+20*(rnd()-.5),y+18*(rnd()-.5),x+(rnd()-.5)*70,y+(rnd()-.5)*34); ctx.stroke(); }
      ctx.restore();
    }
    const t=new THREE.CanvasTexture(c); t.wrapS=THREE.RepeatWrapping; t.encoding=THREE.sRGBEncoding; t.anisotropy=Math.min(8,maxAniso); t.needsUpdate=true; satelliteTextureCache.set(b.id,t); return t;
  }
  const glowMat=(c)=>new THREE.ShaderMaterial({ uniforms:{ c:{value:new THREE.Color(c[0],c[1],c[2])} },
    vertexShader:'varying vec3 vNormal; void main(){ vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader:'uniform vec3 c; varying vec3 vNormal; void main(){ float i=pow(max(0.0,0.74-dot(normalize(vNormal),vec3(0.0,0.0,1.0))),3.0); gl_FragColor=vec4(c,1.0)*i*0.9; }',
    blending:THREE.AdditiveBlending, side:THREE.BackSide, transparent:true, depthWrite:false });

  // Modèles procéduraux : Phobos, Déimos et Protée sont volontairement irréguliers.
  function makeBodyGeometry(b){
    const rough=['phobos','deimos','proteus'].includes(b.id);
    const g=rough?new THREE.IcosahedronGeometry(b.size,3):new THREE.SphereGeometry(b.size,b.isMoon?40:64,b.isMoon?32:64);
    if(rough){
      const p=g.attributes.position; let seed=0; for(const ch of b.id) seed=(Math.imul(seed,31)+ch.charCodeAt(0))>>>0;
      for(let i=0;i<p.count;i++){
        const x=p.getX(i)/b.size,y=p.getY(i)/b.size,z=p.getZ(i)/b.size;
        const n=0.10*Math.sin(x*17.3+y*11.7+z*7.1+(seed%97))+0.045*Math.sin(x*39.1-y*21.7+z*29.3);
        p.setXYZ(i,p.getX(i)*(1+n),p.getY(i)*(1+n*0.82),p.getZ(i)*(1+n*0.9));
      }
      g.computeVertexNormals(); g.computeBoundingSphere();
    }
    return g;
  }
  // Soleil : lumière ponctuelle (sans atténuation, pour que Neptune reste visible) + halos
  Solar.light=new THREE.PointLight(0xfff4e6,2.5,0,0); Solar.group.add(Solar.light);
  BODIES.forEach(b=>{
    b.size=b.id==='sun'?VIS.sun:(b.isMoon?Math.max(0.085,VIS.size(b.R)):VIS.size(b.R));
    const holder=new THREE.Group(); Solar.group.add(holder); b.holder=holder;
    let mt;
    if(b.id==='sun') mt=new THREE.MeshBasicMaterial({ map:planetTex('sun'), color:0xffe2a8 });
    else if(b.id==='earth') mt=new THREE.MeshPhongMaterial({ map:dayTex, shininess:22, specular:0x223344 });
    else mt=new THREE.MeshPhongMaterial({ map:b.isMoon?satelliteTex(b):planetTex(b.tex), shininess:b.isMoon||b.id==='mercury'?2:8, specular:0x111111 });
    b.mesh=new THREE.Mesh(makeBodyGeometry(b),mt); holder.add(b.mesh);
    if(b.glow){ holder.add(new THREE.Mesh(new THREE.SphereGeometry(b.size*1.08,32,32),glowMat(b.glow))); }
    if(b.id==='earth'){ const cm=new THREE.Mesh(new THREE.SphereGeometry(b.size*1.012,64,64),new THREE.MeshPhongMaterial({ color:0xffffff, alphaMap:cloudTex, transparent:true, depthWrite:false, opacity:0.85, shininess:0 })); b.mesh.add(cm); }
    if(b.rings){   // anneaux de Saturne (couleur + transparence radiales)
      const inner=b.size*1.24, outer=b.size*2.27, rg=new THREE.RingGeometry(inner,outer,160,1), pos=rg.attributes.position, uv=rg.attributes.uv;
      for(let i=0;i<pos.count;i++){ const d=Math.hypot(pos.getX(i),pos.getY(i)); uv.setXY(i,(d-inner)/(outer-inner),0.5); }
      const ring=new THREE.Mesh(rg,new THREE.MeshPhongMaterial({ map:planetTex('saturnring'), alphaMap:mkTex(P.saturnringalpha,false), transparent:true, side:THREE.DoubleSide, depthWrite:false, shininess:4, opacity:0.95 }));
      ring.rotation.x=-Math.PI/2; b.mesh.add(ring);
    }
    const el=document.createElement('div'); el.className='plabel'; el.textContent=b.short; solarLabels.appendChild(el); b.el=el;
    Solar.bodies[b.id]=b; Solar.list.push(b);
  });
  const sunB=Solar.bodies.sun;
  [[22,0.9],[9.5,1.0]].forEach(([sc,op])=>{ const sp=new THREE.Sprite(new THREE.SpriteMaterial({ map:sunGlowTex, blending:THREE.AdditiveBlending, transparent:true, depthWrite:false, opacity:op })); sp.scale.set(sc,sc,1); sunB.holder.add(sp); });

  // Orbites planétaires : couleurs discrètes distinctes. La géométrie suit la date simulée.
  Solar.orbitGroup=new THREE.Group(); Solar.group.add(Solar.orbitGroup);
  Solar.planetOrbitBodies=[]; Solar.orbitEpochT=null;
  const ORBIT_COLORS={mercury:0x909bad,venus:0xd8b27a,earth:0x65c9e8,mars:0xd98566,jupiter:0xcbbd9c,saturn:0xd9cf96,uranus:0x77d3d8,neptune:0x718cf0};
  BODIES.filter(b=>b.facts&&!b.isMoon).forEach(b=>{
    const pts=[]; for(let i=0;i<=256;i++) pts.push(toVis(helioEcl(b.id,0,i/256*Math.PI*2)));
    const line=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({ color:ORBIT_COLORS[b.id]||0x7c8aa8, transparent:true, opacity:0.58, depthTest:true, depthWrite:false, toneMapped:false }));
    Solar.orbitGroup.add(line); b.orbitLine=line; Solar.planetOrbitBodies.push(b);
  });
  Solar.moonOrbitGroup=new THREE.Group(); Solar.group.add(Solar.moonOrbitGroup);
  const moonRing=(()=>{ const pts=[]; for(let i=0;i<=128;i++){ const a=i/128*Math.PI*2; pts.push(new THREE.Vector3(Math.cos(a)*VIS.moonOrbit,0,Math.sin(a)*VIS.moonOrbit)); }
    const l=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({ color:0xc4cce1, transparent:true, opacity:0.48, depthWrite:false, toneMapped:false })); l.rotation.x=5.1*DEG; Solar.moonOrbitGroup.add(l); return l; })();
  const parentTilt={mars:25.19,jupiter:3.13,saturn:26.73,uranus:97.77,neptune:28.32};
  function satelliteOffset(b,a,r){
    const node=(b.node||0)*DEG, tilt=((parentTilt[b.parent]||0)+(b.inclination||0))*DEG;
    const x0=r*Math.cos(a), z0=r*Math.sin(a);
    const x=x0*Math.cos(node)+z0*Math.sin(node), z=-x0*Math.sin(node)+z0*Math.cos(node);
    return new THREE.Vector3(x,-z*Math.sin(tilt),z*Math.cos(tilt));
  }
  Solar.satelliteOrbitLines=[];
  SATELLITES.forEach(def=>{
    // Important : SATELLITES contient les données brutes ; le modèle construit est dans Solar.bodies.
    const body=Solar.bodies[def.id];
    if(!body) { console.error('ME3D : modèle de lune absent',def.id); return; }
    const pts=[]; for(let i=0;i<=128;i++) pts.push(satelliteOffset(body,i/128*Math.PI*2,body.orbitVis));
    const line=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:ORBIT_COLORS[body.parent]||0x9aa4bf,transparent:true,opacity:0.30,depthTest:true,depthWrite:false,toneMapped:false}));
    Solar.moonOrbitGroup.add(line);
    Solar.satelliteOrbitLines.push({moon:body,line});
    body.orbitLine=line;
    def.orbitLine=line;
  });

  // Ceinture d'astéroïdes illustrative : légère, discrète et désactivable depuis les calques.
  {
    const N=3200, p=new Float32Array(N*3), radii=new Float32Array(N), angles=new Float32Array(N), heights=new Float32Array(N);
    let seed=7;
    const rnd=()=>{ seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; };
    for(let i=0;i<N;i++){
      radii[i]=2.15+rnd()*1.2; angles[i]=rnd()*Math.PI*2; heights[i]=(rnd()-0.5)*0.9*(1+rnd());
      const k=VIS.dist(radii[i]); p[i*3]=Math.cos(angles[i])*k; p[i*3+1]=heights[i]; p[i*3+2]=Math.sin(angles[i])*k;
    }
    const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(p,3));
    Solar.beltScaleData={radii,angles,heights};
    Solar.belt=new THREE.Points(g,new THREE.PointsMaterial({color:0x948a7c,size:1.4,sizeAttenuation:false,transparent:true,opacity:0.52,depthWrite:false}));
    Solar.group.add(Solar.belt);
  }
  Solar.updateBeltScale=function(){
    if(!Solar.belt||!Solar.beltScaleData) return;
    const a=Solar.belt.geometry.attributes.position, d=Solar.beltScaleData;
    for(let i=0;i<d.radii.length;i++){ const k=VIS.dist(d.radii[i]); a.setXYZ(i,Math.cos(d.angles[i])*k,d.heights[i],Math.sin(d.angles[i])*k); }
    a.needsUpdate=true; Solar.belt.geometry.computeBoundingSphere();
  };

  /* ----- Mise à jour à chaque image ----- */
  const _v=new THREE.Vector3();
  Solar.update=function(dt,tMs){
    const jd=jdOf(tMs), T=(jd-2451545)/36525, B=Solar.bodies;
    ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'].forEach(id=>{ const b=B[id]; b.pos=helioEcl(id,T); b.holder.position.copy(toVis(b.pos)); });
    // Réactualise les trajectoires si la date simulée s'est déplacée d'au moins un jour.
    if(Solar.orbitEpochT===null||Math.abs(T-Solar.orbitEpochT)>=1/36525){
      Solar.planetOrbitBodies.forEach(b=>{ const attr=b.orbitLine.geometry.attributes.position; for(let i=0;i<=256;i++){ const p=toVis(helioEcl(b.id,T,i/256*Math.PI*2)); attr.setXYZ(i,p.x,p.y,p.z); } attr.needsUpdate=true; b.orbitLine.geometry.computeBoundingSphere(); });
      Solar.orbitEpochT=T;
    }
    const mg=moonEcl(T); B.moon.geo=mg; const md=_v.set(mg[0],mg[2],-mg[1]).normalize();
    const lunarDistance=Math.hypot(mg[0],mg[1],mg[2]);
    B.moon.holder.position.copy(B.earth.holder.position).addScaledVector(md,VIS.moonOrbit*(lunarDistance/385000.56)); moonRing.position.copy(B.earth.holder.position);
    // Les principales lunes suivent leur planète. Leurs périodes sont réelles, leur trajectoire circulaire et l'échelle visuelle sont simplifiées.
    SATELLITES.forEach(def=>{
      // Toujours utiliser le corps construit (celui qui possède holder, mesh et étiquette).
      const b=B[def.id];
      if(!b) return;
      const parent=B[b.parent];
      if(!parent) return;
      const cycle=((jd-2451545)/b.periodDays)%1;
      const phase=(b.phase||0)*DEG+cycle*Math.PI*2*(b.direction||1);
      const off=satelliteOffset(b,phase,b.orbitVis);
      b.holder.position.copy(parent.holder.position).add(off);
      if(b.orbitLine) b.orbitLine.position.copy(parent.holder.position);
    });
    Solar.list.forEach(b=>{
      if(IAU[b.id]) b.mesh.quaternion.setFromRotationMatrix(orientation(b.id,jd));
      else if(b.isMoon){ const parent=B[b.parent]; if(parent) b.mesh.lookAt(parent.holder.position); }
    });
    if(B.earth.mesh.children[0]) B.earth.mesh.children[0].rotation.y=((jd-2451545)*Math.PI*2)%(Math.PI*2);
    // Une orbite sélectionnée ressort sans effacer le contexte des autres trajectoires.
    Solar.planetOrbitBodies.forEach(b=>{ b.orbitLine.material.opacity=Solar.flags.orbits?(Solar.selected&&Solar.selected.id===b.id?0.92:0.46):0; });
    Solar.satelliteOrbitLines.forEach(o=>{ o.line.material.opacity=Solar.flags.orbits&&Solar.flags.moons?(Solar.selected&&Solar.selected.id===o.moon.id?0.72:0.24):0; });
    const rg=Solar.rig, fb=rg.follow?B[rg.follow]:null, goal=fb?fb.holder.position:_v.set(0,0,0);
    rg.off.multiplyScalar(Math.exp(-dt*5)); rg.target.copy(goal).add(rg.off);
    rg.dist+=(rg.tDist-rg.dist)*(1-Math.exp(-dt*5));
    const cp=Math.cos(rg.pitch);
    camera.position.set(rg.target.x+rg.dist*cp*Math.sin(rg.yaw), rg.target.y+rg.dist*Math.sin(rg.pitch), rg.target.z+rg.dist*cp*Math.cos(rg.yaw));
    camera.lookAt(rg.target); camera.updateMatrixWorld(); stars.position.copy(camera.position);
    Solar.updateLabels();
  };
  Solar.visibleBody=b=>!b.isMoon||Solar.flags.moons;
  const _p=new THREE.Vector3();
  Solar.screen=b=>{ _p.copy(b.holder.position).project(camera); return { x:(_p.x*0.5+0.5)*innerWidth, y:(-_p.y*0.5+0.5)*innerHeight, z:_p.z }; };
  Solar.updateLabels=function(){
    const vis=[];
    Solar.list.forEach(b=>{
      let show=Solar.flags.labels&&Solar.visibleBody(b); const isCloseMoon=b.isMoon&&b.holder.position.distanceTo(camera.position)<28; if(b.isMoon&&!(b===Solar.selected||isCloseMoon)) show=false; if(b===Solar.selected) show=Solar.visibleBody(b);
      const s=Solar.screen(b); if(!show||s.z>1||s.z< -1||s.x< -80||s.x>innerWidth+80||s.y< -60||s.y>innerHeight+40){ b.el.style.display='none'; return; }
      vis.push({b,s,p:b===Solar.selected?0:b.id==='sun'?1:b.id==='moon'?3:2});
    });
    vis.sort((a,b)=>a.p-b.p); const placed=[];
    vis.forEach(v=>{ const w=v.b.short.length*7+22, r=[v.s.x-w/2-4,v.s.y-44,v.s.x+w/2+4,v.s.y-10];
      if(v.p>0&&placed.some(q=>r[0]<q[2]&&r[2]>q[0]&&r[1]<q[3]&&r[3]>q[1])){ v.b.el.style.display='none'; return; }
      placed.push(r); v.b.el.style.display='block'; v.b.el.style.left=v.s.x+'px'; v.b.el.style.top=v.s.y+'px'; v.b.el.classList.toggle('sel',v.b===Solar.selected); });
  };

  /* ----- Interaction ----- */
  Solar.minDist=()=>{ const f=Solar.rig.follow; return f?Solar.bodies[f].size*(Solar.bodies[f].rings?3.2:2.3):6; };
  Solar.setDist=d=>{ Solar.rig.tDist=Math.max(Solar.minDist(),Math.min(520,d)); };
  Solar.zoomBy=f=>Solar.setDist(Solar.rig.tDist*f);
  Solar.drag=(dx,dy)=>{ const r=Solar.rig; r.yaw-=dx*0.0055; r.pitch=Math.max(-1.45,Math.min(1.45,r.pitch+dy*0.0045)); };
  Solar.pick=(x,y)=>{
    let best=null, bd=1e9; const f=1/(Math.tan(camera.fov*DEG/2));
    Solar.list.forEach(b=>{ if(!Solar.visibleBody(b)) return; const s=Solar.screen(b); if(s.z>1||s.z< -1||s.x< -50||s.x>innerWidth+50||s.y< -50||s.y>innerHeight+50) return;
      const dist=b.holder.position.distanceTo(camera.position), rad=b.size/dist*f*innerHeight/2, th=Math.max(16,rad+8), d=Math.hypot(s.x-x,s.y-y);
      if(d<=th&&d/th<bd){ bd=d/th; best=b; } });
    return best;
  };
  Solar.focus=id=>{
    const b=Solar.bodies[id]; if(!b) return; const r=Solar.rig;
    r.off.copy(r.target).sub(b.holder.position); r.follow=id; Solar.selected=b;
    r.tDist=Math.max(b.size*(b.rings?7:5.5),b.size+3);
  };
  Solar.overviewDistance=()=>VIS.mode==='extended'?300:250;
  Solar.reset=(instant=false)=>{ const r=Solar.rig; r.off.copy(r.target); r.follow=null; Solar.selected=null; r.yaw=0.55; r.pitch=0.85; r.tDist=Solar.overviewDistance(); if(instant){ r.target.set(0,0,0); r.off.set(0,0,0); r.dist=r.tDist; } };
  Solar.setScaleMode=function(mode, persist=true){ const next=mode==='extended'?'extended':'compact'; if(VIS.mode===next){ Settings.systemScale=next; if(persist) saveSettings(); return; } VIS.mode=next; Settings.systemScale=next; if(persist) saveSettings(); Solar.orbitEpochT=null; Solar.updateBeltScale(); if(!Solar.rig.follow) Solar.setDist(Solar.overviewDistance()); syncUI(); };
  Solar.setFlag=(k,v)=>{ Solar.flags[k]=v;
    if(k==='orbits'){ Solar.orbitGroup.visible=v; Solar.moonOrbitGroup.visible=v&&Solar.flags.moons; }
    if(k==='moons'){ Solar.list.forEach(b=>{ if(b.isMoon) b.holder.visible=v; }); Solar.moonOrbitGroup.visible=v&&Solar.flags.orbits; if(!v&&Solar.selected&&Solar.selected.isMoon) Solar.reset(); }
    if(k==='belt'&&Solar.belt) Solar.belt.visible=v;
  };
  Solar.enter=()=>{ Solar.group.visible=true; Solar.active=true; camera.near=0.02; camera.far=3000; camera.fov=48; camera.updateProjectionMatrix(); solarLabels.style.display='block'; };
  Solar.exit=()=>{ Solar.group.visible=false; Solar.active=false; camera.near=0.1; camera.far=200; camera.updateProjectionMatrix(); stars.position.set(0,0,0); solarLabels.style.display='none'; Solar.list.forEach(b=>{ b.el.style.display='none'; }); };

  /* ----- Fiche d'un corps (valeurs calculées pour la date simulée) ----- */
  Solar.info=function(b,tMs){
    const T=(jdOf(tMs)-2451545)/36525, B=Solar.bodies; let stats, chips=[], live={};
    const earthP=helioEcl('earth',T);
    if(b.id==='sun'){
      stats=[{label:'Rayon moyen',value:'695 700 km'},{label:'Diamètre',value:'1 391 400 km'},{label:'Masse',value:'≈ 333 000 masses terrestres'},{label:'Température de surface',value:'≈ 5 772 K'},{label:'Type spectral',value:'G2V'},{label:'Rotation équatoriale',value:'≈ 25 jours'},{label:'Âge',value:'≈ 4,6 milliards d’années'}];
      chips=['99,86 % de la masse du Système solaire'];
    } else if(b.id==='moon'){
      const g=moonEcl(T), dist=Math.hypot(g[0],g[1],g[2]), sx=-earthP[0], sy=-earthP[1], sz=-earthP[2], sl=Math.hypot(sx,sy,sz);
      const cosE=(g[0]*sx+g[1]*sy+g[2]*sz)/(dist*sl), illum=(1-cosE)/2*100;
      stats=[{label:'Rayon moyen',value:'1 737,4 km'},{label:'Diamètre',value:'3 474,8 km'},{label:'Gravité',value:'1,62 m/s²'},{label:'Distance à la Terre',value:fmtN(dist)+' km'},{label:'Révolution',value:'27,32 jours'},{label:'Rotation',value:'synchrone'},{label:'Température moyenne',value:'≈ −23 °C'}];
      chips=['Éclairée à '+fmtN(illum)+' %','Position calculée par les principaux termes de Meeus'];
    } else if(b.isMoon){
      const parent=B[b.parent];
      stats=[{label:'Rayon moyen',value:fmtN(b.R,1)+' km'},{label:'Diamètre moyen',value:fmtN(b.R*2,1)+' km'},{label:'Distance orbitale moyenne',value:fmtN(b.aKm)+' km'},{label:'Période orbitale',value:fmtN(b.periodDays,4)+' jours'},{label:'Mouvement orbital',value:(b.direction===-1||(b.inclination||0)>=90)?'Rétrograde':'Prograde'},{label:'Corps parent',value:parent?parent.name:b.parent}];
      chips=['Satellite naturel de '+(parent?parent.name:b.parent),'Trajectoire visuelle circulaire simplifiée'];
    } else {
      const p=helioEcl(b.id,T), r=Math.hypot(p[0],p[1],p[2]), de=Math.hypot(p[0]-earthP[0],p[1]-earthP[1],p[2]-earthP[2]), lt=r*499.00478/60;
      const tab=(T>=-2&&T<=0.5?JPL1:JPL2)[b.id], a=tab[0]+tab[6]*T, e=tab[1]+tab[7]*T, inc=tab[2]+tab[8]*T;
      const L=['Rayon moyen','Diamètre moyen','Gravité','Température moyenne','Année','Jour','Inclinaison de l’axe','Demi-grand axe','Excentricité orbitale','Inclinaison orbitale'], V=[fmtN(b.R,1)+' km',fmtN(b.R*2,1)+' km'].concat(b.facts,[fmtN(a,3)+' UA',fmtN(e,5),fmtN(inc,3)+'°']);
      stats=L.map((l,i)=>({label:l,value:V[i]}));
      chips=[fmtN(r,2)+' UA du Soleil · lumière en '+(lt<1?fmtN(lt*60)+' s':Math.floor(lt)+' min '+fmtN((lt-Math.floor(lt))*60)+' s'), b.id==='earth'?'Notre planète':fmtN(de,2)+' UA de la Terre'];
    }
    return { eyebrow:b.type, title:b.name, sub:b.id==='sun'?'Étoile centrale du Système solaire':b.isMoon?'Satellite naturel · orbite '+(b.id==='moon'?'calculée':'simplifiée'):'Planète du Système solaire', stats, chips };
  };
  Solar.search=q=>{
    const n=norm(q); if(!n) return Solar.list.slice();
    const rows=Solar.list.filter(b=>{
      const parent=b.parent&&Solar.bodies[b.parent];
      const hay=[b.name,b.short,b.type,b.id,parent&&parent.name,parent&&parent.short].filter(Boolean).map(norm);
      return hay.some(v=>v.includes(n));
    });
    return rows.sort((a,b)=>{
      const rank=x=>[x.name,x.short,x.id].some(v=>norm(v)===n)?0:[x.name,x.short].some(v=>norm(v).startsWith(n))?1:2;
      return rank(a)-rank(b)||a.name.localeCompare(b.name,'fr');
    });
  };
  /* ======================================================================
     Cadre applicatif extensible : mondes (scènes), calques, recherche, horloge,
     fiches d'objets, réglages. Les futurs mondes (Système solaire, Ciel, Galaxie)
     n'auront qu'à s'enregistrer ici : l'interface est déjà prête.
     ====================================================================== */
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const Store={ key:'me3d.v2', data:{},
    load(){ try{ this.data=JSON.parse(localStorage.getItem(this.key)||'{}')||{}; }catch(e){ this.data={}; } },
    save(){ try{ localStorage.setItem(this.key,JSON.stringify(this.data)); }catch(e){} } };
  Store.load();
  const reduceMotion=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  const Settings=Object.assign({autoRotate:!reduceMotion,quality:'auto',lighting:'fixed',systemScale:'compact'},Store.data.settings||{});
  Settings.systemScale=Settings.systemScale==='extended'?'extended':'compact';
  VIS.mode=Settings.systemScale;
  if(Solar.updateBeltScale) Solar.updateBeltScale();
  Solar.orbitEpochT=null;
  const saveSettings=()=>{ Store.data.settings=Settings; Store.save(); };

  /* ----- Horloge de simulation (partagée par tous les mondes) ----- */
  const Clock={ t:Date.now(), speed:1, paused:false, speeds:[1,60,600,3600,86400,604800,2629800,31557600], si:0, auto:false,
    labels:['×1','×60','×600','×3 600','×86 400','×604 800','×2,6 M','×31,6 M'], hints:['temps réel','1 min / s','10 min / s','1 h / s','1 jour / s','1 semaine / s','1 mois / s','1 an / s'],
    tick(dt){ if(!this.paused) this.t+=dt*1000*this.speed; } };

  /* ----- Registre des mondes ----- */
  const ICON={
    earth:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    solar:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)"/><circle cx="20" cy="8" r="1.3" fill="currentColor"/></svg>',
    sky:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.3 5.6 6 .5-4.6 3.9 1.5 5.9L12 15.8l-5.1 3.1 1.5-5.9L3.7 9.1l6-.5z"/></svg>',
    galaxy:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 12c0-3 3-5 6-4M12 12c0 3-3 5-6 4M12 12c3 0 5-3 4-6M12 12c-3 0-5 3-4 6"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>'
  };
  const App={ scenes:new Map(), current:'solar', providers:[],
    registerScene(d){ this.scenes.set(d.id,d); },
    registerSearch(fn){ this.providers.push(fn); },
    search(q){ const out=[]; this.providers.forEach(fn=>{ try{ out.push(...fn(q)); }catch(e){} }); return out; },
    go(id){ const s=this.scenes.get(id); if(!s) return;
      if(s.status!=='ready'){ openRoadmap(id); return; }
      if(this.current!==id){ const c=this.scenes.get(this.current); c&&c.exit&&c.exit(); this.current=id; s.enter&&s.enter(); }
      renderTabs(); syncUI(); renderSceneTools(); if($('layersPop').classList.contains('open')) renderLayers(); } };
  App.registerScene({id:'earth',name:'Terre',icon:ICON.earth,status:'ready'});
  App.registerScene({id:'solar',name:'Système solaire',icon:ICON.solar,status:'ready'});
  App.registerScene({id:'sky',name:'Ciel',icon:ICON.sky,status:'ready',
    tagline:'Le ciel étoilé, tel qu\'on le voit depuis n\'importe quel point de la Terre.',
    features:['Catalogue de plus de 40 étoiles repères avec magnitude et coordonnées','Constellations et traits de repère organisés par figures','Grille équatoriale activable et bande de Voie lactée schématique','Filtre de magnitude pour alléger ou enrichir la voûte','Recherche et centrage des étoiles sélectionnables']});
  App.registerScene({id:'galaxy',name:'Galaxie',icon:ICON.galaxy,status:'ready',
    tagline:'La Voie lactée, puis les galaxies voisines.',
    features:['Disque spiralé procédural à quatre bras et bulbe central','Couches de poussière et halo stellaire séparables','Modes de vue de dessus, de profil et perspective','Repères pour le voisinage solaire, les bras, amas et nébuleuses','Galaxies voisines visibles à échelle compressée et annoncée comme schématique']});

  /* ----- Scène Ciel : voûte stellaire interactive -----
     Les étoiles de repère sont placées à des coordonnées équatoriales approximatives.
     Le champ de fond et les traits de constellations sont procéduraux/schématiques,
     et ne constituent pas un catalogue astrométrique complet. */
  const skyGroup=new THREE.Group(); skyGroup.visible=false; scene.add(skyGroup);
  const skyStarDefs=[
    {id:'sirius',name:'Sirius',ra:6.7525,dec:-16.7161,mag:-1.46,distance:'≈ 8,6 années-lumière',kind:'Étoile blanche de la séquence principale',color:0xaed1ff},
    {id:'canopus',name:'Canopus',ra:6.3992,dec:-52.6957,mag:-0.74,distance:'≈ 310 années-lumière',kind:'Supergéante jaune-blanche',color:0xffe1b1},
    {id:'arcturus',name:'Arcturus',ra:14.261,dec:19.1825,mag:-0.05,distance:'≈ 37 années-lumière',kind:'Géante rouge-orange',color:0xffbd83},
    {id:'vega',name:'Véga',ra:18.6156,dec:38.7837,mag:0.03,distance:'≈ 25 années-lumière',kind:'Étoile blanche',color:0xc9ddff},
    {id:'capella',name:'Capella',ra:5.2782,dec:45.998,mag:0.08,distance:'≈ 43 années-lumière',kind:'Système stellaire multiple',color:0xffd8a1},
    {id:'rigel',name:'Rigel',ra:5.2423,dec:-8.2016,mag:0.13,distance:'≈ 860 années-lumière',kind:'Supergéante bleue',color:0x9cc7ff},
    {id:'betelgeuse',name:'Bételgeuse',ra:5.9195,dec:7.4071,mag:0.5,distance:'≈ 550 années-lumière',kind:'Supergéante rouge',color:0xff9070},
    {id:'polaris',name:'Polaris',ra:2.5303,dec:89.2641,mag:1.98,distance:'≈ 440 années-lumière',kind:'Supergéante jaune-blanche et étoile variable',color:0xffe6bd},
    {id:'altair',name:'Altaïr',ra:19.8464,dec:8.8683,mag:0.77,distance:'≈ 17 années-lumière',kind:'Étoile blanche',color:0xd1e2ff},
    {id:'deneb',name:'Deneb',ra:20.6905,dec:45.2803,mag:1.25,distance:'Plusieurs milliers d’années-lumière (estimation)',kind:'Supergéante blanche',color:0xc4d9ff},
    {id:'spica',name:'Spica',ra:13.4199,dec:-11.1614,mag:0.97,distance:'≈ 250 années-lumière',kind:'Système stellaire bleu',color:0x9dc8ff},
    {id:'antares',name:'Antarès',ra:16.4901,dec:-26.432,mag:1.06,distance:'≈ 550 années-lumière',kind:'Supergéante rouge',color:0xff8666},
    {id:'procyon',name:'Procyon',ra:7.655,dec:5.225,mag:0.34,distance:'≈ 11,5 années-lumière',kind:'Système stellaire proche',color:0xffe3b5},
    {id:'aldebaran',name:'Aldébaran',ra:4.5987,dec:16.5093,mag:0.85,distance:'≈ 65 années-lumière',kind:'Géante orange',color:0xffbd7b},
    {id:'regulus',name:'Régulus',ra:10.1395,dec:11.9672,mag:1.35,distance:'≈ 79 années-lumière',kind:'Système stellaire multiple',color:0xcbdcff},
    {id:'fomalhaut',name:'Fomalhaut',ra:22.9608,dec:-29.6222,mag:1.16,distance:'≈ 25 années-lumière',kind:'Étoile blanche',color:0xd2e2ff},
    {id:'dubhe',name:'Dubhé',ra:11.0621,dec:61.7508,mag:1.79,distance:'≈ 123 années-lumière',kind:'Géante orange',color:0xffc58d},
    {id:'merak',name:'Mérak',ra:11.0307,dec:56.3824,mag:2.37,distance:'≈ 80 années-lumière',kind:'Étoile blanche',color:0xcbdfff},
    {id:'phecda',name:'Phecda',ra:11.8972,dec:53.6948,mag:2.44,distance:'≈ 84 années-lumière',kind:'Étoile blanche',color:0xd2e3ff},
    {id:'megrez',name:'Megrez',ra:12.257,dec:57.0326,mag:3.31,distance:'≈ 80 années-lumière',kind:'Étoile blanche',color:0xcbdfff},
    {id:'alioth',name:'Alioth',ra:12.9005,dec:55.9598,mag:1.77,distance:'≈ 83 années-lumière',kind:'Étoile blanche',color:0xd7e6ff},
    {id:'mizar',name:'Mizar',ra:13.3987,dec:54.9254,mag:2.23,distance:'≈ 83 années-lumière',kind:'Système stellaire multiple',color:0xcbdfff},
    {id:'alkaid',name:'Alkaïd',ra:13.7923,dec:49.3133,mag:1.86,distance:'≈ 104 années-lumière',kind:'Étoile bleue-blanche',color:0xb5d6ff},
    {id:'bellatrix',name:'Bellatrix',ra:5.4189,dec:6.3497,mag:1.64,distance:'≈ 250 années-lumière',kind:'Géante bleue',color:0xa6cfff},
    {id:'saiph',name:'Saïph',ra:5.7959,dec:-9.6696,mag:2.06,distance:'≈ 650 années-lumière',kind:'Supergéante bleue',color:0xa8ceff},
    {id:'mintaka',name:'Mintaka',ra:5.5334,dec:-0.2991,mag:2.25,distance:'≈ 1 200 années-lumière',kind:'Système stellaire multiple',color:0xb5d6ff},
    {id:'alnilam',name:'Alnilam',ra:5.6036,dec:-1.2019,mag:1.69,distance:'≈ 2 000 années-lumière',kind:'Supergéante bleue',color:0xa8ceff},
    {id:'alnitak',name:'Alnitak',ra:5.6793,dec:-1.9426,mag:1.74,distance:'≈ 1 200 années-lumière',kind:'Système stellaire multiple',color:0xa8ceff},
    {id:'schedar',name:'Schedar',ra:0.6751,dec:56.5373,mag:2.24,distance:'≈ 230 années-lumière',kind:'Géante orange',color:0xffc58d},
    {id:'caph',name:'Caph',ra:0.153,dec:59.1498,mag:2.28,distance:'≈ 55 années-lumière',kind:'Étoile blanche',color:0xd5e4ff},
    {id:'gamma-cas',name:'Gamma Cassiopée',ra:0.9451,dec:60.7167,mag:2.47,distance:'≈ 550 années-lumière',kind:'Étoile chaude variable',color:0xb3d4ff},
    {id:'ruchbah',name:'Ruchbah',ra:1.4303,dec:60.2353,mag:2.68,distance:'≈ 90 années-lumière',kind:'Étoile blanche',color:0xd5e4ff},
    {id:'egin',name:'Segin',ra:1.9066,dec:63.67,mag:3.35,distance:'≈ 440 années-lumière',kind:'Étoile bleue-blanche',color:0xb5d6ff},
    {id:'sadr',name:'Sadr',ra:20.3705,dec:40.2567,mag:2.23,distance:'≈ 1 800 années-lumière',kind:'Supergéante blanche-jaune',color:0xffe1b1},
    {id:'albireo',name:'Albireo',ra:19.512,dec:27.9597,mag:3.18,distance:'≈ 430 années-lumière',kind:'Étoile double colorée',color:0xffcc8e},
    {id:'gienah',name:'Gienah',ra:20.7702,dec:33.9703,mag:2.46,distance:'≈ 150 années-lumière',kind:'Géante bleue-blanche',color:0xc4d9ff},
    {id:'castor',name:'Castor',ra:7.5767,dec:31.8883,mag:1.58,distance:'≈ 51 années-lumière',kind:'Système stellaire multiple',color:0xcbdfff},
    {id:'pollux',name:'Pollux',ra:7.7553,dec:28.0262,mag:1.14,distance:'≈ 34 années-lumière',kind:'Géante orange',color:0xffbe85},
    {id:'markab',name:'Markab',ra:23.0793,dec:15.2053,mag:2.49,distance:'≈ 130 années-lumière',kind:'Étoile bleue-blanche',color:0xcbdfff},
    {id:'scheat',name:'Schéat',ra:23.0629,dec:28.0828,mag:2.42,distance:'≈ 200 années-lumière',kind:'Géante rouge',color:0xffa07c},
    {id:'algenib',name:'Algenib',ra:0.2206,dec:15.1836,mag:2.83,distance:'≈ 390 années-lumière',kind:'Étoile chaude',color:0xb4d3ff},
    {id:'alpheratz',name:'Alphératz',ra:0.1398,dec:29.0904,mag:2.06,distance:'≈ 97 années-lumière',kind:'Système stellaire',color:0xcbdfff},
    {id:'mirfak',name:'Mirfak',ra:3.4054,dec:49.8612,mag:1.79,distance:'≈ 590 années-lumière',kind:'Supergéante jaune-blanche',color:0xffe0ad},
    {id:'algol',name:'Algol',ra:3.1361,dec:40.9556,mag:2.12,distance:'≈ 93 années-lumière',kind:'Système binaire à éclipses',color:0xcbdfff}
  ];
  const skyVec=(ra,dec,r=76)=>{ const a=ra*15*DEG,d=dec*DEG; return new THREE.Vector3(-r*Math.cos(d)*Math.cos(a),r*Math.sin(d),-r*Math.cos(d)*Math.sin(a)); };
  const skyStarMap=new Map(), skyLabelMap=new Map();
  {
    const g=new THREE.BufferGeometry(), N=3600, pos=new Float32Array(N*3), colors=new Float32Array(N*3); let seed=73129;
    const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<N;i++){ const z=2*rnd()-1,a=rnd()*Math.PI*2,r=86,xy=Math.sqrt(1-z*z),b=0.55+rnd()*0.45; pos[3*i]=r*xy*Math.cos(a);pos[3*i+1]=r*z;pos[3*i+2]=r*xy*Math.sin(a);const warm=rnd()<.2;colors[3*i]=b*(warm?1:.72);colors[3*i+1]=b*(warm?.82:.84);colors[3*i+2]=b*(warm?.64:1); }
    g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const skyBackgroundPoints=new THREE.Points(g,new THREE.PointsMaterial({size:.48,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:.92,depthWrite:false}));skyGroup.add(skyBackgroundPoints);
  }
  skyStarDefs.forEach((d,i)=>{
    d.position=skyVec(d.ra,d.dec); d.object=new THREE.Mesh(new THREE.SphereGeometry(.12+Math.max(0,1.5-d.mag)*.055,12,10),new THREE.MeshBasicMaterial({color:d.color}));
    d.object.position.copy(d.position);d.object.userData.celestialId=d.id;skyGroup.add(d.object);d.glow=new THREE.Sprite(new THREE.SpriteMaterial({map:sunGlowTex,color:d.color,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false}));d.glow.position.copy(d.position);d.glow.scale.set(.7+Math.max(0,1.5-d.mag)*.35,.7+Math.max(0,1.5-d.mag)*.35,1);skyGroup.add(d.glow);skyStarMap.set(d.id,d);
    d.labelEl=document.createElement('div');d.labelEl.className='plabel';d.labelEl.textContent=d.name;d.labelEl.style.display='none';solarLabels.appendChild(d.labelEl);skyLabelMap.set(d.id,d.labelEl);
  });
  const constellationEdges={
    'Grande Ourse':[['dubhe','merak'],['merak','phecda'],['phecda','megrez'],['megrez','dubhe'],['megrez','alioth'],['alioth','mizar'],['mizar','alkaid']],
    'Orion':[['betelgeuse','rigel'],['rigel','saiph'],['saiph','bellatrix'],['bellatrix','betelgeuse']],
    'Cygne':[['deneb','sadr'],['sadr','albireo'],['deneb','gienah'],['gienah','albireo']],
    'Cassiopée':[['schedar','caph'],['schedar','gammaCas'],['gammaCas','ruchbah'],['ruchbah','segin']]
  };
  // Les lignes ne sont tracées qu'entre étoiles présentes dans le petit jeu de repères, pour rester honnêtes sur sa portée.
  const skyLines=new THREE.Group(); skyGroup.add(skyLines);
  const constellationDefs={
    'Grande Ourse':{color:0x85b7ff,edges:[['dubhe','merak'],['merak','phecda'],['phecda','megrez'],['megrez','dubhe'],['megrez','alioth'],['alioth','mizar'],['mizar','alkaid']]},
    'Orion':{color:0x83e1f2,edges:[['betelgeuse','bellatrix'],['bellatrix','mintaka'],['mintaka','alnilam'],['alnilam','alnitak'],['alnitak','saiph'],['saiph','rigel'],['rigel','mintaka'],['betelgeuse','alnitak']]},
    'Cassiopée':{color:0xc5a5ff,edges:[['caph','schedar'],['schedar','gamma-cas'],['gamma-cas','ruchbah'],['ruchbah','egin']]},
    'Triangle d’été':{color:0x91d8ff,edges:[['vega','deneb'],['deneb','altair'],['altair','vega']]},
    'Gémeaux':{color:0xffd2a0,edges:[['castor','pollux']]},
    'Pégase':{color:0xb7c6ff,edges:[['alpheratz','markab'],['markab','scheat'],['scheat','algenib'],['algenib','alpheratz']]},
    'Repères brillants':{color:0xffb9a0,edges:[['arcturus','spica'],['aldebaran','capella'],['sirius','procyon']]},
    'Cygne':{color:0x9ed8ff,edges:[['deneb','sadr'],['sadr','albireo'],['deneb','gienah'],['gienah','albireo']]}
  };
  const constellationLineObjects=[];
  Object.entries(constellationDefs).forEach(([name,def])=>{const pts=[];def.edges.forEach(([a,b])=>{const A=skyStarMap.get(a),B=skyStarMap.get(b);if(A&&B)pts.push(A.position,B.position);});if(pts.length){const geo=new THREE.BufferGeometry().setFromPoints(pts),line=new THREE.LineSegments(geo,new THREE.LineBasicMaterial({color:def.color,transparent:true,opacity:.5,depthWrite:false}));line.userData.constellation=name;skyLines.add(line);constellationLineObjects.push(line);}});
  const skyGrid=new THREE.Group();skyGrid.visible=false;skyGroup.add(skyGrid);
  const gridMat=new THREE.LineBasicMaterial({color:0x5d85b5,transparent:true,opacity:.19,depthWrite:false});
  for(let dec=-60;dec<=60;dec+=30){const pts=[];for(let ra=0;ra<=24.001;ra+=.25)pts.push(skyVec(ra,dec,82));const geo=new THREE.BufferGeometry().setFromPoints(pts);skyGrid.add(new THREE.LineLoop(geo,gridMat));}
  for(let ra=0;ra<24;ra+=2){const pts=[];for(let dec=-89;dec<=89;dec+=2)pts.push(skyVec(ra,dec,82));const geo=new THREE.BufferGeometry().setFromPoints(pts);skyGrid.add(new THREE.Line(geo,gridMat));}
  const skyMilkyWay=new THREE.Group();skyMilkyWay.visible=true;skyGroup.add(skyMilkyWay);
  {const N=2600,g=new THREE.BufferGeometry(),pos=new Float32Array(N*3),col=new Float32Array(N*3);let seed=118213;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<N;i++){const a=rnd()*Math.PI*2,y=(rnd()+rnd()+rnd()-1.5)*4.4,r=83+Math.sin(a*5)*.6;pos[3*i]=Math.cos(a)*Math.sqrt(Math.max(1,r*r-y*y));pos[3*i+1]=y;pos[3*i+2]=Math.sin(a)*Math.sqrt(Math.max(1,r*r-y*y));const q=rnd();col[3*i]=.38+q*.16;col[3*i+1]=.45+q*.2;col[3*i+2]=.65+q*.27;}g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));skyMilkyWay.add(new THREE.Points(g,new THREE.PointsMaterial({size:.72,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:.4,depthWrite:false})));}
  const Sky={fov:58,selected:null,limitMag:3.5,flags:{constellations:true,labels:true,grid:false,milkyWay:true},
    setFov(v){this.fov=Math.max(24,Math.min(88,v));camera.fov=this.fov;camera.updateProjectionMatrix();},
    setLimitMag(v){const n=Number(v);this.limitMag=Math.max(-1.5,Math.min(4,Number.isFinite(n)?n:3.5));skyStarDefs.forEach(d=>{const visible=d.mag<=this.limitMag||d===this.selected;d.object.visible=visible;d.glow.visible=visible;});if(this.selected&&!this.selected.object.visible)this.selected=null;this.updateLabels();},
    focus(d){this.selected=d;if(!d)return;skyGroup.updateMatrixWorld(true);const p=d.object.getWorldPosition(new THREE.Vector3());camera.position.set(0,0,0);camera.lookAt(p);camera.updateMatrixWorld(true);},
    reset(){skyGroup.rotation.set(0,0,0);this.selected=null;this.setFov(58);this.setLimitMag(this.limitMag);camera.near=.1;camera.far=180;camera.position.set(0,0,.01);camera.lookAt(0,0,-1);camera.updateProjectionMatrix();},
    update(){this.updateLabels();},
    updateLabels(){const visible=[];skyStarDefs.forEach(d=>{const w=d.object.getWorldPosition(new THREE.Vector3()).project(camera);const x=(w.x*.5+.5)*innerWidth,y=(-w.y*.5+.5)*innerHeight;const el=d.labelEl;if(!this.flags.labels||!d.object.visible||w.z< -1||w.z>1||w.x< -1.1||w.x>1.1||w.y< -1.1||w.y>1.1){el.style.display='none';return;}visible.push({d,el,x,y,clip:w.z});});
      const placed=[];visible.sort((a,b)=>(a.d===this.selected?-1:0)-(b.d===this.selected?-1:0));visible.forEach(v=>{const w=v.d.name.length*7+20,r=[v.x-w/2,v.y-36,v.x+w/2,v.y-4];if(v.d!==this.selected&&placed.some(q=>r[0]<q[2]&&r[2]>q[0]&&r[1]<q[3]&&r[3]>q[1])){v.el.style.display='none';return;}placed.push(r);v.el.style.display='block';v.el.style.left=v.x+'px';v.el.style.top=v.y+'px';v.el.classList.toggle('sel',v.d===this.selected);});},
    pick(x,y){let best=null,bd=22;skyStarDefs.forEach(d=>{const v=d.object.getWorldPosition(new THREE.Vector3()).project(camera);if(v.z< -1||v.z>1)return;const sx=(v.x*.5+.5)*innerWidth,sy=(-v.y*.5+.5)*innerHeight,dist=Math.hypot(sx-x,sy-y);if(dist<bd){bd=dist;best=d;}});return best;},
    search(q){const n=norm(q);return skyStarDefs.filter(d=>norm(d.name).includes(n)||d.id.includes(n)||norm(d.kind).includes(n)).slice(0,8).map(d=>({label:d.name,sub:d.kind,kind:'Étoile',color:'#88dfff',run:()=>{if(App.current!=='sky')App.go('sky');Sky.setLimitMag(Math.max(Sky.limitMag,d.mag));showSkyStar(d);}}));}
  };

  /* ----- Scène Galaxie : Voie lactée procédurale et repères locaux -----
     Visualisation conceptuelle avec échelle compressée, pas une carte galactique métrique. */
  const galaxyGroup=new THREE.Group();galaxyGroup.visible=false;scene.add(galaxyGroup);
  const galaxyArmPoints=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({size:.32,sizeAttenuation:true,vertexColors:true,transparent:true,opacity:.93,depthWrite:false}));
  {
    const N=8200,pos=new Float32Array(N*3),col=new Float32Array(N*3);let seed=923741;
    const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<N;i++){
      const r=.35+Math.pow(rnd(),.68)*24.5,arm=Math.floor(rnd()*4),ang=arm*Math.PI/2+r*.28+(rnd()-.5)*.75,th=(rnd()-.5)*(2.4*Math.exp(-r/9)+.1);
      pos[3*i]=Math.cos(ang)*r;pos[3*i+1]=Math.sin(ang)*r*.76;pos[3*i+2]=th;
      const q=rnd();if(r<4){col[3*i]=1;col[3*i+1]=.63+q*.25;col[3*i+2]=.34+q*.26;}else if(q>.72){col[3*i]=.55;col[3*i+1]=.72;col[3*i+2]=1;}else{col[3*i]=.77+q*.2;col[3*i+1]=.78+q*.14;col[3*i+2]=.86+q*.12;}
    }
    galaxyArmPoints.geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));galaxyArmPoints.geometry.setAttribute('color',new THREE.BufferAttribute(col,3));galaxyGroup.add(galaxyArmPoints);
  }
  const galaxyDustPoints=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({size:.62,sizeAttenuation:true,color:0x38324d,transparent:true,opacity:.56,depthWrite:false}));
  {const N=3100,pos=new Float32Array(N*3);let seed=438122;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<N;i++){const r=.7+Math.pow(rnd(),.7)*23,arm=Math.floor(rnd()*4),ang=arm*Math.PI/2+r*.28+(rnd()-.5)*.28+.18;pos[3*i]=Math.cos(ang)*r;pos[3*i+1]=Math.sin(ang)*r*.76;pos[3*i+2]=(rnd()-.5)*(.9+2.0*Math.exp(-r/10));}galaxyDustPoints.geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));galaxyGroup.add(galaxyDustPoints);}
  const galaxyHaloPoints=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({size:.18,sizeAttenuation:true,color:0x91a9d9,transparent:true,opacity:.34,depthWrite:false}));
  {const N=1850,pos=new Float32Array(N*3);let seed=827351;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<N;i++){const u=rnd()*2-1,a=rnd()*Math.PI*2,r=25+Math.pow(rnd(),.65)*19,q=Math.sqrt(1-u*u);pos[3*i]=Math.cos(a)*q*r;pos[3*i+1]=Math.sin(a)*q*r*.75;pos[3*i+2]=u*r*.34;}galaxyHaloPoints.geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));galaxyGroup.add(galaxyHaloPoints);}
  const galaxyBulgeRing=new THREE.Mesh(new THREE.TorusGeometry(3.5,.12,8,100),new THREE.MeshBasicMaterial({color:0xffc28c,transparent:true,opacity:.22,depthWrite:false}));galaxyGroup.add(galaxyBulgeRing);
  const galaxyCore=new THREE.Sprite(new THREE.SpriteMaterial({map:sunGlowTex,color:0xffd4a0,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));galaxyCore.position.set(0,0,0);galaxyCore.scale.set(10,10,1);galaxyGroup.add(galaxyCore);
  galaxyGroup.add(new THREE.Mesh(new THREE.SphereGeometry(.72,24,18),new THREE.MeshBasicMaterial({color:0xffdeb0})));
  const galaxyItems=[];
  function addGalaxyMarker(id,name,category,description,position,color,size){const obj=new THREE.Mesh(new THREE.SphereGeometry(size,18,14),new THREE.MeshBasicMaterial({color}));obj.position.copy(position);obj.userData.galaxyId=id;galaxyGroup.add(obj);const labelEl=document.createElement('div');labelEl.className='plabel';labelEl.textContent=name;labelEl.style.display='none';solarLabels.appendChild(labelEl);const item={id,name,category,description,position:position.clone(),object:obj,labelEl,color};galaxyItems.push(item);return item;}
  addGalaxyMarker('sagittarius-a','Sagittarius A*','Trou noir supermassif','Le centre dynamique de la Voie lactée, représenté ici par le bulbe lumineux.',new THREE.Vector3(0,0,.4),0xffcb85,.42);
  addGalaxyMarker('solar-neighborhood','Voisinage solaire','Région galactique','Le Système solaire est situé dans le disque galactique, dans la région du bras d’Orion. La distance et les dimensions sont compressées pour la lisibilité.',new THREE.Vector3(12,-2,.28),0x8fc5ff,.38);
  addGalaxyMarker('orion-arm','Bras d’Orion','Bras spiral','Région locale du disque galactique où se trouve le Système solaire ; la structure affichée est schématique.',new THREE.Vector3(13.5,-3.8,.05),0x7ed5ff,.25);
  addGalaxyMarker('andromeda','Galaxie d’Andromède','Galaxie voisine','Galaxie spirale voisine de la Voie lactée. Sa position dans cette scène est illustrative : les distances intergalactiques ne sont pas à l’échelle du disque.',new THREE.Vector3(-28,18,-3),0xb7c9ff,.72);
  addGalaxyMarker('large-magellanic-cloud','Grand Nuage de Magellan','Galaxie satellite','Petite galaxie satellite de la Voie lactée, représentée comme repère extérieur.',new THREE.Vector3(5,-25,-2),0xffb7a1,.42);
  addGalaxyMarker('perseus-arm','Bras de Persée','Bras spiral','Bras externe majeur de la Voie lactée ; sa position exacte est représentée de manière schématique.',new THREE.Vector3(-13,11,-.25),0x9ec6ff,.25);
  addGalaxyMarker('scutum-centaurus-arm','Bras Écu-Centaure','Bras spiral','Bras riche en étoiles et régions de formation stellaire, placé ici comme repère pédagogique.',new THREE.Vector3(5,12,.1),0xffb88d,.25);
  addGalaxyMarker('pleiades','Amas des Pléiades','Amas ouvert','Amas ouvert connu dans le voisinage galactique. Son emplacement et sa taille sont compressés dans cette représentation.',new THREE.Vector3(17,8,.35),0x9ed5ff,.3);
  addGalaxyMarker('orion-nebula','Nébuleuse d’Orion','Nébuleuse','Région de formation stellaire située dans notre région galactique locale ; repère illustratif.',new THREE.Vector3(14.4,-4.3,.15),0xffb4c8,.28);
  addGalaxyMarker('omega-centauri','Omega Centauri','Amas globulaire','Grand amas globulaire de la Voie lactée, représenté comme point de repère et non à l’échelle.',new THREE.Vector3(3,-14,1.4),0xffd4a0,.3);
  addGalaxyMarker('cygnus-x','Cygnus X','Région de formation stellaire','Complexe de formation d’étoiles dans la région du Cygne, placé schématiquement dans le disque galactique.',new THREE.Vector3(9.5,2.8,.2),0x91dcff,.25);
  const Galaxy={distance:56,targetDistance:56,selected:null,focusTarget:null,viewMode:'perspective',flags:{labels:true,arms:true,markers:true,dust:true,halo:true,core:true},
    reset(){galaxyGroup.rotation.set(.22,-.18,0);this.viewMode='perspective';this.distance=this.targetDistance=56;this.selected=null;this.focusTarget=null;camera.near=.1;camera.far=3000;camera.fov=50;camera.position.set(0,2,56);camera.lookAt(0,0,0);camera.updateProjectionMatrix();},
    setView(mode){this.viewMode=mode;if(mode==='top'){galaxyGroup.rotation.set(0,0,0);}else if(mode==='edge'){galaxyGroup.rotation.set(1.28,-.08,0);}else{galaxyGroup.rotation.set(.22,-.18,0);}this.selected=null;this.focusTarget=null;},
    focus(d){this.selected=d;this.focusTarget=d?d.position.clone():null;if(d)this.targetDistance=Math.min(this.targetDistance,34);},
    zoomBy(f){this.targetDistance=Math.max(8,Math.min(145,this.targetDistance*f));},
    drag(dx,dy){galaxyGroup.rotation.y+=dx*.004;galaxyGroup.rotation.x=Math.max(-1.45,Math.min(1.45,galaxyGroup.rotation.x+dy*.004));this.viewMode='custom';},
    update(dt){this.distance+=(this.targetDistance-this.distance)*(1-Math.exp(-dt*5));galaxyGroup.updateMatrixWorld(true);const target=this.focusTarget?galaxyGroup.localToWorld(this.focusTarget.clone()):new THREE.Vector3(0,0,0);camera.position.set(target.x,target.y+1.5,target.z+this.distance);camera.lookAt(target);camera.updateMatrixWorld(true);this.updateLabels();},
    updateLabels(){const visible=[];galaxyItems.forEach(d=>{const v=d.object.getWorldPosition(new THREE.Vector3()).project(camera),x=(v.x*.5+.5)*innerWidth,y=(-v.y*.5+.5)*innerHeight;const show=this.flags.labels&&d.object.visible&&v.z>=-1&&v.z<=1&&Math.abs(v.x)<1.2&&Math.abs(v.y)<1.2;if(show)visible.push({d,x,y});else d.labelEl.style.display='none';});const placed=[];visible.sort((a,b)=>(a.d===this.selected?-1:0)-(b.d===this.selected?-1:0));visible.forEach(v=>{const w=v.d.name.length*7+20,r=[v.x-w/2,v.y-36,v.x+w/2,v.y-4];if(v.d!==this.selected&&placed.some(q=>r[0]<q[2]&&r[2]>q[0]&&r[1]<q[3]&&r[3]>q[1])){v.d.labelEl.style.display='none';return;}placed.push(r);v.d.labelEl.style.display='block';v.d.labelEl.style.left=v.x+'px';v.d.labelEl.style.top=v.y+'px';v.d.labelEl.classList.toggle('sel',v.d===this.selected);});},
    pick(x,y){let best=null,bd=26;galaxyItems.forEach(d=>{if(!d.object.visible)return;const v=d.object.getWorldPosition(new THREE.Vector3()).project(camera);if(v.z< -1||v.z>1)return;const dist=Math.hypot((v.x*.5+.5)*innerWidth-x,(-v.y*.5+.5)*innerHeight-y);if(dist<bd){bd=dist;best=d;}});return best;},
    search(q){const n=norm(q);return galaxyItems.filter(d=>norm(d.name).includes(n)||norm(d.category).includes(n)).map(d=>({label:d.name,sub:d.category,kind:'Galaxie',color:'#c5b7ff',run:()=>{if(App.current!=='galaxy')App.go('galaxy');showGalaxyItem(d);}}));}
  };

  function renderTabs(){
    $('scenes').innerHTML=[...App.scenes.values()].map(s=>
      '<button class="tab'+(s.id===App.current?' active':'')+'" role="tab" aria-selected="'+(s.id===App.current)+'" data-scene="'+s.id+'" title="'+esc(s.status==='ready'?s.name:s.name+' — bientôt')+'">'+s.icon+'<span>'+esc(s.name)+'</span>'+(s.status!=='ready'?'<em class="badge">Bientôt</em>':'')+'</button>').join('');
  }
  $('scenes').addEventListener('click',e=>{ const b=e.target.closest('[data-scene]'); if(b) App.go(b.dataset.scene); });
  renderTabs();

  /* ----- Fenêtres modales ----- */
  let modalReturn=null;
  function openModal(html){ closeTransient(); $('mbody').innerHTML=html; $('modal').classList.add('open'); modalReturn=document.activeElement; $('mclose').focus(); }
  function closeModal(){ if(!$('modal').classList.contains('open')) return; $('modal').classList.remove('open'); if(modalReturn&&modalReturn.focus) try{ modalReturn.focus(); }catch(e){} }
  $('mclose').onclick=closeModal;
  $('modal').addEventListener('pointerdown',e=>{ if(e.target===$('modal')) closeModal(); });
  function toast(s){ const t=$('toast'); t.textContent=s; t.classList.add('show'); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('show'),2500); }
  canvas.addEventListener('webglcontextlost',e=>{ e.preventDefault(); toast('Contexte graphique interrompu. Recharge ME3D si le rendu ne reprend pas.'); });
  canvas.addEventListener('webglcontextrestored',()=>location.reload());

  function openRoadmap(focusId){
    const soon=[...App.scenes.values()].filter(s=>s.status!=='ready').sort((a,b)=>(b.id===focusId)-(a.id===focusId));
    openModal('<h2>Bientôt disponible</h2><p class="lead">La Terre et le Système solaire sont là ; voici la suite. Même recherche, mêmes calques, même horloge, mêmes fiches d\'objets pour chaque nouveau monde.</p>'+
      soon.map(s=>'<div class="card'+(s.id===focusId?' focus':'')+'"><h5>'+s.icon+esc(s.name)+'<em class="badge">Bientôt</em></h5><p>'+esc(s.tagline)+'</p><ul>'+s.features.map(f=>'<li>'+esc(f)+'</li>').join('')+'</ul></div>').join(''));
  }

  /* ----- Fiche d'objet générique ----- */
  let panelActions=[];
  function showInfo(o){
    $('peyebrow').textContent=o.eyebrow||''; $('pname').textContent=o.title; $('ptype').textContent=o.sub||'';
    let html='';
    if(o.stats&&o.stats.length) html+='<div class="stats">'+o.stats.map(s=>'<div class="stat'+(s.wide?' wide':'')+'"><small>'+esc(s.label)+'</small><b>'+esc(s.value)+'</b></div>').join('')+'</div>';
    (o.chips||[]).forEach(c=>{ html+='<span class="chip">'+esc(c)+'</span>'; });
    panelActions=o.actions||[];
    if(panelActions.length) html+='<div class="pactions">'+panelActions.map((a,i)=>'<button class="pbtn'+(a.primary?' primary':'')+'" data-act="'+i+'">'+esc(a.label)+'</button>').join('')+'</div>';
    $('details').innerHTML=html; $('panel').classList.add('open');
  }
  $('details').addEventListener('click',e=>{ const b=e.target.closest('[data-act]'); if(b){ const a=panelActions[+b.dataset.act]; if(a&&a.fn) a.fn(); } });
  $('close').onclick=()=>{ if(App.current==='solar'){ Solar.reset(); renderSolarPanel(); $('panel').classList.remove('open'); setHash('solar'); } else if(selected) deselect(); else $('panel').classList.remove('open'); };

  /* ----- Calques ----- */
  const Layers={ defs:[], state:{},
    add(d){ d.scene=d.scene||'earth'; this.defs.push(d); const saved=(Store.data.layers||{})[d.id]; this.state[d.id]=saved===undefined?d.def:saved; d.set(this.state[d.id]); },
    set(id,v,persist){ const d=this.defs.find(x=>x.id===id); if(!d) return; this.state[id]=v; d.set(v);
      if(persist!==false){ Store.data.layers=Object.assign(Store.data.layers||{},{[id]:v}); Store.save(); } syncUI(); },
    toggle(id){ this.set(id,!this.state[id]); } };
  function renderLayers(){
    const groups={}; Layers.defs.filter(d=>d.scene===App.current).forEach(d=>{ (groups[d.group]=groups[d.group]||[]).push(d); });
    $('layersPop').innerHTML=Object.entries(groups).map(([g,ds])=>'<h3>'+esc(g)+'</h3>'+ds.map(d=>
      '<label class="lrow"><span><b>'+esc(d.label)+'</b><small>'+esc(d.desc)+'</small></span><input type="checkbox" data-layer="'+d.id+'"'+(Layers.state[d.id]?' checked':'')+'><i class="sw"></i></label>').join('')).join('');
  }
  $('layersPop').addEventListener('change',e=>{ const id=e.target.dataset&&e.target.dataset.layer; if(id) Layers.set(id,e.target.checked); });
  function syncUI(){
    const labelKey=({solar:'slabels',earth:'labels',sky:'skylabels',galaxy:'galaxylabels'})[App.current]||'labels';
    $('labels').classList.toggle('active',!!Layers.state[labelKey]);
    const ob=$('orbitsBtn'); if(ob){ ob.classList.toggle('active',App.current==='solar'?!!Layers.state.orbits:App.current==='sky'?!!Layers.state.skyconstellations:false); ob.style.display=['solar','sky'].includes(App.current)?'':'none'; }
    const scale=$('scaleBtn'); if(scale){ scale.classList.toggle('active',App.current==='solar'&&VIS.mode==='extended'); scale.style.display=App.current==='solar'?'':'none'; }
    $('borders').style.display=$('night').style.display=App.current==='earth'?'':'none';
    $('borders').classList.toggle('active',!!Layers.state.borders);
    $('night').classList.toggle('active',nightView||Settings.lighting==='realtime');
    $('layersBtn').classList.toggle('active',$('layersPop').classList.contains('open'));
    $('layersPop').querySelectorAll('input[data-layer]').forEach(i=>{ i.checked=!!Layers.state[i.dataset.layer]; });
    if(typeof renderSceneTools==='function'&&$('sceneTools'))renderSceneTools();
  }
  function toggleLayersPop(force){ const p=$('layersPop'), open=force===undefined?!p.classList.contains('open'):force; if(open){ closeModal(); renderLayers(); } p.classList.toggle('open',open); syncUI(); }
  $('layersBtn').onclick=e=>{ e.stopPropagation(); toggleLayersPop(); };
  function closeTransient(){ $('layersPop').classList.remove('open'); closeResults(); $('layersBtn').classList.remove('active'); }

  /* ----- Qualité du rendu ----- */
  function applyQuality(){ const dpr=window.devicePixelRatio||1, mobile=matchMedia('(max-width: 860px)').matches; renderer.setPixelRatio(Settings.quality==='high'?Math.min(dpr,2):Settings.quality==='low'?1:Math.min(dpr,mobile?1.5:2)); resize(); }

  /* ----- Réglages, aide ----- */
  const seg=(key,opts)=>'<div class="seg" data-seg="'+key+'">'+opts.map(([v,l])=>'<button data-val="'+v+'" class="'+(Settings[key]===v?'on':'')+'">'+l+'</button>').join('')+'</div>';
  const setrow=(t,d,ctl)=>'<div class="setrow"><div><b>'+t+'</b><small>'+d+'</small></div>'+ctl+'</div>';
  function openSettings(){
    openModal('<h2>Réglages ME3D</h2><p class="lead">Les préférences sont enregistrées sur cet appareil.</p>'+
      '<h4>Affichage</h4>'+
      setrow('Rotation automatique de la Terre','Rotation douce lorsque rien n’est sélectionné dans la scène Terre.','<label class="lrow" style="padding:0"><input type="checkbox" data-set="autoRotate"'+(Settings.autoRotate?' checked':'')+'><i class="sw"></i></label>')+
      setrow('Qualité du rendu','« Économie » réduit la charge graphique.',seg('quality',[['auto','Auto'],['high','Haute'],['low','Économie']]))+
      '<h4>Système solaire</h4>'+setrow('Espacement visuel des orbites','Compacte : le système tient plus facilement à l’écran. Étendue : les planètes externes sont davantage espacées, sans prétendre représenter les distances à l’échelle.',seg('systemScale',[['compact','Compacte'],['extended','Étendue']]))+
      '<h4>Éclairage de la Terre</h4>'+
      setrow('Soleil','Fixe : éclairage constant. Temps réel : la ligne jour/nuit suit l’heure UTC simulée.',seg('lighting',[['fixed','Fixe'],['realtime','Temps réel']]))+
      '<h4>Données</h4>'+
      setrow('Réinitialiser','Rétablit les calques et les préférences par défaut.','<button class="pbtn" id="resetAll">Réinitialiser</button>'));
  }
  $('mbody').addEventListener('click',e=>{
    const sb=e.target.closest('.seg button');
    if(sb){ const key=sb.parentElement.dataset.seg; Settings[key]=sb.dataset.val; saveSettings(); sb.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===sb));
      if(key==='quality') applyQuality();
      if(key==='systemScale') Solar.setScaleMode(Settings.systemScale);
      if(key==='lighting'){ syncUI(); toast(Settings.lighting==='realtime'?'Soleil en temps réel':'Soleil fixe'); }
    }
    if(e.target.id==='resetAll'){ Store.data={}; Store.save(); location.reload(); }
  });
  $('mbody').addEventListener('change',e=>{ const k=e.target.dataset&&e.target.dataset.set; if(k){ Settings[k]=e.target.checked; saveSettings(); } });
  function openHelp(){
    openModal('<h2>À propos de ME3D</h2><p class="lead">Explore le Système solaire, la Terre, une sélection d’étoiles brillantes et une représentation conceptuelle de la Voie lactée. Le Ciel et la Galaxie sont des scènes interactives, avec certaines données schématiques indiquées dans leurs fiches.</p>'+
      '<h4>Navigation</h4><div class="keys"><kbd class="k">Glisser</kbd><span>Faire pivoter le monde actif</span><kbd class="k">Molette</kbd><span>Zoomer progressivement</span><kbd class="k">Clic</kbd><span>Sélectionner une planète, une lune ou un objet céleste</span><kbd class="k">/</kbd><span>Rechercher (ou Ctrl/⌘ + K)</span><kbd class="k">R</kbd><span>Vue d’ensemble</span><kbd class="k">L</kbd><span>Afficher ou masquer les noms</span><kbd class="k">O</kbd><span>Orbites du Système solaire ou figures célestes</span><kbd class="k">E</kbd><span>Basculer l’espacement compact / étendu</span><kbd class="k">Glisser</kbd><span>Orienter le Ciel ou la Galaxie</span><kbd class="k">B</kbd><span>Frontières dans la scène Terre</span><kbd class="k">N</kbd><span>Jour / nuit dans la scène Terre</span><kbd class="k">C</kbd><span>Calques</span><kbd class="k">S</kbd><span>Réglages</span><kbd class="k">G</kbd><span>Parcours guidés</span><kbd class="k">V</kbd><span>Favoris</span><kbd class="k">F</kbd><span>Plein écran</span><kbd class="k">Espace</kbd><span>Pause du temps</span><kbd class="k">+ −</kbd><span>Zoomer / dézoomer</span><kbd class="k">Échap</kbd><span>Fermer</span></div>'+
      '<h4>Limites des scènes Ciel et Galaxie</h4><p class="credits">La scène Ciel propose un catalogue pédagogique réduit de plus de 40 étoiles nommées, une sélection de figures et une grille équatoriale. Ce n’est pas encore un atlas astrométrique exhaustif ; les magnitudes et distances affichées sont indicatives, et la bande de Voie lactée est schématique. La scène Galaxie associe un champ stellaire procédural à des repères de régions, amas et galaxies. Ses couches de poussière, son halo et ses distances sont visuels, non mesurés ; ils servent à explorer la structure générale, pas à lire une carte galactique à l’échelle.</p><h4>Lire les orbites</h4><p class="credits">Les trajectoires planétaires sont calculées à partir d’éléments orbitaux képlériens publiés par le JPL. Un croisement apparent à l’écran peut venir de la projection 2D : il ne signifie pas que les trajectoires se touchent en 3D. Les orbites de Vénus et de la Terre restent séparées radialement. Les distances et les tailles sont compressées ; le bouton d’échelle modifie encore l’espacement des planètes externes. La Lune terrestre utilise les principaux termes de la série de Meeus. Les 20 autres lunes suivent des trajectoires circulaires visuelles simplifiées à partir de leurs périodes et distances moyennes.</p>'+
      '<h4>Données et rendu</h4><p class="credits">Positions planétaires : <a href="https://ssd.jpl.nasa.gov/planets/approx_pos.html" target="_blank" rel="noopener">JPL — Approximate Positions of the Planets</a> · Textures de la Terre et calques géographiques : composites et données embarqués dans le projet · Textures des satellites secondaires : textures procédurales ME3D · Orientation des corps : éléments IAU · Rendu 3D : three.js. Les tailles et distances ne sont pas toutes à l’échelle.</p>');
  }
  $('settingsBtn').onclick=e=>{ e.stopPropagation(); openSettings(); };
  $('helpBtn').onclick=e=>{ e.stopPropagation(); openHelp(); };
  $('fsBtn').onclick=()=>{ const d=document; if(d.fullscreenElement){ d.exitFullscreen&&d.exitFullscreen(); } else if(d.documentElement.requestFullscreen){ d.documentElement.requestFullscreen().catch(()=>{}); } else toast('Plein écran indisponible'); };

  /* ----- Barre du temps ----- */
  function fmtDate(ms){ return new Date(ms).toLocaleString('fr-FR',{timeZone:'UTC',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).replace(',',' ·'); }
  function updateTimeUI(){ $('tdate').textContent=fmtDate(Clock.t); $('tspeed').textContent=Clock.labels[Clock.si]; $('tspeed').title='Vitesse : '+Clock.hints[Clock.si];
    $('tplayico').innerHTML=Clock.paused?'<path d="M7 4.5v15l13-7.5z"/>':'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>'; $('tplay').classList.toggle('active',Clock.paused); }
  $('tplay').onclick=()=>{ Clock.paused=!Clock.paused; updateTimeUI(); };
  $('tspeed').onclick=()=>{ Clock.si=(Clock.si+1)%Clock.speeds.length; Clock.speed=Clock.speeds[Clock.si]; Clock.paused=false; updateTimeUI(); toast('Vitesse : '+Clock.hints[Clock.si]); };
  $('tnow').onclick=()=>{ Clock.t=Date.now(); Clock.si=0; Clock.speed=1; Clock.paused=false; updateTimeUI(); toast('Heure actuelle'); };
  $('tminus').onclick=()=>{Clock.t-=86400000;updateTimeUI();toast('Un jour en arrière');};
  $('tplus').onclick=()=>{Clock.t+=86400000;updateTimeUI();toast('Un jour en avant');};
  function openDateModal(){
    const d=new Date(Clock.t), date=d.toISOString().slice(0,10), time=d.toISOString().slice(11,16);
    openModal('<h2>Choisir la date simulée</h2><p class="lead">La simulation utilise l’heure UTC. Les positions du Système solaire se recalculent à partir de cette date.</p><div class="setrow"><div><b>Date</b><small>Jour, mois et année</small></div><input class="compare-select" style="max-width:190px" id="clockDate" type="date" value="'+date+'"></div><div class="setrow"><div><b>Heure UTC</b><small>Heures et minutes</small></div><input class="compare-select" style="max-width:190px" id="clockTime" type="time" value="'+time+'"></div><div class="pactions"><button class="pbtn" id="clockMinusYear">−1 an</button><button class="pbtn" id="clockPlusYear">+1 an</button><button class="pbtn primary" id="clockApply">Appliquer</button></div>');
  }
  $('tdatepick').onclick=openDateModal;
  $('mbody').addEventListener('click',e=>{
    if(e.target.id==='clockApply'){
      const date=$('clockDate')&&$('clockDate').value, time=$('clockTime')&&$('clockTime').value;
      const stamp=date&&time?Date.parse(date+'T'+time+':00Z'):NaN;
      if(!Number.isFinite(stamp)){toast('Choisis une date et une heure valides');return;}
      Clock.t=stamp;updateTimeUI();closeModal();toast('Date simulée mise à jour');
    }else if(e.target.id==='clockMinusYear'||e.target.id==='clockPlusYear'){
      const el=$('clockDate'); if(!el||!el.value)return; const d=new Date(el.value+'T12:00:00Z');d.setUTCFullYear(d.getUTCFullYear()+(e.target.id==='clockMinusYear'?-1:1));el.value=d.toISOString().slice(0,10);
    }
  });
  updateTimeUI();

  /* ======================================================================
     Monde « Terre »
     ====================================================================== */
  let selected=null, nightView=false, sunT=0, lastFrame=performance.now();
  let drag=false, lx=0, ly=0, moved=0, targetDistance=4.7, distance=4.7, lastInteraction=0, animToken=0, pinch=null;
  const pointers=new Map();
  function resize(){ renderer.setSize(innerWidth,innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); }
  addEventListener('resize',resize);
  const clampDist=d=>Math.max(1.5,Math.min(9,d));
  const raycaster=new THREE.Raycaster(), mouse=new THREE.Vector2();

  canvas.addEventListener('pointerdown',e=>{
    animToken++; pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}); try{ canvas.setPointerCapture(e.pointerId); }catch(_){} lastInteraction=performance.now(); closeTransient();
    if(pointers.size===1){ drag=true; lx=e.clientX; ly=e.clientY; moved=0; canvas.classList.add('dragging'); }
    else if(pointers.size===2){ drag=false; const [a,b]=[...pointers.values()]; pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,t:App.current==='solar'?Solar.rig.tDist:App.current==='sky'?Sky.fov:App.current==='galaxy'?Galaxy.targetDistance:targetDistance}; }
  });
  canvas.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId)) return; pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&pointers.size===2){ const [a,b]=[...pointers.values()]; const nd=pinch.t*pinch.d/(Math.hypot(a.x-b.x,a.y-b.y)||1); if(App.current==='solar') Solar.setDist(nd); else if(App.current==='sky') Sky.setFov(nd); else if(App.current==='galaxy') Galaxy.zoomBy(nd/Galaxy.targetDistance); else targetDistance=clampDist(nd); lastInteraction=performance.now(); return; }
    if(!drag) return;
    const dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY; moved+=Math.abs(dx)+Math.abs(dy);
    if(App.current==='solar'){ Solar.drag(dx,dy); }
    else if(App.current==='sky'){ skyGroup.rotation.y-=dx*.0045;skyGroup.rotation.x=Math.max(-1.35,Math.min(1.35,skyGroup.rotation.x+dy*.004)); }
    else if(App.current==='galaxy'){ Galaxy.drag(dx,dy); }
    else { const k=Math.min(1,distance/4.7)*0.005+0.0012; globeGroup.rotation.y+=dx*k; globeGroup.rotation.x=Math.max(-1.25,Math.min(1.25,globeGroup.rotation.x+dy*k*0.8)); }
    lastInteraction=performance.now();
  });
  const endPointer=e=>{
    const had=pointers.delete(e.pointerId); if(!had) return;
    if(pointers.size<2) pinch=null;
    if(pointers.size===0){ const wasDrag=drag; drag=false; canvas.classList.remove('dragging'); if(wasDrag&&moved<6&&e.type==='pointerup') tryPick(e.clientX,e.clientY); }
    lastInteraction=performance.now();
  };
  canvas.addEventListener('pointerup',endPointer); canvas.addEventListener('pointercancel',endPointer);
  canvas.addEventListener('wheel',e=>{ e.preventDefault(); const f=Math.exp(e.deltaY*0.0009); if(App.current==='solar') Solar.zoomBy(f); else if(App.current==='sky') Sky.setFov(Sky.fov*f); else if(App.current==='galaxy') Galaxy.zoomBy(f); else targetDistance=clampDist(targetDistance*f); lastInteraction=performance.now(); },{passive:false});
  function tryPick(cx,cy){
    if(App.current==='solar'){ const b=Solar.pick(cx,cy); if(b) showSolar(b); return; }
    if(App.current==='sky'){const d=Sky.pick(cx,cy);if(d)showSkyStar(d);return;}
    if(App.current==='galaxy'){const d=Galaxy.pick(cx,cy);if(d)showGalaxyItem(d);return;}
    mouse.x=(cx/innerWidth)*2-1; mouse.y=-(cy/innerHeight)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const hits=raycaster.intersectObjects(markerMeshes.concat(modelMeshes)).filter(h=>{ const m=h.object.userData.monument; return m&&!m._hidden; });
    if(hits.length){ const g=raycaster.intersectObject(globeMesh)[0]; if(!g||hits[0].distance<g.distance) show(hits[0].object.userData.monument); }
  }

  /* ----- Soleil : fixe (jour/nuit au choix) ou temps réel (point subsolaire) ----- */
  const sunDay=new THREE.Vector3(6,1.5,3), sunNight=new THREE.Vector3(-5,-1,-4.5);
  function subsolar(ms){ const d=new Date(ms), start=Date.UTC(d.getUTCFullYear(),0,0), doy=(ms-start)/86400000;
    const decl=23.44*Math.sin(2*Math.PI*(doy-81)/365), hrs=d.getUTCHours()+d.getUTCMinutes()/60+d.getUTCSeconds()/3600;
    return { lat:decl, lon:-((hrs-12)*15) }; }
  function updateSun(dt){
    sunT+=((nightView?1:0)-sunT)*Math.min(1,dt*2.2);
    if(Settings.lighting==='realtime'){
      const sp=subsolar(Clock.t); globeGroup.updateWorldMatrix(true,false);
      sun.position.copy(latLonToVec3(sp.lat,sp.lon,6)).applyMatrix4(globeGroup.matrixWorld);
      ambient.intensity=0.40; sunSprite.material.opacity=0.9;
    } else {
      sun.position.copy(sunDay).lerp(sunNight,sunT); ambient.intensity=0.40+sunT*0.12; sunSprite.material.opacity=0.9*(1-sunT);
    }
    sunSprite.position.copy(sun.position).multiplyScalar(6);
    lightsU.sunDir.value.copy(sun.position);
    atmoUniforms.sunV.value.copy(sun.position).transformDirection(camera.matrixWorldInverse);
  }

  /* ----- Étiquettes (sans chevauchement) ----- */
  const labelsLayer=$('labels-layer'), labelEls=new Map();
  monuments.forEach(m=>{ const el=document.createElement('div'); el.className='mlabel'; el.textContent=m.name; labelsLayer.appendChild(el); labelEls.set(m,el); });
  function updateLabels(){
    const wp=new THREE.Vector3(), n=new THREE.Vector3(), tc=new THREE.Vector3(), pr=new THREE.Vector3(), vis=[];
    const labelsOn=!!Layers.state.labels;
    markerMeshes.forEach(pin=>{
      const m=pin.userData.monument, el=labelEls.get(m);
      pin.getWorldPosition(wp); n.copy(wp).normalize(); tc.copy(camera.position).sub(wp).normalize();
      if(m._hidden||(!labelsOn&&m!==selected)||n.dot(tc)<0.08){ el.style.display='none'; return; }
      pr.copy(wp).project(camera);
      if(pr.z>1){ el.style.display='none'; return; }
      vis.push({m,el,x:(pr.x*0.5+0.5)*innerWidth,y:(-pr.y*0.5+0.5)*innerHeight,p:m===selected?0:(m.kind?2:1)});
    });
    vis.sort((a,b)=>a.p-b.p);
    const placed=[];
    vis.forEach(v=>{
      const w=v.m.name.length*6.9+20, r=[v.x-w/2-4,v.y-40,v.x+w/2+4,v.y-8];
      if(v.p>0&&placed.some(q=>r[0]<q[2]&&r[2]>q[0]&&r[1]<q[3]&&r[3]>q[1])){ v.el.style.display='none'; return; }
      placed.push(r); v.el.style.display='block'; v.el.style.left=v.x+'px'; v.el.style.top=v.y+'px';
    });
  }

  /* ----- Fiches ----- */
  const fmtM=v=>(v<0?'−':'')+Math.abs(v).toLocaleString('fr-FR')+' m';
  const kindLabel=m=>m.kind==='city'?'Ville':m.kind==='peak'?'Sommet':m.kind==='trench'?'Abysses':'Lieu remarquable';
  const kindColor=m=>m.kind==='peak'?'#eef3ff':m.kind==='trench'?'#2dd4bf':'#6d8dfb';
  function renderEarthPanel(){
    showInfo({eyebrow:'Planète',title:'Terre',sub:'Troisième planète du Système solaire',
      stats:[{label:'Rayon moyen',value:'6 371 km'},{label:'Inclinaison de l’axe',value:'23,44°'},{label:'Jour sidéral',value:'23 h 56 min'},{label:'Année',value:'365,256 jours'}],
      chips:['Eau ≈ 71 %','Satellite naturel : la Lune',monuments.length+' lieux et repères disponibles'],
      actions:[{label:'Rechercher un lieu',primary:true,fn:()=>{sIn.focus();sIn.select();}},{label:'Voir les calques',fn:()=>toggleLayersPop(true)},{label:'À propos de ME3D',fn:openHelp}]});
  }
  function copyLink(m){
    const url=location.href.split('#')[0]+'#earth/'+encodeURIComponent(m.name);
    const done=()=>toast('Lien copié'), fail=()=>toast('Copie impossible');
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done,()=>{ try{ const t=document.createElement('textarea'); t.value=url; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); done(); }catch(e){ fail(); } });
    else fail();
  }
  function copyDeepLink(scene,id,label){
    const url=location.href.split('#')[0]+'#'+scene+'/'+encodeURIComponent(id);
    const done=()=>toast('Lien vers '+label+' copié'), fail=()=>toast('Copie impossible');
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done,()=>{try{const t=document.createElement('textarea');t.value=url;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();done();}catch(e){fail();}});
    else {try{const t=document.createElement('textarea');t.value=url;document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();ok?done():fail();}catch(e){fail();}}
  }
  function renderSitePanel(m){
    const isGeo=m.kind==='peak'||m.kind==='trench';
    showInfo({eyebrow:kindLabel(m),title:m.name,sub:m.country,
      stats:(isGeo?[{label:m.elev<0?'Profondeur':'Altitude',value:fmtM(m.elev),wide:true}]:[]).concat([{label:'Latitude',value:fmtLat(m.lat)},{label:'Longitude',value:fmtLon(m.lon)}]),
      chips:[m.note||((m.lat>=0?'Hémisphère nord':'Hémisphère sud')+' · '+(m.lon>=0?'Est':'Ouest')), 'Coordonnées indicatives'],
      actions:[{label:'Centrer',primary:true,fn:()=>focusOn(m)},{label:'Copier le lien',fn:()=>copyLink(m)},{label:isFavorite('earth',m.name)?'Retirer des favoris':'Ajouter aux favoris',fn:()=>toggleFavorite('earth',m.name,m.name)}]});
  }
  const setHash=h=>{ try{ history.replaceState(null,'',h?'#'+h:location.pathname+location.search); }catch(e){} };
  function show(m){
    closeTransient(); closeModal();
    selected=m; renderSitePanel(m); selectRing.visible=true;
    const pin=markerMeshes.find(p=>p.userData.monument===m);
    selectRing.position.copy(pin.userData.base); selectRing.lookAt(pin.userData.base.clone().multiplyScalar(2));
    focusOn(m); setHash('earth/'+encodeURIComponent(m.name));
  }
  function focusOn(m){ animateRotationTo(Math.PI/2-(m.lon+180)*DEG, m.lat*DEG); targetDistance=1.95; lastInteraction=performance.now(); }
  function deselect(){ selected=null; selectRing.visible=false; renderEarthPanel(); setHash('earth'); }
  function animateRotationTo(ty,tx){
    const my=++animToken; tx=Math.max(-1.35,Math.min(1.35,tx));
    const sy=globeGroup.rotation.y, sx=globeGroup.rotation.x, TAU=Math.PI*2;
    const dy=((((ty-sy)+Math.PI)%TAU)+TAU)%TAU-Math.PI, t0=performance.now();
    (function step(now){
      if(my!==animToken) return;
      const t=Math.min(1,(now-t0)/(reduceMotion?1:900)), e=1-Math.pow(1-t,3);
      globeGroup.rotation.y=sy+dy*e; globeGroup.rotation.x=sx+(tx-sx)*e;
      if(t<1) requestAnimationFrame(step);
    })(t0);
  }
  function resetView(){
    if(App.current==='solar'){Solar.reset(true);Solar.update(0,Clock.t);renderSolarPanel();setHash('solar');return;}
    if(App.current==='sky'){Sky.reset();renderSkyPanel();setHash('sky');return;}
    if(App.current==='galaxy'){Galaxy.reset();renderGalaxyPanel();setHash('galaxy');return;}
    if(selected)deselect();animateRotationTo(-Math.PI/2,0.12);targetDistance=4.7;lastInteraction=performance.now(); }

  /* ----- Recherche (commune à tous les mondes) ----- */
  const sIn=$('search'), sRes=$('results'); let sItems=[], sSel=-1;
  const SUGGEST=['Le Soleil','Mercure','Vénus','Terre','Mars','Jupiter','Saturne','Lune','Io','Europe','Titan','Triton'];
  function bodyResult(b){ return {label:b.name,sub:b.isMoon?(b.id==='moon'?'Satellite naturel de la Terre':'Satellite naturel de '+Solar.bodies[b.parent].name):b.id==='sun'?'Étoile centrale':'Système solaire',kind:b.isMoon?'Lune':b.id==='sun'?'Étoile':'Planète',color:b.isMoon?'#b9c0ce':b.id==='sun'?'#f3c56e':'#83a8ff',run:()=>{ if(App.current!=='solar') App.go('solar'); showSolar(b); }}; }
  App.registerSearch(q=>{ if(!q) return SUGGEST.map(n=>Solar.list.find(b=>norm(b.name)===norm(n)||norm(b.short)===norm(n))).filter(Boolean).map(bodyResult); return []; });
  App.registerSearch(q=>q?Solar.search(q).map(bodyResult):[]);
  App.registerSearch(q=>q?monuments.filter(m=>{const n=norm(q);return norm(m.name).includes(n)||norm(m.country).includes(n)||(m.aliases||[]).some(a=>norm(a).includes(n));}).map(m=>({label:m.name,sub:m.country+' · '+fmtLat(m.lat)+' / '+fmtLon(m.lon),kind:kindLabel(m),color:m.kind==='peak'?'#e9eefb':m.kind==='trench'?'#2dd4bf':'#69dcb4',run:()=>{if(App.current!=='earth')App.go('earth');show(m);}})):[]);
  App.registerSearch(q=>q?Sky.search(q):[]);
  App.registerSearch(q=>q?Galaxy.search(q):[]);
  function openResults(){
    const q=sIn.value.trim(); sItems=App.search(q).slice(0,8); sSel=sItems.length?0:-1;
    sRes.innerHTML=(sItems.length?(q?'':'<div class="rhead">Suggestions</div>')+sItems.map((r,i)=>'<div class="res'+(i===0?' sel':'')+'" role="option" data-i="'+i+'"><span class="ic"><i style="background:'+r.color+'"></i></span><span><b>'+esc(r.label)+'</b><small>'+esc(r.sub)+'</small></span><span class="kind">'+esc(r.kind)+'</span></div>').join(''):'<div class="rempty">Aucun résultat pour « '+esc(q)+' »</div>');
    sRes.classList.add('open'); sIn.setAttribute('aria-expanded','true');
  }
  function closeResults(){ sRes.classList.remove('open'); sIn.setAttribute('aria-expanded','false'); }
  function moveSel(d){ if(!sItems.length) return; sSel=(sSel+d+sItems.length)%sItems.length; sRes.querySelectorAll('.res').forEach((el,i)=>el.classList.toggle('sel',i===sSel)); }
  function runSel(i){ const r=sItems[i===undefined?sSel:i]; if(!r) return; closeResults(); sIn.blur(); sIn.value=''; r.run(); }
  sIn.addEventListener('focus',openResults); sIn.addEventListener('input',openResults);
  sIn.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){ e.preventDefault(); moveSel(1); } else if(e.key==='ArrowUp'){ e.preventDefault(); moveSel(-1); }
    else if(e.key==='Enter'){ e.preventDefault(); if(sItems.length) runSel(); else toast('Introuvable'); }
    else if(e.key==='Escape'){ closeResults(); sIn.blur(); }
  });
  sRes.addEventListener('pointerdown',e=>{ e.preventDefault(); const r=e.target.closest('.res'); if(r) runSel(+r.dataset.i); });
  document.addEventListener('pointerdown',e=>{
    if(!$('searchbox').contains(e.target)) closeResults();
    if($('layersPop').classList.contains('open')&&!$('layersPop').contains(e.target)&&!$('layersBtn').contains(e.target)){ $('layersPop').classList.remove('open'); syncUI(); }
  });

  /* ----- Dock et boutons ----- */
  $('reset').onclick=resetView;
  $('zoomin').onclick=()=>{if(App.current==='solar')Solar.zoomBy(.78);else if(App.current==='sky')Sky.setFov(Sky.fov*.78);else if(App.current==='galaxy')Galaxy.zoomBy(.78);else targetDistance=clampDist(targetDistance*.78);lastInteraction=performance.now();};
  $('zoomout').onclick=()=>{if(App.current==='solar')Solar.zoomBy(1.28);else if(App.current==='sky')Sky.setFov(Sky.fov*1.28);else if(App.current==='galaxy')Galaxy.zoomBy(1.28);else targetDistance=clampDist(targetDistance*1.28);lastInteraction=performance.now();};
  $('labels').onclick=()=>{const k=({solar:'slabels',earth:'labels',sky:'skylabels',galaxy:'galaxylabels'})[App.current]||'labels';Layers.toggle(k);};
  $('orbitsBtn').onclick=()=>{if(App.current==='solar'){Layers.toggle('orbits');toast(Layers.state.orbits?'Orbites affichées':'Orbites masquées');}else if(App.current==='sky'){Layers.toggle('skyconstellations');toast(Sky.flags.constellations?'Traits du ciel affichés':'Traits du ciel masqués');}};
  $('scaleBtn').onclick=()=>{if(App.current!=='solar')return;Solar.setScaleMode(VIS.mode==='compact'?'extended':'compact');toast(VIS.mode==='extended'?'Échelle étendue':'Échelle compacte');};
  $('borders').onclick=()=>{ if(App.current!=='earth') return; Layers.toggle('borders'); toast(Layers.state.borders?'Frontières affichées':'Frontières masquées'); };
  $('night').onclick=()=>{
    if(App.current!=='earth') return;
    if(Settings.lighting==='realtime'){ toast('Soleil en temps réel : change l\'heure dans la barre du temps'); return; }
    nightView=!nightView; syncUI(); toast(nightView?'Vue nuit':'Vue jour');
  };
  $('brand').onclick=()=>{
    if(App.current==='solar'){Solar.reset(true);renderSolarPanel();setHash('solar');lastInteraction=performance.now();return;}
    if(App.current==='sky'){Sky.reset();renderSkyPanel();setHash('sky');return;}
    if(App.current==='galaxy'){Galaxy.reset();renderGalaxyPanel();setHash('galaxy');return;}
    if($('panel').classList.contains('open')&&!selected)$('panel').classList.remove('open');else if(selected)deselect();else renderEarthPanel();
  };

  /* ----- Calques du monde « Terre » ----- */
  const setKind=(test,v)=>{ markerMeshes.forEach(pin=>{ const m=pin.userData.monument; if(!test(m)) return; m._hidden=!v; m._model.visible=v; pin.visible=v; pin.userData.glow.visible=v; });
    if(!v&&selected&&test(selected)) deselect(); };
  Layers.add({id:'clouds',group:'Planète',label:'Nuages',desc:'Couverture nuageuse satellite',def:true,set:v=>{ cloudsMesh.visible=v; cloudsMesh2.visible=v; }});
  Layers.add({id:'atmosphere',group:'Planète',label:'Atmosphère',desc:'Halo bleu et lueurs du crépuscule',def:true,set:v=>{ atmoOuter.visible=v; atmoInner.visible=v; }});
  Layers.add({id:'nightlights',group:'Planète',label:'Lumières des villes',desc:'Visibles du côté nuit',def:true,set:v=>{ lightsMesh.visible=v; }});
  Layers.add({id:'borders',group:'Planète',label:'Frontières',desc:'Limites des pays',def:false,set:v=>{ bordersMesh.visible=v; }});
  Layers.add({id:'labels',group:'Repères',label:'Noms des lieux',desc:'Villes et repères géographiques sélectionnables',def:true,set:()=>{}});
  Layers.add({id:'moon',group:'Espace',label:'Lune',desc:'Orbite autour de la Terre',def:true,set:v=>{ moon.visible=v; }});
  Layers.add({id:'stars',group:'Espace',label:'Étoiles',desc:'Fond étoilé',def:true,set:v=>{ if(stars) stars.visible=v; }});
  Layers.add({id:'sunglow',group:'Espace',label:'Halo du Soleil',desc:'Lueur autour du Soleil',def:true,set:v=>{ sunSprite.visible=v; }});

  App.scenes.get('earth').update=(dt,now)=>{
    distance+=(targetDistance-distance)*0.12; camera.position.setZ(distance);
    if(Settings.autoRotate&&!selected&&now-lastInteraction>6000) globeGroup.rotation.y+=0.0008;
    cloudsMesh.rotation.y+=0.00022; cloudsMesh2.rotation.y+=0.00036;
    updateSun(dt); updateGlint(); updateMoon(dt,Clock.paused?0:0.025+Clock.speed*2.66e-6);
    markerMeshes.forEach(pin=>{   // zoom « héros » du monument sélectionné
      const m=pin.userData.monument, mdl=m._model, target=(m===selected)?2.3:1, cur=mdl.scale.x;
      if(Math.abs(target-cur)>0.002){ const ns=cur+(target-cur)*Math.min(1,dt*6); mdl.scale.setScalar(ns);
        pin.position.copy(pin.userData.up).multiplyScalar(pin.userData.R+pin.userData.hgt*ns+0.016); pin.userData.glow.position.copy(pin.position); }
    });
    if(selected){
      const pin=markerMeshes.find(p=>p.userData.monument===selected), sc=selected._model.scale.x;
      selectRing.position.copy(pin.userData.base); const s=(1+(reduceMotion?0:Math.sin(now/280)*0.12))*(1+(sc-1)*0.9); selectRing.scale.set(s,s,s);
      selected._model.rotateY(reduceMotion?0:dt*0.9);
    }
    updateLabels();
  };

  /* ----- Monde « Système solaire » : fiches, calques, hooks ----- */
  function renderSkyPanel(){showInfo({eyebrow:'ME3D · Ciel',title:'Atlas du ciel',sub:'Étoiles brillantes, figures et repères célestes',stats:[{label:'Étoiles nommées',value:String(skyStarDefs.length)},{label:'Figures reliées',value:String(Object.keys(constellationDefs).length)},{label:'Magnitude limite',value:Sky.limitMag.toFixed(1)+' mag'},{label:'Champ visuel',value:Math.round(Sky.fov)+'°'}],chips:['Grille équatoriale optionnelle','Bande galactique schématique · catalogue partiel'],actions:[{label:Sky.flags.constellations?'Masquer les figures':'Afficher les figures',primary:true,fn:()=>Layers.set('skyconstellations',!Sky.flags.constellations)},{label:'Ouvrir les calques',fn:()=>toggleLayersPop(true)},{label:'Limites des données',fn:openHelp}]});}
  function showSkyStar(d){Sky.setLimitMag(Math.max(Sky.limitMag,d.mag));Sky.focus(d);showInfo({eyebrow:'Étoile · '+d.kind,title:d.name,sub:'Repère céleste dans ME3D',stats:[{label:'Type',value:d.kind},{label:'Distance estimée',value:d.distance},{label:'Magnitude apparente',value:String(d.mag)},{label:'Ascension droite',value:d.ra.toFixed(3)+' h'},{label:'Déclinaison',value:(d.dec>=0?'+':'')+d.dec.toFixed(3)+'°'}],chips:['Étoiles repères : positions et distances indicatives, catalogue partiel'],actions:[{label:'Retour à la voûte',primary:true,fn:()=>{Sky.reset();renderSkyPanel();}},{label:isFavorite('sky',d.id)?'Retirer des favoris':'Ajouter aux favoris',fn:()=>toggleFavorite('sky',d.id,d.name)},{label:'Copier le lien',fn:()=>copyDeepLink('sky',d.id,d.name)}]});}
  function renderGalaxyPanel(){showInfo({eyebrow:'ME3D · Galaxie',title:'Voie lactée',sub:'Explorer le disque, le bulbe et le voisinage galactique',stats:[{label:'Étoiles procédurales',value:'8 200'},{label:'Repères nommés',value:String(galaxyItems.length)},{label:'Vue active',value:Galaxy.viewMode==='top'?'Dessus':Galaxy.viewMode==='edge'?'Profil':Galaxy.viewMode==='custom'?'Personnalisée':'Perspective'},{label:'Zoom visuel',value:Math.round(Galaxy.distance)+' unités'}],chips:['Poussières et halo séparés par calques','Distances et positions schématiques, non métriques'],actions:[{label:'Vue de dessus',fn:()=>{Galaxy.setView('top');renderGalaxyPanel();}},{label:'Vue de profil',fn:()=>{Galaxy.setView('edge');renderGalaxyPanel();}},{label:'Ouvrir les calques',primary:true,fn:()=>toggleLayersPop(true)},{label:'À propos des données',fn:openHelp}]});}
  function showGalaxyItem(d){Galaxy.focus(d);showInfo({eyebrow:d.category,title:d.name,sub:'Repère sélectionné dans la Voie lactée',stats:[{label:'Catégorie',value:d.category},{label:'Repère',value:d.id==='sagittarius-a'?'Centre galactique':d.id==='solar-neighborhood'?'Voisinage solaire':d.id.includes('arm')?'Structure spiralée':'Objet du voisinage galactique'},{label:'État de la vue',value:'Centrage progressif'}],chips:[d.description,'Localisations et distances compressées pour la navigation'],actions:[{label:'Vue d’ensemble',primary:true,fn:()=>{Galaxy.reset();renderGalaxyPanel();}},{label:'Ouvrir les calques',fn:()=>toggleLayersPop(true)},{label:isFavorite('galaxy',d.id)?'Retirer des favoris':'Ajouter aux favoris',fn:()=>toggleFavorite('galaxy',d.id,d.name)},{label:'Copier le lien',fn:()=>copyDeepLink('galaxy',d.id,d.name)}]});}
  function updateGalaxyLabels(){Galaxy.updateLabels();}

  const fmtDay=ms=>fmtDate(ms);
  function bodyComparisonValue(b,key){
    const f=b.facts||[], T=(jdOf(Clock.t)-2451545)/36525;
    if(key==='Type') return b.type|| (b.id==='moon'?'Satellite naturel':'Corps céleste');
    if(key==='Diamètre') return fmtN((b.R||0)*2,1)+' km';
    if(key==='Gravité') return b.id==='sun'?'—':b.id==='moon'?'1,62 m/s²':f[0]||'—';
    if(key==='Température') return b.id==='sun'?'≈ 5 772 K':b.id==='moon'?'≈ −23 °C':f[1]||'—';
    if(key==='Période orbitale') return b.id==='sun'?'—':b.id==='moon'?'27,32 jours':b.isMoon?fmtN(b.periodDays,3)+' jours':(f[2]||'—');
    if(key==='Rotation') return b.id==='sun'?'≈ 25 jours':b.id==='moon'?'synchrone':f[3]||'—';
    if(key==='Inclinaison axiale') return b.id==='sun'?'—':b.id==='moon'?'≈ 6,7°':f[4]||'—';
    if(key==='Distance orbitale moyenne'){
      if(b.id==='sun') return 'Centre du système';
      if(b.id==='moon') return '≈ 384 400 km de la Terre';
      if(b.isMoon) return fmtN(b.aKm)+' km de '+(Solar.bodies[b.parent]?.short||b.parent);
      const tab=(T>=-2&&T<=0.5?JPL1:JPL2)[b.id];return tab?fmtN(tab[0]+(tab[6]||0)*T,3)+' UA du Soleil':'—';
    }
    if(key==='Parent') return b.id==='sun'?'—':b.isMoon?(b.id==='moon'?'Terre':Solar.bodies[b.parent]?.name||b.parent):'Soleil';
    return '—';
  }
  function openCompareModal(primaryId){
    const bodies=Solar.list.filter(b=>b.id!=='sun'||primaryId==='sun');
    const optionList=Solar.list.map(b=>'<option value="'+b.id+'">'+esc(b.name)+'</option>').join('');
    const second=primaryId==='earth'?'mars':primaryId==='sun'?'earth':'earth';
    openModal('<h2>Comparer deux mondes</h2><p class="lead">Compare les caractéristiques de deux corps célestes. Les valeurs sont celles disponibles dans ME3D ; les données orbitales de nombreuses lunes restent simplifiées.</p>'+
      '<div class="compare-grid"><div><label for="compareA" class="kicker">Corps A</label><select class="compare-select" id="compareA">'+optionList+'</select></div><div><label for="compareB" class="kicker">Corps B</label><select class="compare-select" id="compareB">'+optionList+'</select></div></div><div id="compareVisual"></div><div id="compareTable"></div><div class="pactions"><button class="pbtn primary" id="compareFocusA">Centrer A</button><button class="pbtn" id="compareFocusB">Centrer B</button></div><p class="celestial-note">Note : les diamètres et paramètres affichés sont des valeurs de référence, et la distance orbitale d’une planète est son demi-grand axe approximatif. Les deux tailles à l’écran ne sont pas à l’échelle.</p>');
    const a=$('compareA'),b=$('compareB');a.value=Solar.bodies[primaryId]?primaryId:'earth';b.value=Solar.bodies[second]?second:'mars';
    const render=()=>{const A=Solar.bodies[a.value],B=Solar.bodies[b.value];const rows=['Type','Diamètre','Gravité','Température','Période orbitale','Rotation','Inclinaison axiale','Distance orbitale moyenne','Parent'];const maxR=Math.max(A.R||1,B.R||1);const sphere=(x)=>{const col=(x.color||0xe4c47a).toString(16).padStart(6,'0');const size=Math.max(22,Math.sqrt((x.R||1)/maxR)*100);return '<div class="compare-world"><div class="compare-sphere" style="width:'+size+'px;height:'+size+'px;background:#'+col+';box-shadow:0 0 25px #'+col+'44,inset -9px -8px 18px #0008"></div><strong>'+esc(x.name)+'</strong><small>'+esc(fmtN((x.R||0)*2,1))+' km de diamètre</small></div>';};$('compareVisual').innerHTML='<div class="compare-worlds">'+sphere(A)+sphere(B)+'</div><p class="celestial-note">Taille illustrative normalisée entre ces deux objets ; ce visuel n’est pas une échelle commune entre toutes les sessions.</p>';$('compareTable').innerHTML='<table class="compare-table"><thead><tr><th>Propriété</th><th>'+esc(A.name)+'</th><th>'+esc(B.name)+'</th></tr></thead><tbody>'+rows.map(k=>'<tr><td>'+esc(k)+'</td><td>'+esc(bodyComparisonValue(A,k))+'</td><td>'+esc(bodyComparisonValue(B,k))+'</td></tr>').join('')+'</tbody></table>';};
    a.addEventListener('change',render);b.addEventListener('change',render);render();
    $('compareFocusA').onclick=()=>{const id=a.value;closeModal();App.go('solar');showSolar(Solar.bodies[id]);};
    $('compareFocusB').onclick=()=>{const id=b.value;closeModal();App.go('solar');showSolar(Solar.bodies[id]);};
  }
  function openMoonSystem(parentId){
    const moons=Solar.list.filter(b=>b.isMoon&&(b.parent===parentId||(b.id==='moon'&&parentId==='earth')));
    const parent=Solar.bodies[parentId];
    openModal('<h2>Explorer les lunes de '+esc(parent?parent.name:parentId)+'</h2><p class="lead">Sélectionne un satellite pour le centrer et ouvrir sa fiche. Les orbites des satellites secondaires sont schématiques dans cette version.</p>'+
      (moons.length?moons.map(m=>'<div class="card"><h5>'+esc(m.name)+'</h5><p>Diamètre moyen : '+esc(fmtN(m.R*2,1))+' km'+(m.periodDays?' · période : '+esc(fmtN(m.periodDays,3))+' jours':'')+'</p><button class="pbtn primary" data-moon-target="'+m.id+'">Explorer ce satellite</button></div>').join(''):'<p class="lead">Aucune lune détaillée dans ce système pour le moment.</p>'));
    $('mbody').querySelectorAll('[data-moon-target]').forEach(btn=>btn.onclick=()=>{const b=Solar.bodies[btn.dataset.moonTarget];closeModal();if(b)showSolar(b);});
  }
  function renderSolarPanel(){
    showInfo({eyebrow:'ME3D · Vue générale',title:'Système solaire',sub:'Exploration 3D des planètes et des principales lunes',
      stats:[{label:'Planètes',value:'8'},{label:'Satellites modélisés',value:'21 lunes'},{label:'Étendue planétaire',value:'≈ 30 UA'},{label:'Lumière Soleil–Terre',value:'≈ 8 min 19 s'}],
      chips:['Deux échelles visuelles : compacte / étendue','Positions planétaires : éléments orbitaux JPL'],
      actions:[{label:'Afficher les orbites',primary:true,fn:()=>Layers.set('orbits',!Layers.state.orbits)},{label:'Comparer des mondes',fn:()=>openCompareModal('earth')},{label:'Calques',fn:()=>toggleLayersPop(true)}]});
    $('panel').classList.remove('open');
  }
  function showSolar(b){
    closeTransient(); closeModal(); Solar.focus(b.id);
    const info=Solar.info(b,Clock.t);
    info.actions=[{label:'Centrer',primary:true,fn:()=>Solar.focus(b.id)},{label:isFavorite('solar',b.id)?'Retirer des favoris':'Ajouter aux favoris',fn:()=>toggleFavorite('solar',b.id,b.name)},{label:'Copier le lien',fn:()=>copyDeepLink('solar',b.id,b.name)}];
    const parentId=b.id==='moon'?'earth':b.parent; if(b.isMoon&&parentId&&Solar.bodies[parentId]) info.actions.push({label:'Voir '+Solar.bodies[parentId].short,fn:()=>showSolar(Solar.bodies[parentId])});
    const childMoons=Solar.list.filter(m=>m.isMoon&&(m.parent===b.id||(m.id==='moon'&&b.id==='earth')));
    if(childMoons.length) info.actions.push({label:'Explorer '+childMoons.length+' lune'+(childMoons.length>1?'s':''),fn:()=>openMoonSystem(b.id)});
    info.actions.push({label:'Comparer',fn:()=>openCompareModal(b.id)});
    info.actions.push({label:Solar.flags.orbits?'Masquer les orbites':'Afficher les orbites',fn:()=>Layers.set('orbits',!Layers.state.orbits)});
    info.actions.push({label:'Vue d’ensemble',fn:()=>{ Solar.reset(); renderSolarPanel(); setHash('solar'); }});
    showInfo(info); setHash('solar/'+b.id);
  }
  function refreshSolarInfo(){
    if(!Solar.selected) return; const info=Solar.info(Solar.selected,Clock.t);
    const sb=$('details').querySelectorAll('.stat b'); info.stats.forEach((s,i)=>{ if(sb[i]) sb[i].textContent=s.value; });
    const ch=$('details').querySelectorAll('.chip'); info.chips.forEach((c,i)=>{ if(ch[i]) ch[i].textContent=c; });
  }
  Layers.add({scene:'solar',id:'orbits',group:'Système solaire',label:'Orbites',desc:'Trajectoires des planètes et de la Lune',def:true,set:v=>Solar.setFlag('orbits',v)});
  Layers.add({scene:'solar',id:'slabels',group:'Système solaire',label:'Noms des corps',desc:'Étiquettes sans chevauchement',def:true,set:v=>{ Solar.flags.labels=v; }});
  Layers.add({scene:'solar',id:'belt',group:'Système solaire',label:'Ceinture d’astéroïdes',desc:'Répartition illustrative entre Mars et Jupiter',def:true,set:v=>Solar.setFlag('belt',v)});
  Layers.add({scene:'solar',id:'smoon',group:'Satellites',label:'Lunes principales (21)',desc:'Lune terrestre calculée ; autres satellites à orbites simplifiées',def:true,set:v=>Solar.setFlag('moons',v)});
  Layers.add({scene:'solar',id:'sstars',group:'Espace',label:'Étoiles',desc:'Fond étoilé',def:true,set:v=>{ if(App.current==='solar'&&stars) stars.visible=v; }});
  Layers.add({scene:'sky',id:'skyconstellations',group:'Ciel',label:'Constellations et figures',desc:'Tracés colorés de figures célestes simplifiées',def:true,set:v=>{Sky.flags.constellations=v;skyLines.visible=v;}});
  Layers.add({scene:'sky',id:'skylabels',group:'Ciel',label:'Noms des étoiles',desc:'Étiquettes des étoiles nommées',def:true,set:v=>{Sky.flags.labels=v;}});
  Layers.add({scene:'sky',id:'skygrid',group:'Ciel',label:'Grille équatoriale',desc:'Repères d’ascension droite et de déclinaison',def:false,set:v=>{Sky.flags.grid=v;skyGrid.visible=v;}});
  Layers.add({scene:'sky',id:'skymilkyway',group:'Ciel',label:'Bande de la Voie lactée',desc:'Champ diffus schématique dans la voûte céleste',def:true,set:v=>{Sky.flags.milkyWay=v;skyMilkyWay.visible=v;}});
  Layers.add({scene:'galaxy',id:'galaxyarms',group:'Galaxie',label:'Bras spiraux',desc:'Structure stellaire procédurale',def:true,set:v=>{Galaxy.flags.arms=v;galaxyArmPoints.visible=v;}});
  Layers.add({scene:'galaxy',id:'galaxydust',group:'Galaxie',label:'Voies de poussière',desc:'Couche sombre schématique le long des bras',def:true,set:v=>{Galaxy.flags.dust=v;galaxyDustPoints.visible=v;}});
  Layers.add({scene:'galaxy',id:'galaxyhalo',group:'Galaxie',label:'Halo stellaire',desc:'Étoiles extérieures diffusées autour du disque',def:true,set:v=>{Galaxy.flags.halo=v;galaxyHaloPoints.visible=v;}});
  Layers.add({scene:'galaxy',id:'galaxycore',group:'Galaxie',label:'Bulbe central',desc:'Lueur et repère lumineux du centre galactique',def:true,set:v=>{Galaxy.flags.core=v;galaxyCore.visible=v;galaxyBulgeRing.visible=v;}});
  Layers.add({scene:'galaxy',id:'galaxylabels',group:'Galaxie',label:'Noms des repères',desc:'Régions, amas, nébuleuses et galaxies voisines',def:true,set:v=>{Galaxy.flags.labels=v;}});
  Layers.add({scene:'galaxy',id:'galaxyobjects',group:'Galaxie',label:'Objets sélectionnables',desc:'Amas, régions locales et galaxies voisines',def:true,set:v=>{Galaxy.flags.markers=v;galaxyItems.forEach(d=>d.object.visible=v);}});


  /* ----- Recherche indicative de rapprochements planétaires ----- */
  function openSolarEvents(){
    const ids=['mercury','venus','mars','jupiter','saturn','uranus','neptune'];
    const days=365, vectors=[];
    for(let day=0;day<=days;day++){
      const ms=Clock.t+day*86400000,T=(jdOf(ms)-2451545)/36525,earth=helioEcl('earth',T),frame={ms};
      ids.forEach(id=>{const p=helioEcl(id,T);frame[id]=p.map((v,i)=>v-earth[i]);});vectors.push(frame);
    }
    const angle=(a,b)=>{const dot=a[0]*b[0]+a[1]*b[1]+a[2]*b[2],na=Math.hypot(...a),nb=Math.hypot(...b);return Math.acos(Math.max(-1,Math.min(1,dot/(na*nb))))/DEG;};
    const events=[];
    for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
      const first=ids[i],second=ids[j],angles=vectors.map(v=>angle(v[first],v[second]));
      for(let d=1;d<days;d++){
        if(angles[d]<=angles[d-1]&&angles[d]<=angles[d+1]&&angles[d]<4.0){
          events.push({time:vectors[d].ms,first,second,separation:angles[d]});
        }
      }
    }
    events.sort((a,b)=>a.time-b.time);
    const visible=events.slice(0,12),bodyName=id=>Solar.bodies[id]?.name||id;
    openModal('<h2>Rapprochements planétaires à venir</h2><p class="lead">ME3D balaie les 365 prochains jours à partir des éléments orbitaux embarqués et repère les minima de séparation apparente inférieurs à 4°. Ce sont des estimations géométriques, pas une garantie de visibilité depuis un lieu donné.</p>'+(
      visible.length?visible.map(ev=>'<div class="card"><h5>'+esc(bodyName(ev.first))+' · '+esc(bodyName(ev.second))+'</h5><p>'+esc(fmtDate(ev.time))+' UTC · séparation apparente calculée ≈ '+ev.separation.toFixed(2).replace('.',',')+'°</p><button class="pbtn primary" data-event-time="'+ev.time+'" data-event-body="'+ev.first+'">Explorer cette configuration</button></div>').join(''):'<p class="lead">Aucun rapprochement inférieur au seuil retenu n’a été détecté sur cette période. Essaie de déplacer la date de départ.</p>')+'<p class="celestial-note">Précision : pas d’éphéméride topocentrique, d’altitude au-dessus de l’horizon ou de calcul de l’éclat du ciel. Pour planifier une observation réelle, vérifie une éphéméride astronomique spécialisée.</p>');
  }
  $('mbody').addEventListener('click',e=>{
    const b=e.target.closest('[data-event-time]');if(!b)return;
    const stamp=Number(b.dataset.eventTime),target=Solar.bodies[b.dataset.eventBody];
    if(!Number.isFinite(stamp)||!target)return;
    closeModal();if(App.current!=='solar')App.go('solar');Clock.t=stamp;Clock.paused=true;Clock.si=0;Clock.speed=1;updateTimeUI();Solar.update(0,Clock.t);showSolar(target);toast('Date de rapprochement chargée');
  });

  /* ----- Parcours guidés et favoris ----- */
  const TOUR_CATALOG={
    solar:[{title:'Du Soleil aux mondes glacés',description:'Voyage de notre étoile jusqu’aux frontières planétaires. Les tailles et espacements restent visuellement compressés.',steps:[
      ['sun','Le Soleil','Notre étoile fournit l’essentiel de l’énergie du système.'],['mercury','Mercure','Une petite planète rocheuse très proche du Soleil.'],['venus','Vénus','Un monde couvert d’une atmosphère très dense.'],['earth','La Terre','Notre planète, avec son unique grand satellite naturel.'],['moon','La Lune','La dynamique lunaire est traitée plus précisément que celle des autres satellites.'],['mars','Mars','Un monde rocheux qui conserve les traces d’anciens environnements aqueux.'],['jupiter','Jupiter','La plus grande planète du système ; ses lunes offrent des mondes très différents.'],['europa','Europe','Une lune glacée présentant un intérêt majeur pour la recherche d’océans internes.'],['saturn','Saturne','Une géante gazeuse reconnaissable à son vaste système d’anneaux.'],['titan','Titan','Une lune dotée d’une atmosphère dense et de lacs d’hydrocarbures.'],['uranus','Uranus','Une géante glacée à l’axe de rotation fortement incliné.'],['neptune','Neptune','La dernière des huit planètes, dans la région extérieure du système.']] }],
    earth:[{title:'Tour du monde en 8 repères',description:'Un parcours géographique à travers plusieurs régions de la Terre. Les lieux sont des repères à coordonnées arrondies.',steps:[
      ['Paris','Paris','Départ en Europe occidentale.'],['Le Caire','Le Caire','Direction le nord-est de l’Afrique.'],['Nairobi','Nairobi','Un repère de l’Afrique de l’Est.'],['New Delhi','New Delhi','Cap sur le sous-continent indien.'],['Pékin','Pékin','Un grand centre urbain d’Asie orientale.'],['Tokyo','Tokyo','Archipel du Japon, à l’est du continent asiatique.'],['Sydney','Sydney','L’Australie, dans l’hémisphère sud.'],['Rio de Janeiro','Rio de Janeiro','Retour vers l’Amérique du Sud.']] }],
    sky:[{title:'Les étoiles repères',description:'Trois étoiles brillantes et connues pour commencer à lire la voûte céleste. Le catalogue de ME3D reste pédagogique et partiel.',steps:[
      ['sirius','Sirius','L’étoile la plus brillante du ciel nocturne terrestre en lumière visible.'],['polaris','Polaris','Une étoile proche de la direction du pôle nord céleste.'],['vega','Véga','Une étoile brillante de la constellation de la Lyre.'],['betelgeuse','Bételgeuse','Une supergéante rouge de la constellation d’Orion.'],['arcturus','Arcturus','Une géante orange parmi les étoiles les plus brillantes du ciel.']] }],
    galaxy:[{title:'Voyage dans la Voie lactée',description:'Parcours de plusieurs repères de notre galaxie et de son voisinage. Les positions de cette scène sont schématiques, non métriques.',steps:[
      ['sagittarius-a','Sagittarius A*','Le centre galactique héberge un trou noir supermassif.'],['solar-neighborhood','Voisinage solaire','Le Système solaire se situe dans le disque galactique, dans la région du bras d’Orion.'],['orion-arm','Bras d’Orion','Une structure spirale locale, représentée ici de manière conceptuelle.'],['perseus-arm','Bras de Persée','Un repère des structures spirales externes.'],['pleiades','Amas des Pléiades','Un amas ouvert visible dans le ciel terrestre.'],['andromeda','Galaxie d’Andromède','Une grande galaxie voisine, placée de façon illustrative dans cette scène.']] }]
  };
  let activeTour=null;
  const favs=()=>Array.isArray(Store.data.favorites)?Store.data.favorites:[];
  function isFavorite(scene,id){return favs().some(f=>f.scene===scene&&f.id===id);}
  function toggleFavorite(scene,id,label){
    const list=favs().slice(),idx=list.findIndex(f=>f.scene===scene&&f.id===id);
    if(idx>=0){list.splice(idx,1);toast(label+' retiré des favoris');}
    else{list.push({scene,id,label});toast(label+' ajouté aux favoris');}
    Store.data.favorites=list;Store.save();
  }
  function openFavorites(){
    const list=favs();
    openModal('<h2>Mes favoris</h2><p class="lead">Retrouve tes corps célestes et lieux enregistrés sur cet appareil.</p>'+
      (list.length?list.map((f,i)=>'<div class="card"><h5>'+esc(f.label)+'</h5><p>'+esc(({earth:'Terre',solar:'Système solaire',sky:'Ciel',galaxy:'Galaxie'})[f.scene]||f.scene)+'</p><div class="pactions"><button class="pbtn primary" data-fav-open="'+i+'">Explorer</button><button class="pbtn" data-fav-remove="'+i+'">Retirer</button></div></div>').join(''):'<p class="lead">Aucun favori pour le moment. Ouvre une fiche puis utilise « Ajouter aux favoris ».</p>'));
  }
  function openFavorite(f){
    if(!f)return; closeModal();
    if(App.current!==f.scene)App.go(f.scene);
    if(f.scene==='solar'){const b=Solar.bodies[f.id];if(b)showSolar(b);}
    else if(f.scene==='earth'){const m=monuments.find(x=>x.name===f.id);if(m)show(m);}
    else if(f.scene==='sky'){const d=skyStarDefs.find(x=>x.id===f.id);if(d)showSkyStar(d);}
    else if(f.scene==='galaxy'){const d=galaxyItems.find(x=>x.id===f.id);if(d)showGalaxyItem(d);}
  }
  function openTourPicker(){
    const scenes=[['solar','Système solaire'],['earth','Terre'],['sky','Ciel'],['galaxy','Galaxie']];
    openModal('<h2>Exploration guidée</h2><p class="lead">Choisis un parcours. ME3D centre automatiquement la vue sur chaque étape et affiche une courte explication.</p>'+scenes.map(([id,label])=>{const t=TOUR_CATALOG[id][0];return '<div class="card"><h5>'+esc(label)+' · '+esc(t.title)+'</h5><p>'+esc(t.description)+'</p><button class="pbtn primary" data-tour-start="'+id+'" data-tour-index="0">Commencer le parcours</button><small class="st-mini">'+t.steps.length+' étapes</small></div>';}).join(''));
  }
  function startTour(scene,index){
    const tour=(TOUR_CATALOG[scene]||[])[index||0];if(!tour)return;
    closeModal();activeTour={scene,tour,index:0};if(App.current!==scene)App.go(scene);showTourStep(0);
  }
  function showTourStep(index){
    if(!activeTour)return;const {scene,tour}=activeTour;index=Math.max(0,Math.min(tour.steps.length-1,index));activeTour.index=index;
    const [id,title,description]=tour.steps[index];
    if(App.current!==scene)App.go(scene);
    if(scene==='solar'){const b=Solar.bodies[id];if(b)showSolar(b);}
    else if(scene==='earth'){const m=monuments.find(x=>x.name===id);if(m)show(m);}
    else if(scene==='sky'){const d=skyStarDefs.find(x=>x.id===id);if(d)showSkyStar(d);}
    else if(scene==='galaxy'){const d=galaxyItems.find(x=>x.id===id);if(d)showGalaxyItem(d);}
    $('tourEyebrow').textContent=({earth:'TERRE',solar:'SYSTÈME SOLAIRE',sky:'ATLAS CÉLESTE',galaxy:'VOIE LACTÉE'})[scene]+' · PARCOURS GUIDÉ';
    $('tourTitle').textContent=title;$('tourDescription').textContent=description;
    $('tourStepText').textContent='Étape '+(index+1)+' / '+tour.steps.length;$('tourProgressFill').style.width=((index+1)/tour.steps.length*100)+'%';
    $('tourPrev').disabled=index===0;$('tourNext').textContent=index===tour.steps.length-1?'Terminer':'Suivant';$('tourCard').hidden=false;
  }
  $('tourClose').onclick=()=>{activeTour=null;$('tourCard').hidden=true;};
  $('tourPrev').onclick=()=>{if(activeTour)showTourStep(activeTour.index-1);};
  $('tourNext').onclick=()=>{if(!activeTour)return;if(activeTour.index>=activeTour.tour.steps.length-1){activeTour=null;$('tourCard').hidden=true;toast('Parcours terminé');}else showTourStep(activeTour.index+1);};
  $('mbody').addEventListener('click',e=>{
    const start=e.target.closest('[data-tour-start]');if(start){startTour(start.dataset.tourStart,Number(start.dataset.tourIndex||0));return;}
    const open=e.target.closest('[data-fav-open]');if(open){openFavorite(favs()[Number(open.dataset.favOpen)]);return;}
    const remove=e.target.closest('[data-fav-remove]');if(remove){const f=favs()[Number(remove.dataset.favRemove)];if(f){toggleFavorite(f.scene,f.id,f.label);openFavorites();}return;}
  });
  $('mbody').addEventListener('click',e=>{if(e.target.closest('[data-add-favorite]')){const b=e.target.closest('[data-add-favorite]');toggleFavorite(b.dataset.scene,b.dataset.id,b.dataset.label);}});
  $('helpBtn').title='Aide et crédits (?)';
  $('settingsBtn').title='Réglages (S)';

  /* ----- Barre d’outils contextuelle ME3D ----- */
  function renderSceneTools(){
    const root=$('sceneTools');if(!root)return;
    const themes={earth:['#69dcb4','#77b9df'],solar:['#82a7ff','#ad8fff'],sky:['#73dcff','#a2b7ff'],galaxy:['#c5a0ff','#f29bda']};
    const colors=themes[App.current]||themes.solar;
    document.documentElement.style.setProperty('--accent',colors[0]);document.documentElement.style.setProperty('--accent2',colors[1]);document.documentElement.style.setProperty('--scene-glow',colors[0]);
    root.dataset.scene=App.current;
    const btn=(id,label,pressed=false,extra='')=>'<button type="button" class="st-btn'+(pressed?' active':'')+(extra==='primary'?' primary':'')+'" data-tool="'+id+'" aria-pressed="'+(pressed?'true':'false')+'" '+(extra&&extra!=='primary'?extra:'')+'>'+label+'</button>';
    const divider='<span class="st-divider" aria-hidden="true"></span>';
    if(App.current==='sky'){
      root.innerHTML='<span class="st-kicker">ME3D · Atlas céleste</span>'+btn('sky-constellations','Figures',!!Sky.flags.constellations)+btn('sky-grid','Grille équatoriale',!!Sky.flags.grid)+btn('sky-milkyway','Voie lactée',!!Sky.flags.milkyWay)+divider+'<label class="st-range" for="skyMagnitude"><span>Magnitude limite</span><input id="skyMagnitude" data-tool-range="sky-magnitude" type="range" min="-1.5" max="4" step="0.5" value="'+Sky.limitMag+'" aria-label="Magnitude limite des étoiles nommées"><b>'+Sky.limitMag.toFixed(1)+' mag</b></label>'+btn('sky-reset','Réinitialiser la vue')+btn('scene-tours','Parcours')+btn('scene-favorites','Favoris');
    }else if(App.current==='galaxy'){
      root.innerHTML='<span class="st-kicker">ME3D · Cartographie galactique</span><span class="st-mini">Vue</span>'+btn('galaxy-view-top','Dessus',Galaxy.viewMode==='top')+btn('galaxy-view-perspective','Perspective',Galaxy.viewMode==='perspective')+btn('galaxy-view-edge','Profil',Galaxy.viewMode==='edge')+divider+btn('galaxy-arms','Bras',!!Galaxy.flags.arms)+btn('galaxy-dust','Poussières',!!Galaxy.flags.dust)+btn('galaxy-halo','Halo',!!Galaxy.flags.halo)+btn('galaxy-core','Bulbe',!!Galaxy.flags.core)+btn('galaxy-labels','Noms',!!Galaxy.flags.labels)+btn('galaxy-objects','Repères',!!Galaxy.flags.markers)+btn('scene-tours','Parcours')+btn('scene-favorites','Favoris');
    }else if(App.current==='solar'){
      root.innerHTML='<span class="st-kicker">ME3D · Système solaire</span><span class="st-mini">Vue orbitale · horloge simulée</span>'+btn('solar-compare','Comparer deux mondes',false,'primary')+btn('solar-events','Événements')+btn('solar-scale','Échelle '+(VIS.mode==='extended'?'étendue':'compacte'),VIS.mode==='extended')+btn('scene-layers','Calques')+btn('scene-tours','Parcours')+btn('scene-favorites','Favoris');
    }else{
      root.innerHTML='<span class="st-kicker">ME3D · Surface planétaire</span><span class="st-mini">Globe 3D · relief, atmosphère et nuages</span>'+btn('earth-layers','Calques')+btn('earth-moon','Lune',!!Layers.state.moon)+btn('earth-night','Jour / nuit',nightView)+btn('scene-tours','Parcours')+btn('scene-favorites','Favoris');
    }
  }
  $('sceneTools').addEventListener('click',e=>{
    const b=e.target.closest('[data-tool]');if(!b)return;const a=b.dataset.tool;
    if(a==='sky-constellations')Layers.toggle('skyconstellations');
    else if(a==='sky-grid')Layers.toggle('skygrid');
    else if(a==='sky-milkyway')Layers.toggle('skymilkyway');
    else if(a==='sky-reset'){Sky.reset();renderSkyPanel();}
    else if(a==='galaxy-view-top'||a==='galaxy-view-perspective'||a==='galaxy-view-edge'){Galaxy.setView(a.endsWith('top')?'top':a.endsWith('edge')?'edge':'perspective');renderGalaxyPanel();}
    else if(a==='galaxy-arms')Layers.toggle('galaxyarms');
    else if(a==='galaxy-dust')Layers.toggle('galaxydust');
    else if(a==='galaxy-halo')Layers.toggle('galaxyhalo');
    else if(a==='galaxy-core')Layers.toggle('galaxycore');
    else if(a==='galaxy-labels')Layers.toggle('galaxylabels');
    else if(a==='galaxy-objects')Layers.toggle('galaxyobjects');
    else if(a==='solar-compare')openCompareModal('earth');
    else if(a==='solar-events')openSolarEvents();
    else if(a==='solar-scale')$('scaleBtn').click();
    else if(a==='scene-layers'||a==='earth-layers')toggleLayersPop(true);
    else if(a==='earth-moon')Layers.toggle('moon');
    else if(a==='earth-night')$('night').click();
    else if(a==='scene-tours')openTourPicker();
    else if(a==='scene-favorites')openFavorites();
    syncUI();
  });
  $('sceneTools').addEventListener('input',e=>{if(e.target.matches('[data-tool-range="sky-magnitude"]')){Sky.setLimitMag(e.target.value);const v=e.target.parentElement.querySelector('b');if(v)v.textContent=Number(e.target.value).toFixed(1)+' mag';}});

  function setEarthVisible(v){
    tiltGroup.visible=v; atmoOuter.visible=v&&!!Layers.state.atmosphere; atmoInner.visible=v&&!!Layers.state.atmosphere;
    moon.visible=v&&!!Layers.state.moon; glintSprite.visible=v; sunSprite.visible=v&&!!Layers.state.sunglow; selectRing.visible=v&&!!selected;
    labelsLayer.style.display=v?'block':'none'; sun.intensity=v?1.6:0; hemi.intensity=v?0.18:0;
    if(stars) stars.visible=v?!!Layers.state.stars:!!Layers.state.sstars;
  }
  const earthScene=App.scenes.get('earth'), solarScene=App.scenes.get('solar'), skyScene=App.scenes.get('sky'), galaxyScene=App.scenes.get('galaxy');
  function restoreRealtimeClock(){if(Clock.auto&&Clock.si===4){Clock.si=0;Clock.speed=1;Clock.auto=false;updateTimeUI();}}
  earthScene.enter=()=>{ setEarthVisible(true); camera.near=.1;camera.far=200;camera.fov=48;camera.position.set(0,0,distance);camera.lookAt(0,0,0);camera.updateProjectionMatrix(); $('scalechip').querySelector('small').textContent='Altitude';$('timebar').style.display='';$('scalechip').style.display='';
    restoreRealtimeClock(); $('panel').classList.remove('open'); setHash(selected?'earth/'+encodeURIComponent(selected.name):'earth'); };
  earthScene.exit=()=>{ setEarthVisible(false); };
  solarScene.enter=()=>{ if(Clock.speed===1&&!Clock.paused){ Clock.si=4; Clock.speed=Clock.speeds[4]; Clock.auto=true; updateTimeUI(); toast('Vitesse : 1 jour / s'); }
    skyGroup.visible=false;galaxyGroup.visible=false;ambient.intensity=0.10;Solar.enter();if(stars)stars.visible=!!Layers.state.sstars;$('scalechip').querySelector('small').textContent='Cible';$('timebar').style.display='';$('scalechip').style.display='';renderSolarPanel();setHash('solar'); };
  solarScene.exit=()=>{ Solar.exit(); };
  solarScene.update=(dt)=>{ Solar.update(dt,Clock.t); };
  skyScene.enter=()=>{Solar.group.visible=false;galaxyGroup.visible=false;skyGroup.visible=true;setEarthVisible(false);if(stars)stars.visible=false;Solar.list.forEach(b=>b.el.style.display='none');skyStarDefs.forEach(d=>d.labelEl.style.display='none');galaxyItems.forEach(d=>d.labelEl.style.display='none');solarLabels.style.display='block';ambient.intensity=.22;sun.intensity=0;hemi.intensity=0;Sky.reset();skyLines.visible=!!Layers.state.skyconstellations;skyGrid.visible=!!Layers.state.skygrid;skyMilkyWay.visible=!!Layers.state.skymilkyway;$('scalechip').querySelector('small').textContent='Champ visuel';$('timebar').style.display='none';$('scalechip').style.display='';restoreRealtimeClock();renderSkyPanel();setHash('sky');};
  skyScene.exit=()=>{skyGroup.visible=false;skyStarDefs.forEach(d=>d.labelEl.style.display='none');skyLines.visible=!!Sky.flags.constellations;};
  skyScene.update=()=>{Sky.update();};
  galaxyScene.enter=()=>{Solar.group.visible=false;skyGroup.visible=false;galaxyGroup.visible=true;setEarthVisible(false);if(stars)stars.visible=false;Solar.list.forEach(b=>b.el.style.display='none');skyStarDefs.forEach(d=>d.labelEl.style.display='none');galaxyItems.forEach(d=>d.labelEl.style.display='none');solarLabels.style.display='block';ambient.intensity=.18;sun.intensity=0;hemi.intensity=0;Galaxy.reset();galaxyArmPoints.visible=!!Layers.state.galaxyarms;galaxyDustPoints.visible=!!Layers.state.galaxydust;galaxyHaloPoints.visible=!!Layers.state.galaxyhalo;galaxyCore.visible=!!Layers.state.galaxycore;galaxyBulgeRing.visible=!!Layers.state.galaxycore;galaxyItems.forEach(d=>d.object.visible=!!Layers.state.galaxyobjects);$('scalechip').querySelector('small').textContent='Échelle visuelle';$('timebar').style.display='none';$('scalechip').style.display='';restoreRealtimeClock();renderGalaxyPanel();setHash('galaxy');};
  galaxyScene.exit=()=>{galaxyGroup.visible=false;galaxyItems.forEach(d=>d.labelEl.style.display='none');};
  galaxyScene.update=dt=>Galaxy.update(dt);
  setEarthVisible(false); Solar.group.visible=false; solarScene.enter(); renderTabs(); syncUI(); renderSceneTools(); $('panel').classList.remove('open');

  /* ----- Raccourcis clavier ----- */
  addEventListener('keydown',e=>{
    const typing=e.target&&e.target.tagName==='INPUT'&&e.target.type!=='checkbox';
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); closeModal(); sIn.focus(); sIn.select(); return; }
    if(typing) return;
    if(e.key==='Escape'){ if($('modal').classList.contains('open')) closeModal(); else if($('layersPop').classList.contains('open')) toggleLayersPop(false); else if(selected) deselect(); else $('panel').classList.remove('open'); return; }
    if($('modal').classList.contains('open')||e.altKey||e.ctrlKey||e.metaKey) return;
    const k=e.key.toLowerCase();
    if(k==='r') resetView(); else if(k==='l') $('labels').click(); else if(k==='o') $('orbitsBtn').click(); else if(k==='e') $('scaleBtn').click();
    else if(k==='b') $('borders').click(); else if(k==='n') $('night').click();
    else if(k==='c') toggleLayersPop(); else if(k==='s') openSettings(); else if(k==='g') openTourPicker(); else if(k==='v') openFavorites(); else if(k==='?'||k==='h') openHelp(); else if(k==='f') $('fsBtn').click();
    else if(k==='+'||k==='=') $('zoomin').click(); else if(k==='-'||k==='_') $('zoomout').click();
    else if(e.key===' '){ e.preventDefault(); $('tplay').click(); }
    else if(e.key==='/'){ e.preventDefault(); sIn.focus(); }
  });

  /* ----- Liens directs : #earth/Tour%20Eiffel ----- */
  function route(){
    let h;
    try { h=decodeURIComponent((location.hash||'').slice(1)); } catch(_) { h=(location.hash||'').slice(1); }
    if(!h) return;
    const parts=h.split('/'), sceneId=App.scenes.has(parts[0])?parts[0]:'solar';
    const name=norm(parts.length>1?parts.slice(1).join('/'):parts[0]);
    if(sceneId==='solar'){
      if(App.current!=='solar') App.go('solar');
      const b=Solar.bodies[name]||Solar.list.find(x=>norm(x.short)===name||norm(x.name)===name);
      if(b) showSolar(b);
      else if(parts.length===1){ Solar.reset(); renderSolarPanel(); $('panel').classList.remove('open'); }
      return;
    }
    if(sceneId==='earth'){
      if(App.current!=='earth') App.go('earth');
      const m=monuments.find(x=>norm(x.name)===name);if(m)show(m);return;
    }
    if(sceneId==='sky'){
      if(App.current!=='sky')App.go('sky');const d=skyStarDefs.find(x=>norm(x.name)===name||norm(x.id)===name);if(d)showSkyStar(d);return;
    }
    if(sceneId==='galaxy'){
      if(App.current!=='galaxy')App.go('galaxy');const d=galaxyItems.find(x=>norm(x.name)===name||norm(x.id)===name);if(d)showGalaxyItem(d);return;
    }
    App.go(sceneId);
  }
  addEventListener('hashchange',route);

  /* ----- Démarrage ----- */
  globeGroup.rotation.y=-Math.PI/2; globeGroup.rotation.x=0.12;
  applyQuality(); syncUI(); renderSolarPanel(); $('panel').classList.remove('open');
  // Initialiser les positions, les orbites et la caméra avant la toute première image.
  if(App.current==='solar'){
    Solar.reset(true);
    Solar.update(0,Clock.t);
  }
  let frame=0;
  let lastRenderError='';
  function tick(){
    const now=performance.now(), dt=Math.min(0.1,(now-lastFrame)/1000); lastFrame=now; frame++;
    Clock.tick(dt);
    try {
      const sc=App.scenes.get(App.current); sc&&sc.update&&sc.update(dt,now);
      if(frame%8===0){ updateTimeUI();
        if(App.current==='earth') $('alt').textContent=Math.round((distance-1)*6371).toLocaleString('fr-FR')+' km';
        else if(App.current==='solar'){const f=Solar.rig.follow,b=f&&Solar.bodies[f];$('alt').textContent=b?(b.short+(b.pos?' · '+fmtN(Math.hypot(b.pos[0],b.pos[1],b.pos[2]),2)+' UA':b.aKm?' · '+fmtN(b.aKm)+' km de '+(Solar.bodies[b.parent]?.short||'son parent'):b.id==='moon'?' · satellite de la Terre':'')):'Vue d\'ensemble';}
        else if(App.current==='sky') $('alt').textContent=Math.round(Sky.fov)+'° de champ';
        else $('alt').textContent='Voie lactée · échelle schématique';
      }
      if(App.current==='solar'&&Solar.selected&&frame%30===0) refreshSolarInfo();
      renderer.render(scene,camera);
    } catch(err) {
      const message=(err&&err.message)||String(err);
      if(message!==lastRenderError){ console.error('Erreur de rendu ME3D :',err); toast('Erreur de rendu : '+message.slice(0,90)); lastRenderError=message; }
      // Ne pas laisser une erreur ponctuelle tuer définitivement la boucle d’animation.
      try { renderer.render(scene,camera); } catch(renderErr) { console.error('Erreur WebGL ME3D :',renderErr); }
    }
    requestAnimationFrame(tick);
  }
  renderer.render(scene,camera);
  $('loading').classList.add('hide');
  requestAnimationFrame(tick);
  route();
}
})();
}

import{j as e,C as f,a as r,u as l}from"./three-Blw2EqNM.js";function d({color:n="#ffffff",wireframe:a=!0}){const t=r.useRef(),i=r.useRef({x:0,y:0});r.useEffect(()=>{const s=o=>{const c=o.clientX/window.innerWidth-.5,v=o.clientY/window.innerHeight-.5;i.current.x=v*.6,i.current.y=c*.8};return window.addEventListener("pointermove",s,{passive:!0}),()=>window.removeEventListener("pointermove",s)},[]),l((s,o)=>{t.current&&(t.current.rotation.y+=o*.2,t.current.rotation.x+=(i.current.x-t.current.rotation.x)*.08,t.current.rotation.y+=(i.current.y-t.current.rotation.y)*.06)});const u=r.useMemo(()=>({color:n,wireframe:a,transparent:!0,opacity:.45}),[n,a]);return e.jsxs("mesh",{ref:t,scale:1.2,children:[e.jsx("icosahedronGeometry",{args:[1,0]}),e.jsx("meshStandardMaterial",{...u})]})}function m({enabled:n=!0}){const a=r.useRef(),t=r.useRef(),i=`
    varying vec2 vUv;
    uniform float uTime;
    // simple tiled sinus pattern used as a lightweight shader accent
    void main() {
      vec2 uv = vUv - 0.5;
      float t = uTime * 0.25;
      float s = sin((uv.x + t) * 10.0) * sin((uv.y + t) * 12.0);
      float a = smoothstep(-0.2, 0.8, s);
      vec3 col = vec3(1.0) * (0.05 + 0.08 * a);
      gl_FragColor = vec4(col, 0.22 + 0.20 * a);
    }
  `,u=`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,s=r.useMemo(()=>({uTime:{value:0}}),[]);return l((o,c)=>{n&&(s.uTime.value+=c)}),n?e.jsxs("mesh",{ref:a,position:[0,0,-.6],scale:[3.2,3.2,1],children:[e.jsx("planeGeometry",{args:[1,1,1,1]}),e.jsx("shaderMaterial",{ref:t,transparent:!0,uniforms:s,vertexShader:u,fragmentShader:i,depthWrite:!1})]}):null}function p({enableShader:n=!0}){return e.jsxs(f,{dpr:[1,Math.min(2,window.devicePixelRatio||1)],gl:{antialias:!0,alpha:!0},camera:{position:[0,0,3.2],fov:50},children:[e.jsx("ambientLight",{intensity:.35}),e.jsx("directionalLight",{position:[2,2,2],intensity:.6}),e.jsx("directionalLight",{position:[-2,-1,-2],intensity:.25}),e.jsxs("group",{position:[0,0,0],children:[e.jsx(m,{enabled:n}),e.jsx(d,{})]})]})}export{p as default};

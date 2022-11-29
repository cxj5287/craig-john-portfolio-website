import"./navslide.b6e1b205.js";import{O,B as W,F as M,M as X,C,S as g,U as D,V as h,W as b,a as I,b as w,A as q,c as $,G as J,d as Z,P as F,R as j,e as ee,f as te}from"./GLTFLoader.62da0a1e.js";class T{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const ie=new O(-1,1,1,-1,0,1),L=new W;L.setAttribute("position",new M([-1,3,0,-1,-1,0,3,-1,0],3));L.setAttribute("uv",new M([0,2,0,0,2,0],2));class G{constructor(e){this._mesh=new X(L,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ie)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class se extends T{constructor(e,i,s,r,t){super(),this.scene=e,this.camera=i,this.overrideMaterial=s,this.clearColor=r,this.clearAlpha=t!==void 0?t:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new C}render(e,i,s){const r=e.autoClear;e.autoClear=!1;let t,a;this.overrideMaterial!==void 0&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),t=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,t),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=a),e.autoClear=r}}const S={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class H extends T{constructor(e,i){super(),this.textureID=i!==void 0?i:"tDiffuse",e instanceof g?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=D.clone(e.uniforms),this.material=new g({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new G(this.material)}render(e,i,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}}class V extends T{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,s){const r=e.getContext(),t=e.state;t.buffers.color.setMask(!1),t.buffers.depth.setMask(!1),t.buffers.color.setLocked(!0),t.buffers.depth.setLocked(!0);let a,n;this.inverse?(a=0,n=1):(a=1,n=0),t.buffers.stencil.setTest(!0),t.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),t.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),t.buffers.stencil.setClear(n),t.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),t.buffers.color.setLocked(!1),t.buffers.depth.setLocked(!1),t.buffers.stencil.setLocked(!1),t.buffers.stencil.setFunc(r.EQUAL,1,4294967295),t.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),t.buffers.stencil.setLocked(!0)}}class re extends T{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ae{constructor(e,i){if(this.renderer=e,i===void 0){const s=e.getSize(new h);this._pixelRatio=e.getPixelRatio(),this._width=s.width,this._height=s.height,i=new b(this._width*this._pixelRatio,this._height*this._pixelRatio),i.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],S===void 0&&console.error("THREE.EffectComposer relies on CopyShader"),H===void 0&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new H(S),this.clock=new I}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const i=this.renderer.getRenderTarget();let s=!1;for(let r=0,t=this.passes.length;r<t;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),a.needsSwap){if(s){const n=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(n.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.setFunc(n.EQUAL,1,4294967295)}this.swapBuffers()}V!==void 0&&(a instanceof V?s=!0:a instanceof re&&(s=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new h);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const s=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(s,r),this.renderTarget2.setSize(s,r);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(s,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}}new O(-1,1,1,-1,0,1);const N=new W;N.setAttribute("position",new M([-1,3,0,-1,-1,0,3,-1,0],3));N.setAttribute("uv",new M([0,2,0,0,2,0],2));const Q={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new C(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class v extends T{constructor(e,i,s,r){super(),this.strength=i!==void 0?i:1,this.radius=s,this.threshold=r,this.resolution=e!==void 0?new h(e.x,e.y):new h(256,256),this.clearColor=new C(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let t=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new b(t,a),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const B=new b(t,a);B.texture.name="UnrealBloomPass.h"+f,B.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(B);const U=new b(t,a);U.texture.name="UnrealBloomPass.v"+f,U.texture.generateMipmaps=!1,this.renderTargetsVertical.push(U),t=Math.round(t/2),a=Math.round(a/2)}Q===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const n=Q;this.highPassUniforms=D.clone(n.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new g({uniforms:this.highPassUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const o=[3,5,7,9,11];t=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(o[f])),this.separableBlurMaterials[f].uniforms.texSize.value=new h(t,a),t=Math.round(t/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const Y=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=Y,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,S===void 0&&console.error("THREE.UnrealBloomPass relies on CopyShader");const R=S;this.copyUniforms=D.clone(R.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new g({uniforms:this.copyUniforms,vertexShader:R.vertexShader,fragmentShader:R.fragmentShader,blending:q,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new C,this.oldClearAlpha=1,this.basic=new $,this.fsQuad=new G(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose()}setSize(e,i){let s=Math.round(e/2),r=Math.round(i/2);this.renderTargetBright.setSize(s,r);for(let t=0;t<this.nMips;t++)this.renderTargetsHorizontal[t].setSize(s,r),this.renderTargetsVertical[t].setSize(s,r),this.separableBlurMaterials[t].uniforms.texSize.value=new h(s,r),s=Math.round(s/2),r=Math.round(r/2)}render(e,i,s,r,t){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),t&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let n=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this.fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[o].uniforms.direction.value=v.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[o]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=v.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[o]),e.clear(),this.fsQuad.render(e),n=this.renderTargetsVertical[o];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,t&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){return new g({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new h(.5,.5)},direction:{value:new h(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new g({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}v.BlurDirectionX=new h(1,0);v.BlurDirectionY=new h(0,1);var p,m=4e-4,E=!1;const oe=new J,le=document.querySelector("canvas.webgl"),d=new Z;oe.load("CUBE.gltf",function(l){p=l.scene,l.scene.scale.set(.3,.3,.3),l.scene.rotation.set(3,2.7,2.9),l.scene.position.set(.7,0,-.5),d.add(l.scene)});const y=new F(16777215,.09);y.position.x=-8.45;y.position.y=5;y.position.z=-6.9;d.add(y);const P=new F(16777215,.09);P.position.x=3.06;P.position.y=.52;P.position.z=.13;d.add(P);const _=new F(16777215,.09);_.position.x=.91;_.position.y=-2.21;_.position.z=-1.62;d.add(_);const k=new j;new j;const z=new h;new h;const u={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{u.width=window.innerWidth,u.height=window.innerHeight,c.aspect=u.width/u.height,c.updateProjectionMatrix(),x.setSize(u.width,u.height),x.setPixelRatio(Math.min(window.devicePixelRatio,2))});window.addEventListener("click",l=>{z.x=l.clientX/window.innerWidth*2-1,z.y=-(l.clientY/window.innerHeight)*2+1,k.setFromCamera(z,c);const e=k.intersectObjects(d.children);for(let i=0;i<e.length;i++)E=!0});const c=new ee(50,u.width/u.height,.1,2e3);c.position.x=0;c.position.y=0;c.position.z=1;d.add(c);const x=new te({canvas:le,alpha:!0});x.setSize(u.width,u.height);x.setPixelRatio(Math.min(window.devicePixelRatio,2));const ne=new se(d,c),A=new ae(x);A.addPass(ne);const he=new v(new h(window.innerWidth,window.innerHeight),.7,.9,.3);A.addPass(he);const ue=new I,K=()=>{E&&(m<=.5?(p.rotation.y+=m,m+=.002):window.location.href="pages/projects.html"),ue.getElapsedTime(),x.setClearColor(0,0),p&&!E&&(p.rotation.y+=m,(p.rotation.y>2.89||p.rotation.y<2.69)&&(m=-m)),A.render(),window.requestAnimationFrame(K)};K();

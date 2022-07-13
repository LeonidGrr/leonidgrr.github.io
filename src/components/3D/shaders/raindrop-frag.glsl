// Reference: https://www.shadertoy.com/view/ltffzl

// Heartfelt - by Martijn Steinrucken aka BigWings - 2017
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

varying vec2 vUv;

uniform float iTime;
uniform float zoom;
uniform float opacity;
uniform sampler2D iChannel0;

vec3 N13(float p) {
    //  from DAVE HOSKINS
   vec3 p3 = fract(vec3(p) * vec3(0.1031,0.11369,0.13787));
   p3 += dot(p3, p3.yzx + 19.19);
   return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

vec4 N14(float t) {
	return fract(sin(t*vec4(123.0, 1024.0, 1456.0, 264.0))*vec4(6547.0, 345.0, 8799.0, 1564.0));
}
float N(float t) {
    return fract(sin(t*12345.564)*7658.76);
}

float Saw(float b, float t) {
	return smoothstep(0.0, b, t)*smoothstep(1.0, b, t);
}

vec2 DropLayer2(vec2 uv, float t) {
    vec2 UV = uv;
    
    uv.y += t*0.75;
    vec2 a = vec2(6.0, 1.0);
    vec2 grid = a*2.0;
    vec2 id = floor(uv*grid);
    
    float colShift = N(id.x); 
    uv.y += colShift;
    
    id = floor(uv*grid);
    vec3 n = N13(id.x*35.2+id.y*2376.1);
    vec2 st = fract(uv*grid)-vec2(0.5, 0);
    
    float x = n.x-0.5;
    
    float y = UV.y*20.0;
    float wiggle = sin(y+sin(y));
    x += wiggle*(0.5-abs(x))*(n.z-0.5);
    x *= 0.7;
    float ti = fract(t+n.z);
    y = (Saw(0.85, ti)-0.5)*0.9+0.5;
    vec2 p = vec2(x, y);
    
    float d = length((st-p)*a.yx);
    
    float mainDrop = smoothstep(0.4, 0.0, d);
    
    float r = sqrt(smoothstep(1.0, y, st.y));
    float cd = abs(st.x-x);
    float trail = smoothstep(0.23*r, 0.15*r*r, cd);
    float trailFront = smoothstep(-0.02, 0.02, st.y-y);
    trail *= trailFront*r*r;
    
    y = UV.y;
    float trail2 = smoothstep(0.2*r, 0.0, cd);
    float droplets = max(0.0, (sin(y*(1.0-y)*120.0)-st.y))*trail2*trailFront*n.z;
    y = fract(y*10.0)+(st.y-0.5);
    float dd = length(st-vec2(x, y));
    droplets = smoothstep(0.3, 0.0, dd);
    float m = mainDrop+droplets*r*trailFront;

    return vec2(m, trail);
}

float StaticDrops(vec2 uv, float t) {
	uv *= 40.;
    
    vec2 id = floor(uv);
    uv = fract(uv)-0.5;
    vec3 n = N13(id.x*107.45+id.y*3543.654);
    vec2 p = (n.xy-0.5)*0.7;
    float d = length(uv-p);
    float c = smoothstep(0.3, 0.0, d)*fract(n.z*10.0);

    return c;
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
    float s = StaticDrops(uv, t)*l0; 
    vec2 m1 = DropLayer2(uv, t)*l1;
    vec2 m2 = DropLayer2(uv*1.85, t)*l2;
    
    float c = s+m1.x+m2.x;
    c = smoothstep(0.3, 1.0, c);
    
    return vec2(c, max(m1.y*l0, m2.y*l1));
}

void main() {
    vec2 uv = vec2(vUv.y, 1.0 - vUv.x);
    vec2 UV = vUv.yx;
    float T = iTime*0.0125;
    float t = T*0.2;
    float rainAmount = sin(T*0.05)*0.3+0.7;
    float maxBlur = mix(1.0, 4.0, rainAmount);
    float minBlur = 0.5;

    uv *= 0.7+zoom*0.3;

    UV = (UV-0.5)*(0.9+zoom*0.1)+0.5;

    float staticDrops = smoothstep(-0.5, 1.0, rainAmount)*2.0;
    float layer1 = smoothstep(0.25, 0.75, rainAmount);
    float layer2 = smoothstep(0.0, 0.5, rainAmount);
    vec2 c = Drops(uv, t, staticDrops, layer1, layer2);

    #ifdef CHEAP_NORMALS
    	vec2 n = vec2(dFdx(c.x), dFdy(c.x)); // cheap normals (3x cheaper, but 2 times shittier ;))
    #else
    	vec2 e = vec2(0.001, 0.0);
    	float cx = Drops(uv+e, t, staticDrops, layer1, layer2).x;
    	float cy = Drops(uv+e.yx, t, staticDrops, layer1, layer2).x;
    	vec2 n = vec2(cx-c.x, cy-c.x);		// expensive normals
    #endif
    
    float focus = mix(maxBlur-c.y, minBlur, smoothstep(0.1, 0.2, c.x));
    vec3 col = texture2DLodEXT(iChannel0, UV+n, focus).rgb;
    
    gl_FragColor = vec4(col, opacity);
}


// // "The Drive Home" by Martijn Steinrucken aka BigWings - 2017
// // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// // Email:countfrolic@gmail.com Twitter:@The_ArtOfCode

// #define S(x, y, z) smoothstep(x, y, z)
// #define B(a, b, edge, t) S(a-edge, a+edge, t)*S(b+edge, b-edge, t)
// #define sat(x) clamp(x,0.,1.)

// #define streetLightCol vec3(1., .7, .3)
// #define headLightCol vec3(.8, .8, 1.)
// #define tailLightCol vec3(1., .1, .1)

// #define HIGH_QUALITY
// #define LANE_BIAS .5
// #define RAIN

// vec3 ro, rd;

// // float N(float t) {
// // 	return fract(sin(t*10234.324)*123423.23512);
// // }

// vec3 N31(float p) {
//     //  3 out, 1 in... DAVE HOSKINS
//    vec3 p3 = fract(vec3(p) * vec3(.1031,.11369,.13787));
//    p3 += dot(p3, p3.yzx + 19.19);
//    return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
// }

// float N2(vec2 p) {	// Dave Hoskins - https://www.shadertoy.com/view/4djSRW
// 	vec3 p3  = fract(vec3(p.xyx) * vec3(443.897, 441.423, 437.195));
//     p3 += dot(p3, p3.yzx + 19.19);
//     return fract((p3.x + p3.y) * p3.z);
// }

// // float DistLine(vec3 ro, vec3 rd, vec3 p) {
// // 	return length(cross(p-ro, rd));
// // }
 
// // vec3 ClosestPoint(vec3 ro, vec3 rd, vec3 p) {
// //     // returns the closest point on ray r to point p
// //     return ro + max(0., dot(p-ro, rd))*rd;
// // }

// // float Remap(float a, float b, float c, float d, float t) {
// // 	return ((t-a)/(b-a))*(d-c)+c;
// // }

// // float BokehMask(vec3 ro, vec3 rd, vec3 p, float size, float blur) {
// // 	float d = DistLine(ro, rd, p);
// //     float m = S(size, size*(1.-blur), d);
    
// //     #ifdef HIGH_QUALITY
// //     m *= mix(.7, 1., S(.8*size, size, d));
// //     #endif
    
// //     return m;
// // }



// // float SawTooth(float t) {
// //     return cos(t+cos(t))+sin(2.*t)*.2+sin(4.*t)*.02;
// // }

// // float DeltaSawTooth(float t) {
// //     return 0.4*cos(2.*t)+0.08*cos(4.*t) - (1.-sin(t))*sin(t+cos(t));
// // }  

// // vec2 GetDrops(vec2 uv, float seed) {
    
// //     float t = iTime+30.;
// //     vec2 o = vec2(0.);
    
// //     #ifndef DROP_DEBUG
// //     uv.y += t*.05;
// //     #endif
    
// //     uv *= vec2(10., 2.5)*2.;
// //     vec2 id = floor(uv);
// //     vec3 n = N31(id.x + (id.y+seed)*546.3524);
// //     vec2 bd = fract(uv);
    
// //     vec2 uv2 = bd;
    
// //     bd -= .5;
    
// //     bd.y*=4.;
    
// //     bd.x += (n.x-.5)*.6;
    
// //     t += n.z * 6.28;
// //     float slide = SawTooth(t);
    
// //     float ts = 1.5;
// //     vec2 trailPos = vec2(bd.x*ts, (fract(bd.y*ts*2.-t*2.)-.5)*.5);
    
// //     bd.y += slide*2.;								// make drops slide down
    
// //     #ifdef HIGH_QUALITY
// //     float dropShape = bd.x*bd.x;
// //     dropShape *= DeltaSawTooth(t);
// //     bd.y += dropShape;								// change shape of drop when it is falling
// //     #endif
    
// //     float d = length(bd);							// distance to main drop
    
// //     float trailMask = S(-.2, .2, bd.y);				// mask out drops that are below the main
// //     trailMask *= bd.y;								// fade dropsize
// //     float td = length(trailPos*max(.5, trailMask));	// distance to trail drops
    
// //     float mainDrop = S(.2, .1, d);
// //     float dropTrail = S(.1, .02, td);
    
// //     dropTrail *= trailMask;
// //     o = mix(bd*mainDrop, trailPos, dropTrail);		// mix main drop and drop trail
    
// //     #ifdef DROP_DEBUG
// //     if(uv2.x<.02 || uv2.y<.01) o = vec2(1.);
// //     #endif
    
// //     return o;
// // }

// // vec3 HeadLights(float i, float t) {
// //     float z = fract(-t*2.+i);
// //     vec3 p = vec3(-.3, .1, z*40.);
// //     float d = length(p-ro);
    
// //     float size = mix(.03, .05, S(.02, .07, z))*d;
// //     float m = 0.;
// //     float blur = .1;
// //     m += BokehMask(ro, rd, p-vec3(.08, 0., 0.), size, blur);
// //     m += BokehMask(ro, rd, p+vec3(.08, 0., 0.), size, blur);
    
// //     #ifdef HIGH_QUALITY
// //     m += BokehMask(ro, rd, p+vec3(.1, 0., 0.), size, blur);
// //     m += BokehMask(ro, rd, p-vec3(.1, 0., 0.), size, blur);
// //     #endif
    
// //     float distFade = max(.01, pow(1.-z, 9.));
    
// //     blur = .8;
// //     size *= 2.5;
// //     float r = 0.;
// //     r += BokehMask(ro, rd, p+vec3(-.09, -.2, 0.), size, blur);
// //     r += BokehMask(ro, rd, p+vec3(.09, -.2, 0.), size, blur);
// //     r *= distFade*distFade;
    
// //     return headLightCol*(m+r)*distFade;
// // }


// // vec3 TailLights(float i, float t) {
// //     t = t*1.5+i;
    
// //     float id = floor(t)+i;
// //     vec3 n = N31(id);
    
// //     float laneId = S(LANE_BIAS, LANE_BIAS+.01, n.y);
    
// //     float ft = fract(t);
    
// //     float z = 3.-ft*3.;						// distance ahead
    
// //     laneId *= S(.2, 1.5, z);				// get out of the way!
// //     float lane = mix(.6, .3, laneId);
// //     vec3 p = vec3(lane, .1, z);
// //     float d = length(p-ro);
    
// //     float size = .05*d;
// //     float blur = .1;
// //     float m = BokehMask(ro, rd, p-vec3(.08, 0., 0.), size, blur) +
// //     			BokehMask(ro, rd, p+vec3(.08, 0., 0.), size, blur);
    
// //     #ifdef HIGH_QUALITY
// //     float bs = n.z*3.;						// start braking at random distance		
// //     float brake = S(bs, bs+.01, z);
// //     brake *= S(bs+.01, bs, z-.5*n.y);		// n.y = random brake duration
    
// //     m += (BokehMask(ro, rd, p+vec3(.1, 0., 0.), size, blur) +
// //     	BokehMask(ro, rd, p-vec3(.1, 0., 0.), size, blur))*brake;
// //     #endif
    
// //     float refSize = size*2.5;
// //     m += BokehMask(ro, rd, p+vec3(-.09, -.2, 0.), refSize, .8);
// //     m += BokehMask(ro, rd, p+vec3(.09, -.2, 0.), refSize, .8);
// //     vec3 col = tailLightCol*m*ft; 
    
// //     float b = BokehMask(ro, rd, p+vec3(.12, 0., 0.), size, blur);
// //     b += BokehMask(ro, rd, p+vec3(.12, -.2, 0.), refSize, .8)*.2;
    
// //     vec3 blinker = vec3(1., .7, .2);
// //     blinker *= S(1.5, 1.4, z)*S(.2, .3, z);
// //     blinker *= sat(sin(t*200.)*100.);
// //     blinker *= laneId;
// //     col += blinker*b;
    
// //     return col;
// // }

// // vec3 StreetLights(float i, float t) {
// // 	float side = sign(rd.x);
// //     float offset = max(side, 0.)*(1./16.);
// //     float z = fract(i-t+offset); 
// //     vec3 p = vec3(2.*side, 2., z*60.);
// //     float d = length(p-ro);
// // 	float blur = .1;
// //     vec3 rp = ClosestPoint(ro, rd, p);
// //     float distFade = Remap(1., .7, .1, 1.5, 1.-pow(1.-z,6.));
// //     distFade *= (1.-z);
// //     float m = BokehMask(ro, rd, p, .05*d, blur)*distFade;
    
// //     return m*streetLightCol;
// // }

// // void mainImage( out vec4 fragColor, in vec2 fragCoord )
// // {
// // 	float t = iTime;
// //     vec3 col = vec3(0.);
// //     vec2 uv = fragCoord.xy / iResolution.xy; // 0 <> 1
    
// //     uv -= .5;
// //     uv.x *= iResolution.x/iResolution.y;
    
// //     vec3 pos = vec3(.3, .15, 0.);
    
// //     float bt = t * 5.;
// //     float h1 = N(floor(bt));
// //     float h2 = N(floor(bt+1.));
    
// //     float lookatY = pos.y;
// //     vec3 lookat = vec3(0.3, lookatY, 1.);
// //     vec3 lookat2 = vec3(0., lookatY, .7);
// //     lookat = mix(lookat, lookat2, sin(t*.1)*.5+.5);
    
// //     ro = pos;
// //     vec3 f = normalize(lookat-ro);
// //     vec3 r = cross(vec3(0., 1., 0.), f);
// //     vec3 u = cross(f, r);
    
// //     vec2 offs = vec2(0.);
// //     #ifdef RAIN
// //     vec2 dropUv = uv; 
    
// //     #ifdef HIGH_QUALITY
// //     float x = (sin(t*.1)*.5+.5)*.5;
// //     x = -x*x;
// //     float s = sin(x);
// //     float c = cos(x);
    
// //     mat2 rot = mat2(c, -s, s, c);

// //     #endif
    
// //     offs = GetDrops(dropUv, 1.);
    

// //     #ifdef HIGH_QUALITY
// //     offs += GetDrops(dropUv*2.4, 25.);
// //     //offs += GetDrops(dropUv*3.4, 11.);
// //     //offs += GetDrops(dropUv*3., 2.);
// //     #endif
    
// //     float ripple = sin(t+uv.y*3.1415*30.+uv.x*124.)*.5+.5;
// //     ripple *= .005;
// //     offs += vec2(ripple*ripple, ripple);
// //     #endif
// //     float zoom = 1.0;
// //     vec3 center = ro + f*zoom;
// //     vec3 i = center + (uv.x-offs.x)*r + (uv.y-offs.y)*u;
    
// //     rd = normalize(i-ro);
   
// //     t *= .03;
    
// //     // fix for GLES devices by MacroMachines
// //     #ifdef GL_ES
// // 	const float stp = 1./8.;
// // 	#else
// // 	float stp = 1./8.
// // 	#endif
    
// //     for(float i=0.; i<1.; i+=stp) {
// //        col += StreetLights(i, t);
// //     }
    
// //     for(float i=0.; i<1.; i+=stp) {
// //         float n = N(i+floor(t));
// //     	col += HeadLights(i+n*stp*.7, t);
// //     }
    
// //     #ifndef GL_ES
// //     #ifdef HIGH_QUALITY
// //     stp = 1./32.;
// //     #else
// //     stp = 1./16.;
// //     #endif
// //     #endif

// //     col += TailLights(0., t);
// //     col += TailLights(.5, t);
    
// //     col += sat(rd.y)*vec3(.6, .5, .9);
    
// // 	fragColor = vec4(col, 0.);
// // }
// Macros
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

// Read-only
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Functions
float plot(vec2 st,float pct){
    // return smoothstep(.02,0.,abs(st.y-st.x));
    return smoothstep(pct-.02,pct,st.y)-smoothstep(pct,pct+.02,st.y);
}

void main(){
    // Normalized coordinates
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    // ---- Exponentials ----
    // float y = st.x; // linear interpolation
    // float y = pow(st.x,5.);
    // float y = exp(st.x)-1.;
    // float y = log(st.x)+1.;
    // float y = sqrt(st.x);
    
    // ---- Hardware accelerated functions ----
    // float y = step(0.5, st.x); // limit and threshold
    // float y = smoothstep(0.1, 0.9, st.x); // interpolate value between 2 ranges
    // float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
    // float y = smoothstep(0.2,0.5,st.x);
    // float y = smoothstep(0.5,0.8,st.x);
    
    // ---- Sine and Cosine -----
    // float y=sin(st.x);
    // float y = sin(st.x+u_time);
    // float y = ceil(sin(st.x * PI + u_time)) + floor(sin(st.x * PI + u_time));
    // float y = abs(sin(st.x + u_time));
    
    // ---- Other functions ----
    // float y = mod(st.x, 0.5);
    // float y = fract(st.x);
    // float y = ceil(st.x);
    // float y = floor(st.x);
    // float y = sign(st.x);
    // float y = abs(st.x);
    // float y = clamp(st.x, 0.0, 1.0);
    // float y = min(0.0, st.x);
    float y=max(0.,st.x);
    
    vec3 color=vec3(y);
    
    float pct=plot(st,y);
    
    color=(1.-pct)*color+pct*vec3(.0667,1.,0.);
    
    gl_FragColor=vec4(color,1.);
}

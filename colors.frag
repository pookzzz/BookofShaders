// notes and code for thebookofshader/06

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966
#define SMOOTH 1

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float plot(vec2 st,float pct){
    // Calculate the graph using smoothstep functions
    float lowerStep=smoothstep(pct-.01,pct,st.y);
    float upperStep=smoothstep(pct,pct+.01,st.y);

    // Subtract the upper step from the lower step to create the plot
    return lowerStep-upperStep;
}

vec3 rainbow(float level){
    float r = float(level<=2.0) + float(level > 4.0) * 0.5;
    float g = max(1.0 - abs(level-2.0) * 0.5, 0.0);
    float b = (1.0 - (level - 4.0) *  0.5) * float(level >= 4.0);
    return vec3(r, g, b);
}

vec3 smoothRainbow(float x){
    float level1 = floor(x * 6.0);
    float level2 = min(6.0, floor(x * 6.0) + 1.0);

    vec3 a = rainbow(level1);
    vec3 b = rainbow(level2);

    return mix(a, b, fract(x * 6.0));
}


vec3 transitionLines(vec2 st, vec3 color){
    // Plot transition lines for each channel
    color=mix(color,vec3(1.0,0.0,0.0),plot(st,color.r));
    color=mix(color,vec3(0.0,1.0,0.0),plot(st,color.g));
    color=mix(color,vec3(0.0,0.0,1.0),plot(st,color.b));

    return color;
}

// William Turner's sunset
vec3 colorA = vec3(0.98, 0.625, 0.22); // warm yellow
vec3 colorB = vec3(0.91, 0.32, 0.17); // deep orange
vec3 colorC = vec3(0.1529, 0.0902, 0.3765); // dark red


void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.);

    // Rainbow
    #if SMOOTH
        color = smoothRainbow(st.x);
    #else
        color = rainbow(st.x  * 6.0);
    #endif

    // Sunset
    float transition = st.x;
    // float transition = 0.5 * (1.0 + sin(u_time * 0.5)); //animated sunset
    if (transition < 0.5) {
        color = mix(colorA, colorB, transition * 2.0);
    } else  {
        color = mix(colorB, colorC, (transition - 0.5)* 2.0);
    }

    // Step flag
    float stripeA = step(0.33, st.x);
    float stripeB = step(0.66, st.x);

    color = mix(colorA, colorB, stripeA);
    color = mix(color, colorC, stripeB);

    color=transitionLines(st, color);

    gl_FragColor=vec4(color,1.);
}

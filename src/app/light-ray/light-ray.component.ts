import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

@Component({
  selector: 'app-light-ray',
  templateUrl: './light-ray.component.html',
  styleUrls: ['./light-ray.component.css'],
})
export class LightRayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  @Input() particleCount = 200;
  @Input() particleSpread = 10;
  @Input() speed = 0.1;
  @Input() particleColors: string[] = ['#ffffff', '#ffffff', '#ffffff'];
  @Input() moveParticlesOnHover = true; // enable cursor interaction
  @Input() particleHoverFactor = 5;      // more pronounced movement
  @Input() alphaParticles = false;
  @Input() particleBaseSize = 100;
  @Input() sizeRandomness = 1;
  @Input() cameraDistance = 20;
  @Input() disableRotation = false;

  private animationFrameId: number | null = null;
  private mouse = { x: 0, y: 0 };

  private vertex = `
    attribute vec3 position;
    attribute vec4 random;
    attribute vec3 color;

    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;
    uniform float uSpread;
    uniform float uBaseSize;
    uniform float uSizeRandomness;

    varying vec4 vRandom;
    varying vec3 vColor;

    void main() {
      vRandom = random;
      vColor = color;

      vec3 pos = position * uSpread;
      pos.z *= 10.0;

      vec4 mPos = modelMatrix * vec4(pos, 1.0);
      float t = uTime;
      mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
      mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
      mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

      vec4 mvPos = viewMatrix * mPos;
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `;

  private fragment = `
    precision highp float;

    uniform float uTime;
    uniform float uAlphaParticles;
    varying vec4 vRandom;
    varying vec3 vColor;

    void main() {
      vec2 uv = gl_PointCoord.xy;
      float d = length(uv - vec2(0.5));

      if(uAlphaParticles < 0.5) {
        if(d > 0.5) discard;
        gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
      } else {
        float circle = smoothstep(0.5, 0.4, d) * 0.8;
        gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
      }
    }
  `;

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, this.cameraDistance);

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse movement
    if (this.moveParticlesOnHover) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      });
    }

    // Particle data
    const count = this.particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);

      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = this.hexToRgb(this.particleColors[Math.floor(Math.random() * this.particleColors.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex: this.vertex,
      fragment: this.fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: this.particleSpread },
        uBaseSize: { value: this.particleBaseSize },
        uSizeRandomness: { value: this.sizeRandomness },
        uAlphaParticles: { value: this.alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      this.animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * this.speed;

      program.uniforms['uTime'].value = elapsed * 0.001;

      // Smooth cursor movement (lerp)
      if (this.moveParticlesOnHover) {
        const targetX = -this.mouse.x * this.particleHoverFactor;
        const targetY = -this.mouse.y * this.particleHoverFactor;
        const ease = 0.05; // smaller = smoother

        particles.position.x += (targetX - particles.position.x) * ease;
        particles.position.y += (targetY - particles.position.y) * ease;
      }

      if (!this.disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * this.speed;
      }

      renderer.render({ scene: particles, camera });
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  private hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const int = parseInt(hex, 16);
    return [
      ((int >> 16) & 255) / 255,
      ((int >> 8) & 255) / 255,
      (int & 255) / 255
    ];
  }
}

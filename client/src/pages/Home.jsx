import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Shield, FileText } from 'lucide-react';

export default function Home() {
  const canvasRef = useRef(null);

  // 3D PDF Analyzing Animation Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for PDF documents
    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 100;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 3;
        this.vz = Math.random() * 0.5;
        this.size = Math.random() * 30 + 20;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.rotation += this.rotationSpeed;

        // Wrap around
        if (this.x > canvas.width) this.x = -50;
        if (this.x < -50) this.x = canvas.width;
        if (this.y > canvas.height) this.y = -50;
        if (this.y < -50) this.y = canvas.height;
        if (this.z > 100) {
          this.z = 0;
          this.opacity = Math.random() * 0.3 + 0.1;
        }
      }

      draw(ctx) {
        const scale = this.z / 100;
        const size = this.size * scale;
        const opacity = this.opacity * (1 - this.z / 100);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw PDF document icon
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(-size / 2, -size / 2, size, size);

        // PDF text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = `bold ${size * 0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PDF', 0, 0);

        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animated lines/connections
    const lines = [];

    class Line {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.length = Math.random() * 100 + 50;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.2 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += 0.01;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + Math.cos(this.angle) * this.length,
          this.y + Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    // Initialize lines
    for (let i = 0; i < 20; i++) {
      lines.push(new Line());
    }

    // Animation loop
    const animate = () => {
      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw glow effect
      ctx.fillStyle = 'rgba(37, 99, 235, 0.03)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw lines
      lines.forEach((line) => {
        line.update();
        line.draw(ctx);
      });

      // Update and draw particles (sorted by z-depth)
      particles.forEach((particle) => particle.update());
      particles.sort((a, b) => a.z - b.z);
      particles.forEach((particle) => particle.draw(ctx));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Gradient Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-slate-950/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 pt-24 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">AI-Powered Analysis</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
            Compliance Made Simple
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Upload legal documents, evaluate compliance risks, and make informed decisions with AI-powered analysis. 
            <span className="block mt-2 text-blue-200">Trusted by startups worldwide.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/login"
              className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
          <div className="group p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:bg-white/10">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Document Analysis</h3>
            <p className="text-gray-400 text-sm">
              Upload PDFs and documents for instant AI-powered compliance analysis
            </p>
          </div>

          <div className="group p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:bg-white/10">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
            <p className="text-gray-400 text-sm">
              Get detailed risk scores and actionable recommendations
            </p>
          </div>

          <div className="group p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:bg-white/10">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
            <p className="text-gray-400 text-sm">
              Get comprehensive compliance reports in seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

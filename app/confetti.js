"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "#f7c948",
  "#5ec8c2",
  "#f08a5d",
  "#7aa5ff",
  "#7cd1a7",
  "#ff7f7f",
  "#ffd166",
  "#4cc9b0",
  "#f6bd60",
  "#6d9ef7",
  "#ff8fab",
  "#d2a8ff",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function drawConfettiPiece(ctx, piece) {
  ctx.save();
  ctx.translate(piece.x, piece.y);
  ctx.rotate((piece.rotation * Math.PI) / 180);
  ctx.fillStyle = piece.color;

  if (piece.shape === "rect") {
    ctx.fillRect(-piece.size / 2, -piece.size * 0.8, piece.size, piece.size * 1.6);
  } else {
    ctx.beginPath();
    ctx.moveTo(0, -piece.size);
    ctx.lineTo(piece.size * 0.65, 0);
    ctx.lineTo(0, piece.size);
    ctx.lineTo(-piece.size * 0.65, 0);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

export default function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    const pieces = [];
    const confettiDurationMs = 3000;
    const spawnIntervalMs = 20;
    const startTime = performance.now();
    let nextSpawnTime = startTime;
    let animationFrameId = 0;

    function createPiece() {
      return {
        x: randomBetween(0, window.innerWidth),
        y: -30,
        size: randomBetween(6, 12),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() > 0.5 ? "rect" : "diamond",
        rotation: randomBetween(0, 360),
        spin: randomBetween(-12, 12),
        drift: randomBetween(-1.2, 1.2),
        velocityY: randomBetween(1.6, 3.5),
        velocityX: randomBetween(-0.9, 0.9),
      };
    }

    function resizeCanvas() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.ceil(window.innerWidth * ratio);
      canvas.height = Math.ceil(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const now = performance.now();
      const elapsed = now - startTime;

      while (
        elapsed < confettiDurationMs &&
        now >= nextSpawnTime
      ) {
        pieces.push(createPiece());
        nextSpawnTime += spawnIntervalMs;
      }

      for (let index = pieces.length - 1; index >= 0; index -= 1) {
        const piece = pieces[index];
        piece.x += piece.velocityX + piece.drift;
        piece.y += piece.velocityY;
        piece.rotation += piece.spin;

        if (piece.y > window.innerHeight + 30) {
          pieces.splice(index, 1);
          continue;
        }

        drawConfettiPiece(ctx, piece);
      }

      if (elapsed >= confettiDurationMs && pieces.length === 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
      for (const piece of pieces) {
        piece.x = Math.min(window.innerWidth, Math.max(0, piece.x));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

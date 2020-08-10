(_ => {
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.dencity = (Math.random() * 10 | 0) + 5;
      this.radius = 3;
      this.color = 'rgba(0, 0, 0, 1)';
      this.strokeColor = 'rgba(0, 0, 0, 0.5)';
    }
  }
  _.addEventListener('load', event => {
    const canvas = initCanvas();
    const ctx = canvas.getContext('2d');
    let canvasRect = canvas.getBoundingClientRect();

    let particles = getParticles(ctx);
    let mover = { x: -100, y: -100, radius: 120 };
    mover.reset = function() {
      this.x = -100;
      this.y = -100;
    };
    canvas.addEventListener('mousemove', event => {
      event.stopPropagation();
      event.preventDefault();
      mover.x = canvas.width * (event.offsetX) / canvasRect.width | 0;
      mover.y = canvas.height * (event.offsetY) / canvasRect.height | 0;
    });

    canvas.addEventListener('touchmove', event => {
      event.stopPropagation();
      event.preventDefault();
      canvasRect = canvas.getBoundingClientRect();
      mover.x = canvas.width * (event.touches[0].clientX - canvasRect.left) / canvasRect.width | 0;
      mover.y = canvas.height * (event.touches[0].clientY - canvasRect.top) / canvasRect.height | 0;
    });
    canvas.addEventListener('mouseout', event => {
      mover.reset();
    });
    canvas.addEventListener('touchend', event => {
      mover.reset()
    });

    ctx.fillStyle = 'black';
    const animate = () => {
      canvas.width = canvas.width;
      draw(ctx, particles);
      update(mover, particles);
      requestAnimationFrame(animate);
    };

    animate();
  });

  const update = (mover, particles) => {
    const moverX = mover.x;
    const moverY = mover.y;
    const moverRadius = mover.radius;

    for (let particle of particles) {
      let dx = particle.x - moverX;
      let dy = particle.y - moverY;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < moverRadius) {
        let forceDirectionX = dx / distance;  // 거리가 멀수록 커지는 값 최대 값은 1 => 거리에서 x의 비중 => x방향 가속도
        let forceDirectionY = dy / distance;
        let force = (moverRadius - distance) / moverRadius; // 거리가 멀수록 작어지는 값 최대값 1 => 가리에 따른 가속도
        particle.x += forceDirectionX * force * particle.dencity;
        particle.y += forceDirectionY * force * particle.dencity;
      } else {
        if (particle.baseX !== particle.x) {
          let dx = particle.baseX - particle.x;
          particle.x += dx / 30;
        }
        if (particle.baseY !== particle.y) {
          let dy = particle.baseY - particle.y;
          particle.y += dy / 30;
        }
      }
    }
  };

  const draw = (ctx, particles) => {
    // ctx.beginPath();
    for (let particle of particles) {
      ctx.beginPath();
      // ctx.moveTo(particle.x, particle.y);
      ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
      ctx.fillStyle = particle.color;
      ctx.fill();
      // ctx.closePath();
    }


    ctx.beginPath();
    for (let i = 0; i < particles.length - 1; i++) {
      let a = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        let b = particles[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
          // ctx.strokeStyle = `rgba(0, 0, 0, ${ 1 - distance/100})`;
          ctx.strokeStyle = particles[i].strokeColor;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
    }
    // ctx.closePath();
    ctx.stroke();
  };

  const getParticles = ctx => {
    // // const texts = ['Hi~!'];
    // const texts = ['😀', '🤪', '😱', '👻', '😈', '🎃', '🐝'];
    // const text = texts[Math.random() * texts.length | 0];
    const randA = (Math.random() * 5 | 0) * 10;
    const randB = Math.random() * 16 | 0;
    const text = String.fromCodePoint(parseInt('1F600', 16) + randA + randB);

    ctx.font = '50px bold Noto Serif KR';
    ctx.fillText(text, 5, 45);

    const rect = ctx.getImageData(0, 0, 100, 80);
    ctx.clearRect(0, 0, 100, 100);

    const data = rect.data;
    const textPath = [];

    for (let y = 0; y < rect.height; y++) {
      for (let x = 0; x < rect.width; x++) {
        let index = y * (4 * rect.width) + (4 * x + 3);
        if (data[index] > 50) {
          let particle = new Particle((x + 20) * 10, y * 10);
          particle.color = `rgba(${data[index - 3]}, ${data[index - 2]}, ${data[index - 1]}, 1)`;
          particle.strokeColor= `rgba(${data[index - 3]}, ${data[index - 2]}, ${data[index - 1]}, 0.1)`;
          textPath.push(particle);
        }
      }
    }

    return textPath;
  };

  const initCanvas = () => {
    const host = document.querySelector('.text-animation');
    const canvas = host.querySelector('.text-animation__canvas');
    const hostClientRect = host.getBoundingClientRect();
    canvas.width = 1000;
    canvas.height =
      canvas.width * (hostClientRect.height / hostClientRect.width);

    return canvas;
  };
})(window);

document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('radarChart');
    const sides = 5; 
    const center = 200; 
    
    // Raio ajustado para caber melhor no card (conforme o ajuste anterior)
    const radius = 150; 
    const levels = 4; 

    // Níveis de habilidade (0 a 100) para cada eixo:
    // Ordem: [Back-End, Front-End, Banco de Dados, Redes, Sistemas Operacionais]
    const dataValues = [
        80, // Back-End 
        95, // Front-End 
        65, // Banco de Dados 
        50, // Redes 
        70  // Sistemas Operacionais 
    ];
    
    // ATUALIZAÇÃO: Cores dos pontos de dados usando valores hexadecimais
    // Se você quisesse usar a cor #323264 que mencionou, você a colocaria diretamente.
    // Aqui mantivemos o padrão visual da imagem (Rosa/Verde)
    const backEndColor = '#00FF99'; // Verde/Ciano
    const frontEndColor = '#FF00A5'; // Rosa/Magenta

    const axisColors = [
        backEndColor,  // Back-End
        frontEndColor, // Front-End
        frontEndColor, // Banco de Dados
        backEndColor,  // Redes
        backEndColor   // Sistemas Operacionais
    ];
    
    // Cor do polígono interno de dados (o preenchimento)
    // Usamos um tom de roxo semitransparente para o preenchimento
    const dataFillColor = 'rgba(140, 123, 255, 0.3)';
    const dataStrokeColor = '#8c7bff'; // Cor da borda do polígono

    /**
     * Converte polar (raio, ângulo) para coordenadas cartesianas (x, y).
     * @param {number} r - O raio (distância do centro).
     * @param {number} angleDeg - O ângulo em graus.
     * @returns {{x: number, y: number}} As coordenadas X e Y.
     */
    function polarToCartesian(r, angleDeg) {
        const angleRad = (angleDeg - 90) * (Math.PI / 180); 
        return {
            x: center + (r * Math.cos(angleRad)),
            y: center + (r * Math.sin(angleRad))
        };
    }

    /**
     * Gera os pontos (string de coordenadas) para um polígono regular.
     * @param {number} r - O raio do polígono.
     * @returns {string} String formatada para o atributo 'points' do SVG.
     */
    function generatePolygonPoints(r) {
        let points = '';
        const angleIncrement = 360 / sides;
        for (let i = 0; i < sides; i++) {
            const angle = i * angleIncrement;
            const coord = polarToCartesian(r, angle);
            points += `${coord.x},${coord.y} `;
        }
        return points.trim();
    }

    // 1. Desenha a Grade (Polígonos concêntricos)
    const gridColor = '#4a4a8c'; // Cor da grade definida no CSS
    const bgColor = '#191932'; // Cor do background (para a borda do ponto)

    for (let i = 1; i <= levels; i++) {
        const r = (radius / levels) * i;
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', generatePolygonPoints(r));
        polygon.setAttribute('fill', 'none');
        polygon.setAttribute('stroke', gridColor);
        polygon.setAttribute('stroke-width', '2');
        
        if (i === 1) { 
             polygon.setAttribute('fill', 'rgba(255, 255, 255, 0.05)');
             polygon.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
        }
        
        svg.appendChild(polygon);
    }
    
    // 2. Desenha os Eixos
    const angleIncrement = 360 / sides;
    for (let i = 0; i < sides; i++) {
        const angle = i * angleIncrement;
        const endPoint = polarToCartesian(radius, angle);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', center);
        line.setAttribute('y1', center);
        line.setAttribute('x2', endPoint.x);
        line.setAttribute('y2', endPoint.y);
        line.setAttribute('stroke', gridColor);
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    // 3. Desenha o Polígono de Dados
    let dataPoints = '';
    for (let i = 0; i < sides; i++) {
        const dataR = (dataValues[i] / 100) * radius; 
        const angle = i * angleIncrement;
        const coord = polarToCartesian(dataR, angle);
        dataPoints += `${coord.x},${coord.y} `;
    }

    const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataPolygon.setAttribute('points', dataPoints.trim());
    dataPolygon.setAttribute('fill', dataFillColor);
    dataPolygon.setAttribute('stroke', dataStrokeColor);
    dataPolygon.setAttribute('stroke-width', '3');
    dataPolygon.setAttribute('filter', 'url(#glow)'); 
    svg.appendChild(dataPolygon);

    // 4. Desenha os Pontos de Dados (Círculos)
    for (let i = 0; i < sides; i++) {
        const dataR = (dataValues[i] / 100) * radius;
        const angle = i * angleIncrement;
        const coord = polarToCartesian(dataR, angle);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', coord.x);
        circle.setAttribute('cy', coord.y);
        circle.setAttribute('r', '5'); 
        circle.setAttribute('fill', axisColors[i]); // Usa a cor hardcoded do array
        circle.setAttribute('stroke', bgColor);
        circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);
    }
    
    // 5. Adiciona Definições de Filtro (Brilho/Glow)
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    `;
    svg.insertBefore(defs, svg.firstChild);
});
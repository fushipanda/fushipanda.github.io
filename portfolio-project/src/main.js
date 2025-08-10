import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three'

// Add HTML content
const contentDiv = document.createElement('div');
contentDiv.classList.add('content-overlay');
contentDiv.innerHTML = `
    <div class="header">
        <h1>Lewis Wood</h1>
        <p class="subtitle">AI & Web Dev</p>
    </div>
`;

const projects = [
    {
        title: "Red-Teaming LLM Models for Road Safety",
        description: "Developed an experimental platform for red-teaming multimodal large language models in road safety contexts in collaboration with the Western Australian Centre for Road Safety Research. The system evaluates ChatGPT, Claude, and Gemini models using adversarial testing with environmental manipulations including fog, rain, graffiti, and brightness adjustments to assess robustness in safety-critical scenarios. Features CLI interface, batch processing, parallel execution, and comprehensive CSV/JSON output for performance analysis.",
        technologies: ["Python", "OpenAI API", "Google Gemini API", "Claude API", "Computer Vision", "CLI"],
        link: "https://github.com/23348918/CITS3200-Group37"
    },
    {
    title: "League of Legends 2v2 Discord Bot",
    description: "A Discord bot that generates creative champion categories for League of Legends ARAM games using both predefined categories and OpenAI's GPT-4 for dynamic category generation. Features randomized selection from 70+ categories and AI-powered custom challenges based on champion abilities, synergies, and lore.",
    technologies: ["Python", "Discord.py", "OpenAI API", "GPT-4", "Environment Variables", "Asyncio"],
    link: "https://github.com/fushipanda/lol-2v2-discord-bot"
}
];

// Create project wrappers
projects.forEach(project => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('content-wrapper');
    wrapper.innerHTML = `
        <div class="project">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link">View Project →</a>
        </div>
    `;
    contentDiv.appendChild(wrapper);
});

// contentDiv.appendChild(projectWrappersWrapper);
document.body.appendChild(contentDiv);



// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Create a large plane geometry
const planeGeometry = new THREE.PlaneGeometry(40, 40, 20, 20);
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.5
});

const backgroundMesh = new THREE.Mesh(planeGeometry, material);
scene.add(backgroundMesh);

// Position camera
camera.position.z = 10;

// Animation
function animate() {
    // Create wave-like motion
    const time = Date.now() * 0.0002;
    
    // Update vertices
    const vertices = planeGeometry.attributes.position.array;
    for(let i = 0; i < vertices.length; i += 3) {
        vertices[i + 2] = Math.sin(time + vertices[i] / 2) * 0.5;
    }
    planeGeometry.attributes.position.needsUpdate = true;

    // Slow rotation
    backgroundMesh.rotation.x = Math.sin(time * 0.2) * 0.1;
    backgroundMesh.rotation.y = Math.cos(time * 0.2) * 0.1;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// setupCounter(document.querySelector('#counter'))

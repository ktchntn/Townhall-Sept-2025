
import { createMatrixBackground } from './modules/matrix-background.js';
import { createVisitorCounter } from './modules/visitor-counter.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainFrame = document.querySelector('.frame-main');
    const counter = document.querySelector('.counter-container');

    if (mainFrame) {
        createMatrixBackground({
            target: mainFrame,
            color: '#0f0',
            fontSize: 14,
            zIndex: -1 // Place it behind content but above the frame's background
        });
    }

    if (counter) {
        createVisitorCounter({
            container: counter,
            label: 'Visitors:',
            startValue: 9876,
            digits: 6,
            glowEffect: true,
            incrementInterval: 30000,
        });
    }
});

function makeResizable(frame, resizer, direction) {
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isResizing = true;

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = frame.offsetWidth;
        const startHeight = frame.offsetHeight;

        function handleMouseMove(e) {
            if (!isResizing) return;

            if (direction === 'vertical') {
                const newWidth = startWidth + (e.clientX - startX);
                frame.style.width = `${newWidth}px`;
            } else if (direction === 'horizontal') {
                const newHeight = startHeight + (e.clientY - startY);
                frame.style.height = `${newHeight}px`;
            } else if (direction === 'horizontal-reverse') {
                const newHeight = startHeight - (e.clientY - startY);
                frame.style.height = `${newHeight}px`;
            }
        }

        function stopResizing() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopResizing);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResizing);
    });
}

const sidebar = document.querySelector('.frame-sidebar');
const verticalResizer = document.querySelector('.resizer-v');
makeResizable(sidebar, verticalResizer, 'vertical');

const header = document.querySelector('.frame-header');
const headerResizer = header.querySelector('.resizer-h');
makeResizable(header, headerResizer, 'horizontal');

const footer = document.querySelector('.frame-footer');
const footerResizer = footer.querySelector('.resizer-h');
makeResizable(footer, footerResizer, 'horizontal-reverse');

async function populateNewHires() {
    try {
        const response = await fetch('./data/new-hires.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newHires = await response.json();
        const tbody = document.getElementById('new-hires-tbody');

        newHires.forEach(hire => {
            const row = document.createElement('tr');
            row.id = hire.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = hire.name;
            row.appendChild(nameCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = hire.title;
            row.appendChild(titleCell);

            const officeCell = document.createElement('td');
            officeCell.textContent = hire.office;
            row.appendChild(officeCell);

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Could not load new hires:", error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    populateNewHires();
});

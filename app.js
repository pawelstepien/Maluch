function addSpinOnWheels(speed) {
    const wheels = document.querySelectorAll('.wheel');
    wheels.forEach((wheel) => {
        wheel.style.animation = `spin ${ (1/speed) }s linear infinite`;
    });
};

function addMovementToRoad(speed) {
    document.getElementById('road').style.animation = `move ${ (1/speed) }s linear infinite`;
};

function adjustSpeed(speed) {
    addSpinOnWheels(speed);
    addMovementToRoad(speed / 320);
};

function moveCar(x) {
    if (!window.maluch.hiddenTooltip && isThisMobile()) {
        window.maluch.hiddenTooltip = true;
        const swipeTooltip = document.getElementById('swipe-tooltip');
        swipeTooltip.style.animation ='fade-out 1.2s linear';
        setTimeout(() => {
            swipeTooltip.style.display = 'none';
        }, 1200);
    }
    document.getElementById('maluch-container').style.transform = `translate(${x}px)`;
};

function isThisMobile() {
    return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}

function expand() {
    const expandedContainer = document.getElementById('expanded-container');
    const shrunkContainer = document.getElementById('shrunk-container');

    clearInterval(window.maluch.counterInterval);
    delete window.maluch.counterInterval;
    shrunkContainer.style.display = 'none';
    expandedContainer.style.display = 'block';
    expandedContainer.style.animation = 'fade-in 1.5s linear';
    setTimeout(() => {
        expandedContainer.style.opacity = '1';
    }, 1500);
    if (!window.maluch.wasExpanded) {
        initExpandedEvents();
        window.maluch.wasExpanded = true;
    }
}

function shrink() {
    const expandedContainer = document.getElementById('expanded-container');
    const shrunkContainer = document.getElementById('shrunk-container');

    expandedContainer.style.animation = 'fade-out 1s linear';
    setTimeout(() => {
        expandedContainer.style.opacity = '0';
        expandedContainer.style.display = 'none';
        shrunkContainer.style.display = 'flex';
    }, 1000);
}


function pointerInsideHandler(shrunkContent, circle, event) {
    const cirlceInside = circle.querySelector('#pointer-circle')
    let counter;
    if (isThisMobile()) {
        event = event.touches[0];
    }
    if (event.clientX < shrunkContent.offsetLeft || event.clientX > shrunkContent.offsetLeft + shrunkContent.offsetWidth ||
    event.clientY < shrunkContent.offsetTop || event.clientY > shrunkContent.offsetTop + shrunkContent.offsetHeight) {
        circle.style.display = 'none';
        clearInterval(window.maluch.counterInterval);
        delete window.maluch.counterInterval;
    } else {
        circle.style.display = 'flex';
        circle.style.left = `${event.clientX - 75}px`;
        circle.style.top = `${event.clientY - 75}px`;

        if (!window.maluch.counterInterval) {
            counter = 3;
            cirlceInside.textContent = counter;
            counter --;
            window.maluch.counterInterval = setInterval(() => {
                cirlceInside.textContent = counter;
                if (counter === 0) {
                    cirlceInside.textContent = '';
                    circle.style.display = 'none';
                    expand();
                }
                counter --;
            }, 1000);
        }

    }
}

function initShrinkEvents() {
    const shrunkContent = document.getElementById('shrunk-content');
    const circle = document.getElementById('pointer-circle-container');

    if (!isThisMobile()) {
        shrunkContent.addEventListener('mousemove', (event) => {
            pointerInsideHandler(shrunkContent, circle, event);
        });
    } else {
        shrunkContent.addEventListener('touchstart', (event) => {
            pointerInsideHandler(shrunkContent, circle, event);
        });
        shrunkContent.addEventListener('touchmove', (event) => {
            pointerInsideHandler(shrunkContent, circle, event);
        });
        shrunkContent.addEventListener('touchend', (event) => {
            circle.style.display = 'none';
            clearInterval(window.maluch.counterInterval);
            delete window.maluch.counterInterval;
        });
    }
    shrunkContent.addEventListener('click', (event) => {
        circle.style.display = 'none';
        expand();
    });

};

function initExpandedEvents() {
    adjustSpeed(2);
    if (!isThisMobile()) {
        document.addEventListener('mousemove', (event) => {
            moveCar(((window.innerWidth / 2) - event.clientX) / 2)
        });
    } else {
        document.addEventListener('touchmove', (event) => {
            moveCar(((window.innerWidth / 2) - event.touches[0].clientX) / 2)
        });
    }
    document.getElementById('shrink-button').addEventListener('click', shrink);
};

document.addEventListener('DOMContentLoaded', () => {
    initShrinkEvents();
});

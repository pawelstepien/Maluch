function addSpinOnWheels(speed) {
    const wheels = document.querySelectorAll('.wheel > img');
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
    document.getElementById('maluch-container').style.transform = `translate(${x}px)`;
};

document.addEventListener('DOMContentLoaded', () => {
    adjustSpeed(2);
    document.addEventListener('mousemove', (event) => {
        moveCar(((window.innerWidth / 2) - event.clientX) / 2)
    });
});

/*Sound*/
const muteSrc = 'https://img.icons8.com/pulsar-gradient/48/mute.png';
const lowSrc = 'https://img.icons8.com/pulsar-gradient/48/low-volume.png';
const mediumSrc = 'https://img.icons8.com/pulsar-gradient/48/medium-volume.png';
const highSrc = 'https://img.icons8.com/pulsar-gradient/48/high-volume.png';
window.addEventListener('load', () => {
    const audio = document.getElementById('background-sound');
    const toggleBtn = document.getElementById('background-sound-toggle');
    const volume = document.getElementById('background-sound-volume');
    const icon = document.getElementById('volume-background-icon');
    audio.play();
    toggleBtn.addEventListener('click', () => {
        if(!audio.muted) {
            audio.muted = true;
            audio.pause();
            icon.src = muteSrc;
        }else{
            audio.muted = false
            audio.play();
            audio.volume = volume.value;
            configState(volume, icon)
        }
    });
    volume.addEventListener('input', () => {
        audio.volume = volume.value;
        configState(volume, icon);
    });
});
document.querySelectorAll('.btn').forEach(button => {
    const clickSound = document.getElementById('click-sound');
    const toggleBtn = document.getElementById('ux-sound-toggle');
    const volume = document.getElementById('ux-sound-volume');
    const icon = document.getElementById('volume-ux-icon');
    button.addEventListener('click', () => {
        clickSound.play();
    });
    toggleBtn.addEventListener('click', () => {
        if(!clickSound.muted) {
            clickSound.muted = true;
            icon.src = muteSrc;
        }else{
            clickSound.muted = false;
            clickSound.volume = volume.value;
            configState(volume, icon);
        }
    });
    volume.addEventListener('input', () => {
        clickSound.volume = volume.value;
        configState(volume, icon);
    });
});
document.querySelectorAll('.btn-pick').forEach(button => {
    const clickSound = document.getElementById('pick-sound');
    const toggleBtn = document.getElementById('ux-sound-toggle');
    const volume = document.getElementById('ux-sound-volume');
    const icon = document.getElementById('volume-ux-icon');
    button.addEventListener('click', () => {
        clickSound.play();
    });
    toggleBtn.addEventListener('click', () => {
        if(!clickSound.muted) {
            clickSound.muted = true;
            icon.src = muteSrc;
        }else{
            clickSound.muted = false;
            clickSound.volume = volume.value;
            configState(volume, icon);
        }
    });
    volume.addEventListener('input', () => {
        clickSound.volume = volume.value;
        configState(volume, icon);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const modalShowSound = document.getElementById('modal-show-sound');
    const modalCloseSound = document.getElementById('modal-close-sound');
    const volume = document.getElementById('ux-sound-volume');
    const icon = document.getElementById('volume-ux-icon');
    const toggleBtn = document.getElementById('ux-sound-toggle');
    const modal = document.querySelectorAll('.modal');
    modal.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            modalShowSound.play();
        });
        modal.addEventListener('hide.bs.modal', () => {
            modalCloseSound.play();
        });
        toggleBtn.addEventListener('click', () => {
            if(!modalShowSound.muted && !modalCloseSound.muted) {
                modalShowSound.muted = true;
                modalCloseSound.mute = true;
                icon.src = muteSrc;
            }else{
                modalShowSound.muted = false;
                modalCloseSound.muted = false;
                modalShowSound.volume = volume.value;
                modalCloseSound.volume = volume.value;
                configState(volume, icon);
            }
        });
        volume.addEventListener('input', () => {
            modalShowSound.volume = volume.value;
            modalCloseSound.volume = volume.value;
            configState(volume, icon);
        });
    });
});
function configState (volume, icon){
    if(volume.value < 0.01) {
        icon.src = muteSrc;
    }else if(volume.value <= 0.25) {
        icon.src = lowSrc;
    }else if(volume.value <= 0.5) {
        icon.src = mediumSrc;
    }else{
        icon.src = highSrc;
    }
}
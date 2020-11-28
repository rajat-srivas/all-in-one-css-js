const curso1r = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    curso1r.style.left = e.pageX + 'px';
    curso1r.style.top = e.pageY + 'px';
})
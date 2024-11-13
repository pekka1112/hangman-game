window.addEventListener('load', () => {
    if(!navigator.onLine){
        window.location.href = 'notfound.html';
    }
});
window.addEventListener('offline', () => {
    window.location.href = 'notfound.html';
});
window.addEventListener('online', checkNetworkStatus)
function showToast(message){
    const toastEl = document.getElementById('networkToast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
function checkNetworkStatus() {
    if (navigator.connection) {
        const connection = navigator.connection;
        showToast(`Loại kết nối: ${connection.effectiveType}, Băng thông ước tính: ${connection.downlink} Mbps`);
        if (connection.effectiveType === '2g' || connection.downlink < 1) {
            window.location.href = 'notfound.html';
        }
    } else {
        showToast('Trình duyệt không hỗ trợ API Network Information.');
    }
    window.addEventListener('offline', function (){
       showToast('Mất kết nối mạng. Vui lòng kiểm tra đường truyền mạng');
       window.location.href = 'notfound.html';
    });
}
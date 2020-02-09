function formatDate(val) {
    const mounts = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];
    const date = new Date(val);
    const d = date.getDate(); 
    const m = mounts[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m}, ${y}`;
  }
  
module.exports = { formatDate };  

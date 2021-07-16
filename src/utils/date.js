export const formatDate = (date) => {
    return new Intl.DateTimeFormat("br", { 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(Date.parse(date));
}
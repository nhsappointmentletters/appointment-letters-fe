// input string dd/MM/yyyy
export function getDateFromDDMMYYYY(dateStr:string):Date{
    var parts = dateStr.split("/");
    return  new Date(parseInt(parts[2]), parseInt(parts[1]), parseInt(parts[0]));
}


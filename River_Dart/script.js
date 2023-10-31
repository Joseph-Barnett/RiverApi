const address = fetch('https://environment.data.gov.uk/flood-monitoring/id/stations?riverName=River+Dart')
.then((response) => response.json())
.then((data) => {
    return data.items[0];
});

const waterfetch = fetch('https://environment.data.gov.uk/flood-monitoring/id/measures/46122-level-stage-i-15_min-m')
.then((response) => response.json())
.then((data) => {
    return data.items.latestReading;
});

const setData = () => {
    address.then((riverInfo) => {
        fillText(riverInfo);
    });
    waterfetch.then((waterinfo) => {
        fillwater(waterinfo);
        tablecolor(waterinfo);
    });
};

const fillText = riverInfo => {
    document.getElementById("rivername") .innerHTML = ""
    document.getElementById("closesttown") .innerHTML = ""
    document.getElementById("longitude") .innerHTML = ""
    document.getElementById("latitude") .innerHTML = ""   
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const cell1 = document.getElementById("rivername")
    const cell2 = document.getElementById("closesttown")
    const cell3 = document.getElementById("longitude")
    const cell4 = document.getElementById("latitude")
    const name = document.createTextNode(`${riverInfo.riverName}`);
    const town = document.createTextNode(`${riverInfo.town}`);
    const long = document.createTextNode(`${riverInfo.long}`);
    const lat = document.createTextNode(`${riverInfo.lat}`);
    cell1.appendChild(p1)
    cell2.appendChild(p2)
    cell3.appendChild(p3)
    cell4.appendChild(p4)
    p1.appendChild(name)
    p2.appendChild(town)
    p3.appendChild(long)
    p4.appendChild(lat)
};

const fillwater = waterinfo => {
    console.log(waterinfo)
    document.getElementById("height") .innerHTML = ""
    const p5 = document.createElement("p");
    const cell5 = document.getElementById("height")
    const height = document.createTextNode(`${waterinfo.value}`);
    cell5.appendChild(p5)
    p5.appendChild(height)
}

const tablecolor = (waterinfo) => {
    if(waterinfo.value > 0.4){
        const cell = document.getElementById("height")
        cell.classList.add("good")
    } else {
        const cell = document.getElementById("height")
        cell.classList.add("bad")
    }
}

window.onload = (event) => {
    console.log("thisworked")    
    setData();
}

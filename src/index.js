import './scss/style.scss'

(() => {
    let map;

    const initMap = () => {
        map = L.map('map', {
            zoomControl: false,
            attributionControl: false,
        }).setView([0, 0], 2);;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }

    const form = document.querySelector('.form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const input = form.querySelector('input[name="q"]');
        const term = input.value;

        input.classList.remove('form__field-input--invalid');

        if(term != null && term != '') {
            const isDomain = valueIsDomain(term);
            const locationInfo = await getIpInformation(term, isDomain);
            if(locationInfo) {
                displayIpInformation(locationInfo);
                centerMap(locationInfo);
            } else {
                input.classList.add('form__field-input--invalid');
            }
        } else {
            input.classList.add('form__field-input--invalid');
        }
    });

    const valueIsDomain = val => {
        const regex = /^[a-z0-9-]+\.[a-z0-9-]+(\.[a-z0-9-]+){0,2}$/i;
        return val.match(regex) && val.match(regex).length;
    }


    const getIpInformation = async (q, isDomain) => {
        try {
            let url = `https://geo.ipify.org/api/v1?apiKey=${process.env.GEOAPIKEY}`;
            if(q) {
                const attr = isDomain ? 'domain' : 'ip';
                url = `https://geo.ipify.org/api/v1?apiKey=${process.env.GEOAPIKEY}&${attr}=${q}`;
            }
            
            const result = await fetch(url);
            const data = await result.json();

            return {
                ip: data.ip,
                location: `${data.location.city}, ${data.location.country}`,
                timezone: `UTC ${data.location.timezone}`,
                isp: data.isp,
                lng: data.location.lng,
                lat: data.location.lat
            }
        } catch(err) {
            console.log(err);
            return false
        }
    }

    const displayIpInformation = ({ip, location, timezone, isp}) => {
        const ipcontent = document.querySelector('.data-ip > p');
        const locationcontent = document.querySelector('.data-location > p');
        const timezonecontent = document.querySelector('.data-timezone > p');
        const ispcontent = document.querySelector('.data-isp > p');

        ipcontent.textContent = ip;
        locationcontent.textContent = location;
        timezonecontent.textContent = timezone;
        ispcontent.textContent = isp;
    }

    const centerMap = ({ lat, lng}) => {
        map.setView([lat, lng], 13);
        const myIcon = L.icon({
            iconUrl: './img/icon-location.svg',
            iconSize: [46, 56]
        });
        L.marker([lat, lng], {
            icon: myIcon
        }).off('click').addTo(map);
    }

    const initUserDetails = async () => {
        const locationInfo = await getIpInformation();
        if(locationInfo) {
            displayIpInformation(locationInfo);
            centerMap(locationInfo);
        }
    }

    initMap();
    initUserDetails();

})();

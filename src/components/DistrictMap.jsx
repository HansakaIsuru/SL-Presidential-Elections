import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import sriLankaDistricts from '../data/sri-lanka-districts.json';

const DistrictMap = ({ onSelectDistrict, selectedDistrict }) => {
    const onEachDistrict = (feature, layer) => {
        const districtName = feature.properties.district;
        layer.on({
            click: () => onSelectDistrict(districtName),
        });
        layer.bindTooltip(districtName, {
            permanent: false,
            direction: 'center',
            className: 'text-sm font-semibold bg-white p-1 rounded',
        });
    };

    const style = (feature) => {
        const isSelected = feature.properties.district === selectedDistrict;
        return {
            fillColor: isSelected ? '#E11D48' : '#4F46E5',
            weight: isSelected ? 3 : 1,
            opacity: 1,
            color: isSelected ? '#E11D48' : 'white',
            fillOpacity: isSelected ? 0.9 : 0.7,
        };
    };

    return (
        <MapContainer
            center={[7.8731, 80.7718]}
            zoom={7}
            className="h-[500px] w-full rounded-xl shadow"
            zoomControl={false}
            attributionControl={false}
            style={{ background: '#ffffff' }} // no tiles
        >
            <GeoJSON data={sriLankaDistricts} style={styleFunction} onEachFeature={onEachFeature} />
        </MapContainer>

    );
};

export default DistrictMap;

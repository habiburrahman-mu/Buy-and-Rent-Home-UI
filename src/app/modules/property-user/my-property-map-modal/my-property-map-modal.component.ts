import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as leaflet from 'leaflet';
import LatitudeLongitude from 'src/app/models/latitudeLongitude';

@Component({
	selector: 'app-my-property-map-modal',
	templateUrl: './my-property-map-modal.component.html',
	styleUrls: ['./my-property-map-modal.component.css']
})
export class MyPropertyMapModalComponent implements OnInit {

	@Input() showMyPropertyMapModal: boolean;
	@Output() showMyPropertyMapModalChange = new EventEmitter<boolean>();
	@Output() onSaveLocation = new EventEmitter<LatitudeLongitude>();

	private map: leaflet.Map;

	@Input() locationData: LatitudeLongitude | undefined;

	constructor() { }

	ngOnInit(): void {
	}

	private initMap(): void {
		var map = leaflet.map('map').setView([this.locationData!.latitude, this.locationData!.longitude], 12);

		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		var layerGroup = leaflet.layerGroup();
		leaflet.marker([this.locationData!.latitude, this.locationData!.longitude]).addTo(layerGroup);
		layerGroup.addTo(map);
		map.scrollWheelZoom.enable();
		map.on("click", (event) => {
			this.onClickMap(event, layerGroup);
		})
		this.map = map;
	}

	private onClickMap(event: leaflet.LeafletMouseEvent, layerGroup: leaflet.LayerGroup) {
		console.log(event.latlng);
		layerGroup.clearLayers();
		leaflet.marker([event.latlng.lat, event.latlng.lng]).addTo(layerGroup);
		this.locationData = {
			latitude: event.latlng.lat,
			longitude: event.latlng.lng,
		};
	}

	onHideMyPropertyMapModal() {
		this.showMyPropertyMapModalChange.emit(false);
		if(this.map)
			this.map.remove();
	}

	onShowMyPropertyMapModal() {
		if (this.locationData) {
			this.initMap();
		}

	}

	onClickSave() {
		if (this.locationData) {
			this.onSaveLocation.emit(this.locationData);
			this.showMyPropertyMapModal = false;
		}
	}

	onClickTrack() {
		console.log('clicked track me');
		navigator.geolocation.getCurrentPosition(position => {
			this.map.remove();
			this.locationData = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
			this.initMap();
		});
	}

}

;

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
	selector: 'app-my-property-map-modal',
	templateUrl: './my-property-map-modal.component.html',
	styleUrls: ['./my-property-map-modal.component.css']
})
export class MyPropertyMapModalComponent implements OnInit {

	@Input() showMyPropertyMapModal: boolean;
	@Output() showMyPropertyMapModalChange = new EventEmitter<boolean>();
	@Output() onSaveLocation = new EventEmitter<string>();

	private map: leaflet.Map;

	location: string;

	constructor() { }

	ngOnInit(): void {
	}

	private initMap(): void {
		var map = leaflet.map('map').setView([23.780279, 90.416765], 12);
		map.scrollWheelZoom.disable();

		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		var layerGroup = leaflet.layerGroup();
		leaflet.marker([23.780279, 90.416765]).addTo(layerGroup);
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
		this.location = event.latlng.lat + ', ' + event.latlng.lng;
	}

	onHideMyPropertyMapModal() {
		this.showMyPropertyMapModalChange.emit(false);
	}

	onShowMyPropertyMapModal() {
		this.initMap();
	}

	onClickSave() {
		if (this.location) {
			this.onSaveLocation.emit(this.location);
			this.showMyPropertyMapModal = false;
		}
	}

}

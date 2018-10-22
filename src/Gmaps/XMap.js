import React from 'react';
import {
    Button,
    Input,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    PopoverHeader,
    PopoverBody,
} from 'reactstrap';

export default class XMap extends React.PureComponent {
    constructor(props) {
      super(props);
      /**there is no state since if we provide state it will start rerendering itself */
      this.map;
      this.script;
      this.marker;
      this.geocoder;
      this.inputNode;
      this.infoWindow;
      this.autoComplete;
      this.elementsWithListeners = [];
      this.defPosition = { lat: 41.0082, lng: 28.9784 };
      !props.apiKey && alert("GoogleMaps:::::::this.props.apiKey not provided");
      this.id = "GoogleMaps" + Math.floor(Math.random() * 1000 + 1);
      /*
          * runs on ofter scrip is loaded
          */
      this.onScriptLoad = () => {
        this.map = this.createMap(this.props.mapOpt || {});
        this.marker = this.createMarker(this.props.markerOpt || {});
        this.geocoder = this.createGeocoder(this.props.geocoderOpt || {});
        this.infoWindow = this.createInfoWindow({maxWidth:300,...this.props.infoWindowOpt});
        this.autoComplete = this.createAutocomplete(
          this.props.autocompleteOpt || undefined
        );
        this.props.onMapLoad && this.props.onMapLoad(this);
        /**after all the map listeners is set */
        this.elementsWithListeners.push(this.map);
        this.elementsWithListeners.push(this.marker);
        this.elementsWithListeners.push(this.script);
        this.elementsWithListeners.push(this.geocoder);
        this.elementsWithListeners.push(this.inputNode);
        this.elementsWithListeners.push(this.infoWindow);
        this.elementsWithListeners.push(this.autoComplete);
      };
      /**
       * locate me on the map
       * and used as if stetement for displaying button of geolocation
       */
      this.findMe = () => {
        if (window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(this.findMeOuter);
          return true;
        } else {
          return false;
        }
      };
      /**
       * A function to create Google Map object
       * @param {Object} opt
       */
      this.createMap = opt => {
        let opt1 = {
          center: this.defPosition,
          zoom: 8
        };
        return new window.google.maps.Map( document.getElementById(this.id), {...opt1, ...opt});
      };
      /**
       * A function return GMarker
       */
      this.createMarker = opt => {
        let opt1 = {
          position: this.defPosition,
          draggable: true,
          map: this.map,
          title: "default title"
        };
        return new window.google.maps.Marker({...opt1, ...opt});
      };
      /**
       * a function used to init geolocation
       * @param {Object} opt
       */
      this.createGeocoder = opt => {
        let opt1 = {};
        return new window.google.maps.Geocoder({...opt1, ...opt})
      };
      /**
       * a function to create InfoWindow
       * @param {Object} opt
       */
      this.createInfoWindow = opt => {
        let opt1 = {
          content: `<div id="infoWindow" />`,
          position: this.defPosition
        };
        return new window.google.maps.InfoWindow({...opt1, ...opt});
      };
      /**
       * A function return Autocomplete
       * @param {HTMLElement} inputNode
       */
      this.createAutocomplete = (
        inputNode = document.getElementById("pac-input")
      ) => {
        this.inputNode = inputNode;
        return new window.google.maps.places.Autocomplete(inputNode);
      };
      /**
       * function to remove listeners from the dom element
       * @param {HTMLElement} element
       */
      this.removeAllEventListenersFromElement = element => {
        /**
         * to find out if it is a dom object
         */
        if (element && element.cloneNode) {
          let clone = element.cloneNode();
          // move all child elements from the original to the clone
          while (element.firstChild) {
            clone.appendChild(element.lastChild);
          }
          element.parentNode.replaceChild(clone, element);
        }
      };
      /**
       * A function to remove listeners from the array of obj
       * @param {Array} elements
       */
      this.removeAllEventListenersFromElements = (elements = []) => {
        /**cheks if it is array */
        elements &&
          typeof elements.length === "number" &&
          elements.length > 0 &&
          elements.map(this.removeAllEventListenersFromElement);
      };
    }
    /**
     * Used to load script to the body
     */
    componentDidMount() {
      if (!window.google) {
        this.script = document.createElement("script");
        this.script.id = "script-" + this.id;
        this.script.type = "text/javascript";
        this.script.async = false;
        this.script.src = `https://maps.googleapis.com/maps/api/js?key=${
          this.props.apiKey
        }&libraries=places`;
        var xscript = document.getElementsByTagName("script")[0];
        xscript.parentNode.insertBefore(this.script, xscript);
        // Below is important.
        //We cannot access google.maps until it's finished loading
        this.script.addEventListener("load", e => {
          this.onScriptLoad();
        });
      } else {
        this.onScriptLoad();
      }
    }
    /**
     * Used to delete all listeners and delete script from the body but all the google func will work
     */
    componentWillUnmount() {
      this.removeAllEventListenersFromElements(this.elementsWithListeners);
    }
    render() {
        return (
            <React.Fragment>
                <PopoverHeader>
                    <FormGroup>
                        <Label for="exampleEmail">Address</Label>
                        <InputGroup  type="text" name="name">
                            <InputGroupAddon hidden={!!this.findMe} addonType="prepend">
                                <Button disabled={!!this.findMe} type="submit" onClick={this.findMe} >
                                    <i className='icon-location-pin'></i>
                                </Button>
                            </InputGroupAddon>
                            <Input  id='pac-input' type='text' placeholder='Enter a location'/>
                            <InputGroupAddon addonType="append">
                                <Button type="submit" onClick={this.props.onClick} >Select</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </PopoverHeader>
                <PopoverBody>
                <div style={{ width: this.props.width || 400, height:this.props.height || 400 }} id={this.id} />
                </PopoverBody>
            </React.Fragment>
        );
    }
  }
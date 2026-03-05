export interface Passenger {
    id: string;
    firstName: string;
    lastName: string;
    type: string;
    seat: string;
}

export interface Journey {
    origin: string;
    destination: string;
    flightNo: string;
    departureDate: string;
}

export interface CheckinState {
    checkinKey: string;
    isEligible: boolean;
    journeys: Journey[];
    passengers: Passenger[];
    selectedPassengerIds: string[];
}

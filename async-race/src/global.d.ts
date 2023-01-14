export {};
declare global {
    interface CarData {
        name: string;
        color: string;
        id: number;
    }
    type CarsData = CarData[];
    interface CarParams {
        name: string;
        color: string;
    }
    interface EngineCarParams {
        velocity: number;
        distance: number;
    }
    interface SuccessRace {
        success: boolean;
    }
    interface Winner{
        id: number;
        wins: number;
        time: number;
    }
    interface WinnerParam {
        wins: number;
        time: number;
    }
    type AllWinners = Winner[];
    interface StateData {
        garage: boolean;
    }
    type EmptyObject = {};
}